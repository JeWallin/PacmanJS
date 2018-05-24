
class Wackman
{
	constructor(canvasId)
	{
		this.mapManager = new MapManager();
		this.mapManager.AddSubscriber(this);

		this.canvas = document.getElementById(canvasId);
		this.gameSize = { x: this.canvas.width, y: this.canvas.height };
		this.screen = this.canvas.getContext('2d');

		this.Scale = 30;

		this.player = new Player();
		this.keyboarder = new KeyBoarder();
		this.candyList = [];
	}

	InitGame()
	{
		this.Scale = 30;

		this.player = new Player();
		this.keyboarder = new KeyBoarder();
		this.candyList = [];
		
		var start = this.mapManager.PlayerStart;

		this.player.SetPositionAndSize(start.x, start.y, this.Scale);

		var candyLocations = this.mapManager.WorldObjects;

		for ( var i = 0; i < candyLocations.length; i++)
		{
			var candy = new Candy();
			candy.SetPositionAndSize(candyLocations[i].x, candyLocations[i].y, this.Scale);
			this.candyList.push(candy);
		}
	}

	Notify(mapManager)
	{
		this.InitGame();
	}

	KeyEvent(event, down)
	{

		this.keyboarder.InputUpdated(event.keyCode, down);
	}

	Update()
	{
		this.player.Update(this.keyboarder, this.mapManager);

		for ( var i = 0; i < this.candyList.length; i++ )
		{
			if ( BaseObjectCollision(this.player, this.candyList[i]) )
			{
				this.candyList.splice(i, 1);
				break;
			}
		}

		if ( this.candyList.length === 0 )
		{
			this.InitGame();
		} 
	}

	Render()
	{

		this.screen.clearRect(0,0,this.gameSize.x, this.gameSize.y);

		this.RenderMap();

		for ( var i = 0; i < this.candyList.length; i++)
		{
			this.candyList[i].Render(this.screen);
		}

		this.player.Render(this.screen);

	}

	RenderMap()
	{
		if ( !(this.mapManager.WorldMap === undefined ) )
		{
			var toRender = this.mapManager.WorldMap;

			for ( var i = 0; i < toRender.length; i++)
			{
				for ( var j = 0; j < toRender[i].length; j++)
				{
					if ( !(toRender[i][j].walkable) )
					{
						this.screen.fillRect(j*this.Scale, i*this.Scale, this.Scale, this.Scale);
					}
				}
			}
		}
	}
}