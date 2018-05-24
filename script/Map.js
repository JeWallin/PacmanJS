var currentMap;

class Pos
{

	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
};

class Map
{
	constructor(mapPath)
	{
		this.spacing = 30;
		this.Wall = [];
		this.Candy = [];

		this.MapObj = []; 

		readTextFile(mapPath);
	}

	GenerateMap()
	{

		var cols = 0;
		var row = 0;

		for ( var i = 0; i < currentMap.length; i++)
		{
			if ( currentMap[i] == '\n' )
			{
				row++;
			}
			else
			{
				
			}
		}





		console.log("generate ");
		var x = 0;
		var y = 0;

		for ( var i = 0; i < currentMap.length; i++)
		{
			if ( currentMap[i] === '\n')
			{
				x = -this.spacing;
				y += this.spacing;
			}
			else if ( currentMap[i] === 'x')
			{
				this.Wall.push(new Pos(x, y));
			}
			else if ( currentMap[i] === ' ')
			{
				this.Candy.push(new Pos(x, y));
			}
			x += this.spacing;
		}
	}

	Render(screen)
	{
		var temp = screen.fillStyle;
		for ( var i = 0; i < this.Wall.length; i++)
		{
			screen.fillRect(this.Wall[i].x, this.Wall[i].y, this.spacing, this.spacing);
		}
		for ( var i = 0; i < this.Candy.length; i++)
		{
			screen.fillStyle="#FF0000";
			var min = this.spacing/3;
			var max = min * 2;
			screen.fillRect(this.Candy[i].x + min, this.Candy[i].y + min, this.spacing - max, this.spacing - max);
		}
		screen.fillStyle = temp;
	}
};

function readTextFile(file)
{
    var input = file.target;

    var reader = new FileReader();
    reader.onload = function(){
          var text = reader.result;
          currentMap = text;
          MapIsLoaded();
    };
    reader.readAsText(input.files[0]);

}
