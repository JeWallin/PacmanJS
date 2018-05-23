class Actor
{
	constructor (pos_x, pos_y)
	{
		//console.log("Actor constructor called");

		this.x = pos_x;
		this.y = pos_y;

		this.goal_x = this.x;
		this.goal_y = this.y;

		this.size = 30;
		this.speed = 2;
	}

	Print()
	{
		//console.log("Actor print called");
		console.log("	{ " + this.x + ", " + this.y + " }");
	}

	Update()
	{
				//console.log("Actor Updated Called");
		var dif_x = this.goal_x - this.x;
		var dif_y = this.goal_y - this.y;
		
		var div = Math.sqrt(dif_y*dif_y + dif_x*dif_x);

		if ( div <= this.speed)
		{
			this.x = this.goal_x;
			this.y = this.goal_y;
		}
		else
		{
			
			var move_x = dif_x/div;
			var move_y = dif_y/div;

			move_x *= this.speed;
			move_y *= this.speed;

			this.x += move_x;
			this.y += move_y;
			
		}
		
	}

	Render(screen)
	{
		screen.fillRect(this.x, this.y, this.size, this.size);
	}

	MoveGoalPosition( pos_x, pos_y )
	{
		if ( this.IsAtGoal() )
		{
			this.goal_x += pos_x;
			this.goal_y += pos_y;
		} 
		
	}

	IsAtGoal()
	{
		return this.goal_x === this.x && this.goal_y === this.y;
	}
}