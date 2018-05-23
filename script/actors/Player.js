class Direction
{
	constructor()
	{
		this.Direction = 1;

		this.DIRECTIONS = { LEFT: 1, RIGHT: 2, UP: 3, DOWN: 4}
	}
}

class Player extends Actor
{
	constructor()
	{
		//console.log("Player constructor called")
		// calling our actor constructor
		super(30, 30);
		this.speed = 3;
		this.movmentDir = new Direction;
		this.movmentDir.Direction = this.movmentDir.DIRECTIONS.LEFT;
	}

	Update(keyBoard)
	{
		//super.Print();
		//console.log("Player Update called!");
		if ( keyBoard.IsDown(keyBoard.KEYS.LEFT) )
		{
			this.movmentDir.Direction = this.movmentDir.DIRECTIONS.LEFT;
		}
		if ( keyBoard.IsDown(keyBoard.KEYS.RIGHT) )
		{
			this.movmentDir.Direction = this.movmentDir.DIRECTIONS.RIGHT;
		}
		if ( keyBoard.IsDown(keyBoard.KEYS.UP) )
		{
			this.movmentDir.Direction = this.movmentDir.DIRECTIONS.UP;
		}
		if ( keyBoard.IsDown(keyBoard.KEYS.DOWN) )
		{
			this.movmentDir.Direction = this.movmentDir.DIRECTIONS.DOWN;
		}

		if( super.IsAtGoal() )
		{
			var steppingSize = this.size;
			if ( this.movmentDir.Direction === this.movmentDir.DIRECTIONS.LEFT)
			{
				super.MoveGoalPosition(-steppingSize, 0);
			}
			if ( this.movmentDir.Direction === this.movmentDir.DIRECTIONS.RIGHT)
			{
				super.MoveGoalPosition(steppingSize, 0);
			}
			if ( this.movmentDir.Direction === this.movmentDir.DIRECTIONS.UP)
			{
				super.MoveGoalPosition(0,-steppingSize);
			}
			if ( this.movmentDir.Direction === this.movmentDir.DIRECTIONS.DOWN)
			{
				super.MoveGoalPosition(0,steppingSize);
			}
		}

		super.Update();
	}	

	Render(screen)
	{
		//console.log("Player Render Called!");

		var temp = screen.fillStyle;
		screen.fillStyle = "#1A03F0"
		super.Render(screen);
		screen.fillStyle = temp;
	}
}