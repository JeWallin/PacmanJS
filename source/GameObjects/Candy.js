
class Candy extends BaseObject
{
	constructor()
	{
		super();
		this.colour = "#7f7fff";
	}

	SetPositionAndSize(x, y, size)
	{
		this.x = x;
		this.y = y;
		this.size = size/1.5;
		this.MapScale = size;
	}

	Render(screen, image)
	{
		super.DrawImage(screen, image, 0);
	}
}