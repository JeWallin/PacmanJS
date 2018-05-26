
class Wackman
{
	constructor(canvasId)
	{
		this.nomsound = new Audio("content/audio/nom.wav");
		this.mapManager = new MapManager();

		this.canvas = document.getElementById(canvasId);
		this.gameSize = { x: this.canvas.width, y: this.canvas.height };
		this.screen = this.canvas.getContext('2d');
		this.rockImage = document.getElementById("rock");
		this.coinImage = document.getElementById("coin");
		this.ghostImage = document.getElementById("ghost");
		this.player1Image = document.getElementById("player1");
		this.player2Image = document.getElementById("player2");

		this.Scale = 32;

		this.player = new Player();
		this.keyboarder = new KeyBoarder();
		this.candyList = [];
		this.ghosts = [];

		this.speed = 20;
	}

	InitGame()
	{

		this.Scale = 32;

		this.player = new Player();
		this.player.SetSpeed(this.speed);
		this.candyList.splice(0, this.candyList.length );
		this.ghosts.splice(0, this.ghosts.length );

		var start = this.mapManager.PlayerStart;

		this.player.SetPositionAndSize(start.x, start.y, this.Scale);

		var candyLocations = this.mapManager.WorldObjects;

		for ( var i = 0; i < candyLocations.length; i++)
		{
			var candy = new Candy();
			candy.SetPositionAndSize(candyLocations[i].x, candyLocations[i].y, this.Scale);
			this.candyList.push(candy);
		}

		var ghostLocations = this.mapManager.GhostStart;

		for ( var i = 0; i < ghostLocations.length; i++)
		{
			var ghost = new Ghost();
			ghost.SetDelayAndSmart(this.speed+1, 50+(i*25));
			ghost.SetPositionAndSize(ghostLocations[i].x, ghostLocations[i].y, this.Scale);
			this.ghosts.push(ghost);
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

				//if ( Math.floor(Math.random() * 100) < 25)
				{
					this.nomsound.play();
				}
				
				this.candyList.splice(i, 1);
				if ( this.candyList.length === 0 )
				{
					this.InitGame();
					var playme = new Audio("content/audio/start.wav");
					playme.play();
				} 
				break;
			}
		}

		for ( var i = 0; i < this.ghosts.length; i++ )
		{
			if ( BaseObjectCollision(this.player, this.ghosts[i]) )
			{
				this.InitGame();
				var playme = new Audio("content/audio/start.wav");
				playme.play();
			}
		}

		for( var i = 0; i < this.ghosts.length; i++)
		{
			this.ghosts[i].Update(this.mapManager, this.player );
		}

		
	}

	Render()
	{

		this.screen.clearRect(0,0,this.gameSize.x, this.gameSize.y);

		this.RenderMap();

		for ( var i = 0; i < this.candyList.length; i++)
		{

			this.candyList[i].Render(this.screen, this.coinImage);
		}

		for ( var i = 0; i < this.ghosts.length; i++)
		{
			this.ghosts[i].Render(this.screen, this.ghostImage);
		}

		this.player.Render(this.screen, this.player1Image, this.player2Image);

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
						//this.screen.fillRect(j*this.Scale, i*this.Scale, this.Scale, this.Scale);
						this.screen.drawImage( this.rockImage, 
							j*this.Scale - this.Scale/2, 
							i*this.Scale-this.Scale/2, 
							this.Scale*2, this.Scale*2);
					}
				}
			}
		}
	}
}