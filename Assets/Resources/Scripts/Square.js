#pragma strict


var model : trackModel;
var switchable : boolean;
var directions : String;
var gem : gem;
var click : AudioSource;

function init(dirs : String){
	var modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);
	//AudioSource click = modelObject.AddComponent<AudioSource>();
	click = gameObject.AddComponent("AudioSource") as AudioSource;
	click.clip = Resources.Load('Sounds/click_sound') as AudioClip;
	directions = dirs;
	if (dirs.length == 3){
		switchable = true;
	} else{
		switchable = false;
	}
			// Create a quad object for holding the gem texture.
	model = modelObject.AddComponent("trackModel");
						
	model.transform.parent = transform;									// Set the model's parent to the gem (this object).
	model.transform.localPosition = Vector3(0,0,0);						// Center the model on the parent.
	model.name = "Track Model";											// Name the object.
	model.renderer.material.mainTexture= Resources.Load("Textures/track" + getSuffix(), Texture2D);	// Set the texture.  Must be in Resources folder.
	model.renderer.material.color = Color(1,1,1);	
	transform.eulerAngles = Vector3(0.0,0.0,identifyRotation());
											// Set the color (easy way to tint things).
	model.renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
}

function flip(){
	click.Play();
	directions = directions[0].ToString() + directions[2].ToString() + directions[1].ToString();
	model.renderer.material.mainTexture= Resources.Load("Textures/track" + getSuffix(), Texture2D);	// Set the texture.  Must be in Resources folder.

	
}
	
function identifyType(){
	switch(directions){
		case "NS": case "SN": case "EW": case "WE": return "straight";
		break;
		case "NE": case "ES": case "SW": case "WN": return "left";
		break;
		case "NW": case "WS": case "SE": case "EN": return "right";
		break;
		case "NES": case "ESW": case "SWN": case "WNE": return "left-straight";
		break;
		case "NWS": case "WSE": case "SEN": case "ENW": return "right-straight";
		break;
		case "NSE": case "EWS": case "SNW": case "WEN": return "straight-left";
		break;
		case "NSW": case "WES": case "SNE": case "EWN": return "straight-right";
		break;
		case "NEW": case "ESN": case "SWE": case "WNS": return "left-right";
		break;
		case "NWE": case "WSN": case "SEW": case "ENS": return "right-left";
		break;
		case "NSEW" : return "four-way";
		break;
	}
}
function getSuffix(){
	switch(identifyType()){
		case "straight": return "NS";
		break;
		case "left": return "NE";
		break;
		case "right": return "NE";
		break;
		case "left-straight": return "SWN";
		break;
		case "right-straight": return "SEN";
		break;
		case "straight-left": return "SNW";
		break;
		case "straight-right": return "SNE";
		break;
		case "left-right": return "SWE";
		break;
		case "right-left": return "SEW";
		break;
		case "four-way": return "NSEW";
		break;
	}
}
function identifyRotation(){
	var angle = 0;
	if(identifyType().Equals("left") || identifyType().Equals("right")) angle += 180;
	if(identifyType().Equals("right")) angle += 90;
	if(directions[0] == 'N') angle += 180;
	if(directions[0] == 'E') angle += 90;
	if(directions[0] == 'S') angle += 0;
	if(directions[0] == 'W') angle += 270;
	return angle;
}






function Start () {

}

function Update () {

}