main();

var game;

function main()
{
	game = new Wackman("screen");

	tick();
}

function keyDown(event)
{
	game.KeyEvent(event, true);
}

function keyUp(event)
{
	game.KeyEvent(event, false);
}

function loadMap(map)
{
	game.mapManager.LoadMap(map);

}

function MapIsloaded()
{
	game.mapManager.GenerateMap();
	var playme = new Audio("content/audio/start.wav");
	playme.play();

}

function InitGameNow()
{
	game.InitGame();

	
}

function tick()
{
	game.Update();

	game.Render();

	requestAnimationFrame(tick);
}


