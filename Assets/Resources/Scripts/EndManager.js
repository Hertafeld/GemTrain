#pragma strict
var startButton : GameObject;
var again : AudioSource;
var quit : AudioSource;
var image : Texture2D;
var win : AudioSource;
var lose : AudioSource;
var myStyle : GUIStyle;
function Start(){
	image =  Resources.Load("Textures/gemScreen", Texture2D);
	
	
	lose = gameObject.AddComponent("AudioSource") as AudioSource;
	lose.clip = Resources.Load('Sounds/boomSound') as AudioClip;
	win = gameObject.AddComponent("AudioSource") as AudioSource;
	win.clip = Resources.Load('Sounds/yeehaw') as AudioClip;
	
	again = gameObject.AddComponent("AudioSource") as AudioSource;
	again.clip = Resources.Load('Sounds/try_again') as AudioClip;
	quit = gameObject.AddComponent("AudioSource") as AudioSource;
	quit.clip = Resources.Load('Sounds/goodbye') as AudioClip;
	
	if(!GameManager.dead){
		playWin();
	}else{
		playLose();
	}
}

function Update () {

}
function tryAgain(){
	again.Play();
	yield WaitForSeconds(2);
	Application.LoadLevel('GemGame');
}

function quitGame(){
	quit.Play();
	yield WaitForSeconds(2);
	Application.Quit();
}
function playLose(){
	lose.Play();
}
function playWin(){
	win.Play();
}

function OnGUI () {
	if(!GameManager.dead){
		GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), image);
		GUI.Label(Rect(200, 30, 300, 20), "Nice job with that gem trainin'! You got " + GameManager.score + " of 'em!", myStyle);
	}
	
	if (GUI.Button (Rect (Screen.width/2 - 120 , Screen.height/3,150,50), "Git back on!")) {
		tryAgain();	
	}
	if (GUI.Button (Rect (Screen.width/2 + 60, Screen.height/3,150,50), "Quittin' time")) {
		quitGame();	
	}
		// Printing goes to the Console pane.  
		// If an object doesn't extend monobehavior (it will by default, but not if you define your own class), calling print won't do anything.  
		// Make sure "Collapse" isn't selected in the Console pane if you want to see duplicate messages.
}