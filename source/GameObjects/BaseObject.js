
class BaseObject
{
	constructor(x, y, size)
	{
		this.x = x;
		this.y = y;
		this.size = size;
		this.colour = "#FF0000";
	}

	Render(screen)
	{
		var style = screen.fillStyle;

		screen.fillStyle = this.colour;

		screen.fillRect(this.x, this.y, this.size, this.size);

		screen.fillStyle = style;
	}
}

function BaseObjectCollision( ObjA, ObjB )
{
	return Math.abs(ObjA.x - ObjB.x) * 2 < (ObjA.size + ObjB.size)
		&& Math.abs(ObjA.y - ObjB.y) * 2 < (ObjA.size + ObjB.size);
}