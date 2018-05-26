
class cord
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
}

class Direction
{
	constructor()
	{
		this.Direction = 1;

		this.DIRECTIONS = { LEFT: 1, RIGHT: 2, UP: 3, DOWN: 4}
	}
}

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

	DrawImage(screen, image, rotation)
	{
		rotateAndPaintImage(screen, image, rotation*Math.PI / 180,
			this.MapScale*this.x + this.MapScale/2, 
			this.MapScale*this.y + this.MapScale/2,
			this.size/2, this.size/2, this.size
			);
	}

}

function rotateAndPaintImage ( context, image, angleInRad , positionX, positionY, axisX, axisY, size ) {
  context.translate( positionX, positionY );
  context.rotate( angleInRad );
  context.drawImage( image, -axisX, -axisY, size, size );
  context.rotate( -angleInRad );
  context.translate( -positionX, -positionY );
}

function BaseObjectCollision( ObjA, ObjB )
{
	return (Math.abs(ObjA.x*ObjA.MapScale - ObjB.x*ObjB.MapScale) * 2 < (ObjA.size/2 + ObjB.size/2)
		&& Math.abs(ObjA.y*ObjA.MapScale - ObjB.y*ObjB.MapScale) * 2 < (ObjA.size/2 + ObjB.size/2));
}