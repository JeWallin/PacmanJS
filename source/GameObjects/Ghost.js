
class Ghost extends BaseObject
{
	constructor()
	{
		super();
		this.colour = "#f46242";
		this.delay = 20;
		this.smart = 1;
		this.currentlyStupid = 0;
	}

	SetPositionAndSize(x, y, size)
	{
		this.x = x;
		this.y = y;
		this.goalX = x;
		this.goalY = y;
		this.size = size/2;
		this.MapScale = size;
		this.direction = new Direction();

	}
	SetDelayAndSmart(delay, smart)
	{
		this.delay = delay;
		this.smart = smart;
	}
	Update(worldMap, player)
	{
		if ( this.goalX === this.x && this.goalY === this.y )
		{
			

			var left = {x: this.x -1, y: this.y};
			var right = {x: this.x +1, y: this.y};
			var up = {x: this.x, y: this.y-1};
			var down = {x: this.x, y: this.y+1};

			var dirList = [];


			dirList.push(left);
			dirList.push(right);
			dirList.push(up);
			dirList.push(down);

			var posib = 0;
			
			for (var i = 0; i < dirList.length; i++)
			{
				if ( this.CanMoveTo(dirList[i], worldMap))
				{
					posib += 1;
				}
			}


			var nextPick = AstarNextPick(worldMap.WorldMap, new cord(player.x, player.y), new cord(this.x, this.y));

			if( posib > 2 )
			{

				var random = Math.floor(Math.random() * 101);
				if ( random <= this.smart)
				{
					this.goalX = nextPick.x;
					this.goalY = nextPick.y;

					this.currentlyStupid = 0;
				}
				else
				{
					this.currentlyStupid = 2;

					this.PickADumbWay(dirList, nextPick, worldMap);
					
				}
			}
			else
			{
				if ( this.currentlyStupid < 1 )
				{
					this.goalX = nextPick.x;
					this.goalY = nextPick.y;
				}
				else
				{
					this.PickADumbWay(dirList, nextPick, worldMap);
					this.currentlyStupid --;
				}
				
			}
		}

		this.MoveTheGhost();
		
	}
	PickADumbWay(dirList, bestPick, worldMap)
	{
		var isDone = false;
		while(!isDone)
		{
			var index = Math.floor(Math.random()*dirList.length);
			var dir = dirList[index];

			if ( this.CanMoveToAndIsNotTheBest(bestPick, dir, worldMap) )
			{
				this.goalX = dirList[index].x;
				this.goalY = dirList[index].y;
				isDone = true;
			}
			else
			{
				dirList.splice(index, 1);
				if ( dirList.length < 1)
				{
					this.goalX = bestPick.x;
					this.goalY = bestPick.y;
					isDone = true;
				}
			}
		}
	}
	MoveTheGhost()
	{

		var DifX = (this.goalX - this.x);
		var movex = DifX;
		if ( !(DifX === 0) )
		{
			movex /= Math.abs(DifX);
			movex /= this.delay;
		}

		var DifY = (this.goalY - this.y);
		var movey = DifY;
		if ( !(DifY === 0) )
		{
			movey /= Math.abs(DifY);
			movey /= this.delay;
		}

		if ( (Math.abs(DifX) + Math.abs(DifY)) < (2/this.delay) )
		{
			this.x = this.goalX;
			this.y = this.goalY;
		}
		else
		{
			this.x = this.x + movex;
			this.y = this.y + movey;
		}
	}
	Render(screen)
	{
		super.Render(screen, 2, 0);
	}

	CanMoveToAndIsNotTheBest(best, test, worldMap)
	{
		return ( this.CanMoveTo(test, worldMap) && !(test.x === best.x && test.y === best.y));
	}

	CanMoveTo(Pos, worldMap)
	{
		console.log(Pos);
		return worldMap.IsWalkable(Pos.x, Pos.y);
	}

	GetNewPos(pos, dir)
	{
		if ( dir.Direction === dir.DIRECTIONS.LEFT)
		{
			pos.x -= 1;
		}
		else if ( dir.Direction === dir.DIRECTIONS.RIGHT)
		{
			pos.x += 1;
		}
		else if ( dir.Direction === dir.DIRECTIONS.UP)
		{
			pos.y -= 1;
		}
		else if ( dir.Direction === dir.DIRECTIONS.DOWN)
		{
			pos.y += 1;
		}

		return pos;
	}
}


class mapNode
{
	constructor(cord, walkable)
	{
		this.costToStart = 10000000;
		this.costToGoal = 0;
		this.cord = cord;
		this.walkable = walkable;
		this.parent = cord;
	}

	SetParentCord(cord)
	{
		this.parent = cord;
	}

	CalcCostGoal(goal)
	{
		this.costToGoal = Math.abs(goal.x - this.cord.x) + Math.abs(goal.y - this.cord.y);
	}

	SetCostToStart(cost)
	{
		this.costToStart = cost;
	}

	IsTheSame(node)
	{
		return this.cord.x === node.cord.x && this.cord.y === node.cord.y;
	}

	IsMyCoord(x, y)
	{
		return this.cord.x === x && this.cord.y === y;
	}

	GetTotalCost()
	{
		return this.costToGoal + this.costToStart;
	}

}

function GetNode(list, node)
{
	for ( var i = 0; i < list.length; i++)
	{
		if ( list[i].IsTheSame(node) )
		{
			return i;
		}
	}
	return -1;
}

function GetNode(list, x, y)
{
	for ( var i = 0; i < list.length; i++)
	{
		if ( list[i].IsMyCoord(x, y) )
		{
			return i;
		}
	}
	return -1;
}

function MovetFromTo(fromList, toList, fromIndex, parnetNode)
{

	if ( !(fromIndex === -1) )
	{
		var node = fromList[fromIndex];
		fromList.splice(fromIndex, 1);
		node.SetCostToStart(parnetNode.costToStart + 1);
		node.SetParentCord(parnetNode.cord);
		toList.push(node);
	}
}

function GetBestNode(list)
{
	var bestCost = 9999999999;
	var bestIndex = -1;


	for ( var i = 0; i < list.length; i++)
	{
		var cost = list[i].GetTotalCost();
		if ( bestCost > cost)
		{
			bestCost = cost;
			bestIndex = i;
		}
	}
	return bestIndex;
}


function AstarNextPick(worldMap, start, goal)
{
	start.x = Math.round(start.x);
	start.y = Math.round(start.y);
	goal.x = Math.round(goal.x);
	goal.y = Math.round(goal.y);

	var mapData = worldMap;

	var openList = [];
	var potentialList = [];

	for ( var y = 0; y < mapData.length; y++)
	{
		for ( var x = 0; x < mapData.length; x++)
		{
			var currentNode = mapData[x][y];
			if (!(currentNode === undefined))
			{
				if ( currentNode.walkable )
				{
					var newCord = new cord(currentNode.x, currentNode.y);
					var newNode = new mapNode(newCord, currentNode.walkable);
					newNode.CalcCostGoal(goal);

					openList.push(newNode);
				}		

				
			}

		}
	}

	var currentNodeIndex = GetNode(openList, start.x, start.y);

	var node = openList[currentNodeIndex];
	node.SetCostToStart(0);
	openList.splice(currentNodeIndex,1);

	potentialList.push(node);

	while( potentialList.length > 0 )
	{
		var index = GetBestNode(potentialList);

		var currentNode = potentialList[index];

		if ( currentNode.IsMyCoord(goal.x, goal.y) )
		{
			return currentNode.parent;
		}  

		potentialList.splice(index, 1);
		
		// try to go left
		var leftNodeIndex 	= GetNode(openList, currentNode.cord.x - 1, currentNode.cord.y);
		MovetFromTo(openList, potentialList, leftNodeIndex, currentNode);
		var rightNodeIndex 	= GetNode(openList, currentNode.cord.x + 1, currentNode.cord.y);
		MovetFromTo(openList, potentialList, rightNodeIndex, currentNode);
		var upNodeIndex 	= GetNode(openList, currentNode.cord.x, currentNode.cord.y - 1);
		MovetFromTo(openList, potentialList, upNodeIndex, currentNode);
		var downNodeIndex 	= GetNode(openList, currentNode.cord.x, currentNode.cord.y + 1);
		MovetFromTo(openList, potentialList, downNodeIndex, currentNode);
		
	}
}