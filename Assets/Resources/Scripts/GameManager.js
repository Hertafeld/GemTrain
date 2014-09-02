// Tom Wexler
// Example program to help you get started with your project.


var gemFolder : GameObject;	// This will be an empty game object used for organizing objects in the hierarchy pane.
var gems : Array;			// This array will hold the gem objects that are created.
var gemType : int; 		// The next gem type to be created.
var squareFolder : GameObject;
var squares : Array;
var trains : Array;
var timer : float;
var secondTenth : float;
static var score : int;
static var dead : boolean;
var activeGems : int;
static final var X_LENGTH = 20;
static final var Y_LENGTH = 12;
static final var X_OFFSET = 8;
static final var Y_OFFSET = 6;



// Called once when the script is created.
function Start () {
	dead = false;
	score = 0;
	secondTenth = 0;
	timer = 60.0;
	gemFolder = new GameObject();  
	gemFolder.name = "Gems";
	gems = new Array();
	gemType = 1;
	squareFolder = new GameObject();
	squareFolder.name = "Squares";
	trainFolder = new GameObject();
	trainFolder.name = "Trains";
	
	trains = new Array();
	squares = new Array();
	for(var x = 0; x <= X_LENGTH; x++){
		squares[x] = new Array();
		for(var y = 0; y <= Y_LENGTH; y++){
			squares[x][y] = null;
		}
	}
	level = [[  null,  null,  null,  null,  null,  "SE",  "WE", "WES",  "WE",  "WE",  "WS"],
			 [  "SE", "EWS",  "WE",  "WE",  "WE", "WNS",  null,  "NS",  null,  null,  "NS"],
			 [  "NS",  "NE",  "WE",  "WS",  null,  "NE",  "WE", "WEN",  "WS",  null,  "NS"],
			 [ "NSE",  "WE",  "WE", "WEN", "WES",  "WE",  "WS",  null, "SNE",  "WE",  "NSW"],
			 [  "NS",  null,  null,  null,  "NS",  null, "SNE",  "WE", "WNS",  null,  "NS"],
			 [  "NE",  "WE",  "WE",  "WE","NSEW",  "WE", "NSW",  null,  "NS",  null,  "NS"],
			 [  null,  null,  null,  null,  "NS",  null,  "NS",  null,  "NS",  null,  "NS"],
			 [  null,  null,  null,  null,  "NE",  "WE", "WEN",  "WE", "NWE",  "WE",  "WN"]];

			 
	test = [["NS", "EW", "NS"],
			["EWS", "NW", "NS"]];
	buildLevel(level, 2, 1);
	print(squares);
	makeTrain(-6, 2, 40, "1");
	makeTrain(1, 4, 40, "2");
	makeTrain(0, 1, 40, "3");

	addGem(getFreeSpot());
	addGem(getFreeSpot());
	//Application.LoadLevel('StartScreen');


	
}

function buildLevel(level, y_offset, x_offset){
	for(var x = 0; x < level.length; x++){
		for(var y = 0; y < level[0].length; y++){
			print(squares[0].length);
			makeSquare(y + y_offset - X_OFFSET, squares[0].length - (1 + x + x_offset) - Y_OFFSET, level[x][y]);
		}
	}
}

//Makes a square
function makeSquare(x : int, y : int, dirs : String){
	print (y+Y_OFFSET);
	if (squares[x+X_OFFSET][y+Y_OFFSET] == null && dirs != null){
		var squareObject = new GameObject();
		var squareScript = squareObject.AddComponent("Square");
		squareScript.transform.parent = squareFolder.transform;
		squareScript.transform.position = Vector3(x, y, 0);
		squareScript.init(dirs);
		squares[x+X_OFFSET][y+Y_OFFSET] = squareScript;
		squareScript.name = "Square (" + x + ", " + y + ")";
	}
	
}
function getFreeSpot() : Square {
	var spot = squares[Mathf.Floor(Random.value * squares.length)][Mathf.Floor(Random.value * squares[0].length)];
	if(spot != null && spot.directions != null && spot.gem == null) return spot;
	return getFreeSpot();
}

function makeTrain(x : int, y : int, speed, type){
	var trainObject = new GameObject();
	var trainScript = trainObject.AddComponent("Train");
	trainScript.transform.position = Vector3(x, y, -.1);
	trainScript.init(speed, type);
	

	trainScript.name = "Train";
	trains.Add(trainScript);
}
	
function squareAt(x : int, y : int){
	return squares[x+X_OFFSET][y+Y_OFFSET];
}
// Called every frame.
function Update () {
	
	secondTenth += Time.deltaTime;
	if(secondTenth >= .1){	
		secondTenth = 0;
		timer -= .1;
		for(g in gems){
			g.decreaseTime();
			if (g.outOfTime() && g.model != null){
				removeGem(g.square);
			}
		}
	}
	if(timer <= 0){
		gameOver();
	}
	switch(activeGems){
	case 0: spawnGem(1);
	break;
	case 1: spawnGem(.01);
	break;
	case 2: spawnGem(.001);
	break;
	case 3: spawnGem(.0005);
	break;
	}
	
	
	if (Input.GetMouseButtonUp(0)) { // If the user releases the mouse button, figure out where the mouse is and spawn a gem.
		var worldPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		var mouseX = worldPos.x;
		var mouseY = worldPos.y;
		//print("you just clicked at "+mouseX+" "+mouseY);
		//addGem(mouseX, mouseY);
		//makeSquare(Mathf.Floor(mouseX + .5), Mathf.Floor(mouseY + .5), "NSEW");
		click(Mathf.Floor(mouseX + .5), Mathf.Floor(mouseY + .5));
				
	}
	for (train in trains){
			
			var currentSquare : Square = squareAt(Mathf.Floor(train.model.transform.position.x + .5), Mathf.Floor(train.model.transform.position.y + .5));
			if (currentSquare != train.square){
				train.square = currentSquare;
				train.from = opposite(train.to);
				//print("Old direction " + train.from + ", Square directions: " + train.square.directions);

				if(train.from == currentSquare.directions[0]){
					train.to = currentSquare.directions[1];
				} else{
					train.to = currentSquare.directions[0];
				}
				
				if(currentSquare.directions == "NSEW"){
					switch (train.from){
						case 'N'[0]: train.to = 'S'[0]; break;
						case 'S'[0]: train.to = 'N'[0]; break;
						case 'E'[0]: train.to = 'W'[0]; break;
						case 'W'[0]: train.to = 'E'[0]; break;
					}
				}
				if (currentSquare.gem != null){
					score++;
					collectGem(currentSquare);
					
					//addGem(getFreeSpot());
				}
				train.center();
				for(t in trains){
					if (t.square == train.square && t != train){
						dead = true;
						gameOver();
					}
					
				}

			}
		}
}

function gameOver(){
	Application.LoadLevel('EndScreen');
	

}
function opposite(dir){
	switch(dir){
		case "N"[0]: return "S"[0]; break;
		case "S"[0]: return "N"[0]; break;
		case "E"[0]: return "W"[0]; break;
		case "W"[0]: return "E"[0]; break;
	}
}

function click(x, y){
	if (squareAt(x, y) == null) {
		//makeSquare(x, y, "NSEW");
	} else{
		if(squareAt(x, y).directions.length == 3) {
			squareAt(x, y).flip();
		}
	}
}
function addGem(square : Square){
	activeGems++;
	var x = square.model.transform.position.x;
	var y = square.model.transform.position.y;
	var gemObject = new GameObject();					// Create a new empty game object that will hold a gem.
	var gemScript = gemObject.AddComponent("gem");		// Add the gem.js script to the object.
														// We can now refer to the object via this script.
	gemScript.transform.parent = gemFolder.transform;	// Set the gem's parent object to be the square.
	gemScript.transform.position = Vector3(x,y,-.2);		// Position the gem at x,y.								
	
	gemScript.init(gemType, square);							// Initialize the gem script.
	
	gems.Add(gemScript);								// Add the gem to the gems array for future access.
	gemScript.name = "Gem "+gems.length;				// Give the gem object a name in the Hierarchy pane.
	
	gemType = (gemType%4) + 1;
	square.gem = gemScript;
}

function collectGem(square : Square){
	gems.remove(square.gem);

	square.gem.ding.Play();
	square.gem.model.transform.localPosition = Vector3(-100,0,0);	
	Destroy(square.gem.model);	
	activeGems--;
	square.gem=null;
}						
function removeGem(square : Square){
	gems.remove(square.gem);
	square.gem.model.transform.localPosition = Vector3(-100,0,0);	
	Destroy(square.gem.model);	
	activeGems--;
	square.gem=null;
}
function spawnGem(chance : float){
	if(Random.value < chance)
		addGem(getFreeSpot());
	
}

function OnGUI () {
	GUI.Label(Rect(10, 10, 200, 20), "Time: " + timer.ToString().Substring(0, timer.ToString().IndexOf('.') + 2));
	GUI.Label(Rect(Screen.width - 210, 10, 200, 20), "Score: " + score);
	if (GUI.Button (Rect (10, Screen.height-30, 200, 20), "Reset")) {
		Application.LoadLevel('GemGame');
	}
	if (GUI.Button (Rect (Screen.width-210, Screen.height-30, 200, 20), "Quit")) {
		Application.Quit();
	}
		// Printing goes to the Console pane.  
		// If an object doesn't extend monobehavior (it will by default, but not if you define your own class), calling print won't do anything.  
		// Make sure "Collapse" isn't selected in the Console pane if you want to see duplicate messages.
}