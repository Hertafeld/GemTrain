#pragma strict
var startButton : GameObject;
var call : AudioSource;
function Start () {
	call = gameObject.AddComponent("AudioSource") as AudioSource;
	call.clip = Resources.Load('Sounds/git_on') as AudioClip;
	
}

function Update () {

}
function nextLevel(){
	call.Play();
	yield WaitForSeconds(3);
	Application.LoadLevel('GemGame');
}
function OnGUI () {
	if (GUI.Button (Rect (Screen.width/2 - 50 ,Screen.height/2,150,50), "All Aboard!")) {
		nextLevel();
		
	}
		// Printing goes to the Console pane.  
		// If an object doesn't extend monobehavior (it will by default, but not if you define your own class), calling print won't do anything.  
		// Make sure "Collapse" isn't selected in the Console pane if you want to see duplicate messages.
}