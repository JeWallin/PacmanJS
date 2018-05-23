main();

var game;

function main()
{
	game = new Game("screen");
	game.Init();

	tick();
}

function keyDown(event)
{
	game.InputUpdated(event, true);
}

function keyUp(event)
{
	game.InputUpdated(event, false);
}

function loadMap(map)
{
	game.LoadMap(map);
}

function MapIsLoaded()
{
	game.MapIsLoaded();
}

function tick()
{

	game.Update();

	game.Render();

	requestAnimationFrame(tick);
}


