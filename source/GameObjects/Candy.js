
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
		this.size = size/3;
		this.MapScale = size;
	}

	Render(screen)
	{
		super.Render(screen, 2, 0);
	}
}