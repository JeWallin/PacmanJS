
class Ghost extends BaseObject
{
	constructor()
	{
		super();
		this.colour = "#f46242";
	}

	SetPositionAndSize(x, y, size)
	{
		this.x = x;
		this.y = y;
		this.goalX = x;
		this.goaly = y;
		this.size = size/2;
		this.MapScale = size;
		this.direction = new Direction();
	}

	Update(worldMap, player)
	{

	}

	Render(screen)
	{
		super.Render(screen, 2, 0);
	}
}


class node
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

	StartCost(old)
	{
		return old+1;
	}

	IsTheSame(node)
	{
		return this.cord.x === node.cord.x; && this.cord.y === node.cord.y;
	}

	GetTotalCost()
	{
		return this.costToGoal + costToStart;
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
}

function AstarNextPick(worldMap, start, goal)
{
	var mapData = worldMap.WorldMap;

	var openList = [];
	var closedList = [];

	for ( var y = 0; y < mapData.length; y++)
	{
		for ( var x = 0; x < mapData.length; x++)
		{
			var currentNode = mapData[x][y];
			var newCord = new cord(currentNode.x, currentNode.y);
			var newNode = new Node(newCord, currentNode.walkable);

			newNode.CalcCostGoal(goal);

			openList.push(newNode);

		}
	}

	var currentNodeIndex = GetNode(openList, start);

	var node = openList[currentNodeIndex];

	node.SetCostToStart(0);

	openList.splice(currentNodeIndex,1);
	closedList.push(node);

	while( openList.length > 0 )
	{
		



	}
}