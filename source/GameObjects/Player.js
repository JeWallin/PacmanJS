class Direction
{
	constructor()
	{
		this.Direction = 1;

		this.DIRECTIONS = { LEFT: 1, RIGHT: 2, UP: 3, DOWN: 4}
	}
}

class Player extends BaseObject
{
	constructor()
	{
		super();

		this.x = 0.0;
		this.y = 0.0;
		this.goalX = 0;
		this.goalY = 0;

		this.size = 1;
		this.colour = "#999900";

		this.currentDirection = new Direction();
		this.goalDirection = new Direction();
		this.moveIntervall = 10;
		this.timer = 0;
	}

	SetPositionAndSize(x, y, size)
	{
		this.x = x;
		this.y = y;
		this.goalX = x;
		this.goalY = y;
		this.size = size/1.5;
		this.MapScale = size;
	}
	
	Update(keyboarder, worldMap)
	{
		if ( !(worldMap === undefined) )
		{
			if ( keyboarder.IsDown(keyboarder.KEYS.LEFT) )
			{
				this.goalDirection.Direction = this.goalDirection.DIRECTIONS.LEFT;
			}
			else if ( keyboarder.IsDown(keyboarder.KEYS.RIGHT) )
			{

				this.goalDirection.Direction = this.goalDirection.DIRECTIONS.RIGHT;
			}
			else if ( keyboarder.IsDown(keyboarder.KEYS.UP) )
			{

				this.goalDirection.Direction = this.goalDirection.DIRECTIONS.UP;
			}
			else if ( keyboarder.IsDown(keyboarder.KEYS.DOWN) )
			{

				this.goalDirection.Direction = this.goalDirection.DIRECTIONS.DOWN;
			}

			if ( this.x === this.goalX && this.y === this.goalY)
			{
				
				var potentialPos = this.GetNewPos({ x: this.goalX, y: this.goalY}, this.goalDirection);
				
				if (this.CanMoveTo(potentialPos, worldMap))
				{
					this.currentDirection.Direction = this.goalDirection.Direction;
				}

				var newPos = this.GetNewPos( { x: this.goalX, y: this.goalY }, this.currentDirection);

				if ( this.CanMoveTo(newPos, worldMap ))
				{
					this.goalX = newPos.x;
					this.goalY = newPos.y;
				}

				
			}
			
			var DifX = (this.goalX - this.x);
			var movex = DifX;
			if ( !(DifX === 0) )
			{
				movex /= Math.abs(DifX);
				movex /= this.moveIntervall;
			}

			var DifY = (this.goalY - this.y);
			var movey = DifY;
			
			if ( !(DifY === 0) )
			{
				movey /= Math.abs(DifY);
				movey /= this.moveIntervall;
			}

			
			if ( (Math.abs(DifX) + Math.abs(DifY)) < (2/this.moveIntervall) )
			{
				this.x = this.goalX;
				this.y = this.goalY;
			}
			else
			{
				this.x = this.x + movex;
				this.y = this.y + movey;
			}
			
			this.timer += 0.5;
				
		}

	}

	Render(screen)
	{
		var Rot = 0;

		if ( this.currentDirection.Direction === this.currentDirection.DIRECTIONS.LEFT)
		{
			Rot = 1;
		}
		else if ( this.currentDirection.Direction === this.currentDirection.DIRECTIONS.UP)
		{
			Rot = 1.5;
		}
		else if ( this.currentDirection.Direction === this.currentDirection.DIRECTIONS.DOWN)
		{
			Rot = 0.5;
		} 
		super.Render(screen, 1.875 + Math.sin(this.timer)*0.125, Math.PI * Rot);
	}

	CanMoveTo(Pos, worldMap)
	{
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