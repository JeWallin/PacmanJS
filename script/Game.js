
class Game
{
	constructor(canvasId)
	{
		//console.log("Game constructor called");
		this.canvas = document.getElementById(canvasId);
		this.gameSize = { x: this.canvas.width, y: this.canvas.height };

		this.keyBoard = new KeyBoarder();
		this.player = new Player();
		this.map;
	}

	Init()
	{
		//console.log("Init called!");
		this.screen = this.canvas.getContext('2d');

	}

	LoadMap(map)
	{
		this.map = new Map(map);
	}

	MapIsLoaded()
	{
		this.map.GenerateMap();
	}
	InputUpdated(event, down)
	{
		//console.log("InputUpdated called");

		this.keyBoard.InputUpdated(event.keyCode, down);
	}

	Update()
	{
		//this.player.Print();
		//console.log("Updated called!")
		this.player.Update(this.keyBoard);
	}

	Render()
	{
		//console.log("Render called!");

		this.screen.clearRect(0,0,this.gameSize.x, this.gameSize.y);
		
		if ( !(this.map === undefined) )
		{
			this.map.Render(this.screen);
		}


		this.player.Render(this.screen);

		
		
	}

	Print()
	{
		//console.log("Print called");
		console.log("	canvas 	: " + this.canvas);
		console.log("	screen 	: " + this.screen);
		console.log("	size 	: " + this.gameSize.x + ", " + this.gameSize.y);
	}
};
