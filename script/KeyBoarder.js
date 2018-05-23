
class KeyBoarder
{
	constructor()
	{
		//console.log("Keyboarder constructor called");
		this.keyState = {};
		this.KEYS = { LEFT : 37, RIGHT: 39, UP: 38, DOWN: 40 }; 
	}

	InputUpdated(key, isDown)
	{
		this.keyState[key] = isDown;
	}

	IsDown(key)
	{
		return this.keyState[key] === true;
	}
};
