
class position
{
	constructor()
	{
		this.x = 0;
		this.y = 0;
		this.walkable = true;
	}

	SetPosition(x, y)
	{
		this.x = x;
		this.y = y;
	}
}
var mapstringglobal = undefined;
class MapManager
{
	constructor()
	{
		this.mapString = {};

		this.WorldMap = [];
		// candy
		this.WorldObjects = [];
		// PC and NPC
		this.PlayerStart = {};
		this.GhostStart = [];
	}

	Reset()
	{
		this.mapString = {};

		this.WorldMap = [];
		// candy
		this.WorldObjects = [];
		// PC and NPC
		this.PlayerStart = {};
		this.GhostStart = [];
		mapstringglobal = undefined;
	}

	IsWalkable(x, y)
	{
		if ( y < this.WorldMap.length && !( this.WorldMap[y] === undefined) && x < this.WorldMap[y].length)
			return ( this.WorldMap[y][x].walkable );
		else
			return false;
	}
	LoadMap(MapFile)
	{
		this.Reset();
		
		var input = MapFile.target;

	    var reader = new FileReader();

	    reader.onload = function(){
	          mapstringglobal = reader.result;
	          MapIsloaded();
	    };

	    reader.readAsText(input.files[0]);
	}

	NotifySubscribers()
	{
		//console.log("Hi");
		//for( var i = 0; i < this.subscriber.length; i++)
		{
			//this.subscriber[i].Notify(this);
		}

		InitGameNow();
	}

	ResetVarialbes()
	{
		this.GhostStart.splice(0, this.GhostStart.length);
		this.WorldObjects.splice(0, this.WorldObjects.length);
	}

	GenerateMap()
	{
		this.ResetVarialbes();

		this.mapString = mapstringglobal;

		var x = 0;
		var y = 0;


		this.WorldMap.push([]);

		for (var i = 0; i < this.mapString.length; i++)
		{
			if ( this.mapString[i] === '\n' )
			{
				//Its a new line
				x = -1;
				y += 1;
				this.WorldMap.push([]);
			}
			else if ( this.mapString[i] === 'x')
			{
				var pos = new position();
				pos.SetPosition(x, y);
				pos.walkable = false;

				this.WorldMap[this.WorldMap.length-1].push(pos);
			}
			else
			{
				var pos = new position();
				pos.SetPosition(x, y);
				pos.walkable = true;

				this.WorldMap[this.WorldMap.length-1].push(pos);

				if ( this.mapString[i] === 's' )
				{
					this.PlayerStart = new cord(x,y);
				}
				else if ( this.mapString[i] === 'g' )
				{
					this.GhostStart.push(new cord(x,y));
				}
				else
				{
					this.WorldObjects.push(new cord(x,y));
				}
			}
			x++;
		}
		this.NotifySubscribers();
	}
}