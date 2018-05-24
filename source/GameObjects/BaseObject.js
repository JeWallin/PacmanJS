
class BaseObject
{
	constructor(x, y, size)
	{
		this.x = x;
		this.y = y;
		this.size = size;
		this.MapScale = size;
		this.colour = "#FF0000";
	}

	Render(screen, mouth, rotation)
	{
		var style = screen.fillStyle;

		screen.fillStyle = this.colour;

		//screen.fillRect(this.x*this.size + border, this.y*this.size + border, this.size - 2*border, this.size - 2*border);

		//screen.fillStyle = style;
		var chill = 2*Math.PI-mouth*Math.PI;
		var radius = this.size/2;

		screen.beginPath();
		screen.arc(this.MapScale*this.x + this.MapScale/2, this.MapScale*this.y + this.MapScale/2, radius, rotation + chill, rotation + mouth * Math.PI, false);
		screen.fill();
		screen.lineWidth = radius;
		screen.strokeStyle = this.colour;
		screen.stroke();

		screen.fillStyle = style;
	}
}

function BaseObjectCollision( ObjA, ObjB )
{
	return (Math.abs(ObjA.x*ObjA.MapScale - ObjB.x*ObjB.MapScale) * 2 < (ObjA.size + ObjB.size)
		&& Math.abs(ObjA.y*ObjA.MapScale - ObjB.y*ObjB.MapScale) * 2 < (ObjA.size + ObjB.size));
}