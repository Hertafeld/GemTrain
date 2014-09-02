#pragma strict

var model: trainModel;
var frames_per_square : float;
var square : Square;
var from : char;
var to: char;
static final var PI4 = Mathf.PI/4;
function init(s, t){
	
	from = 'S'[0];
	to = 'S'[0];
	
	
	frames_per_square = s;
	var modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);

	model = modelObject.AddComponent("trainModel");
						
	model.transform.parent = transform;									// Set the model's parent to the gem (this object).
	model.transform.localPosition = Vector3(0,0,-.1);						// Center the model on the parent.
	
	model.renderer.material.mainTexture= Resources.Load("Textures/train" + t, Texture2D);	// Set the texture.  Must be in Resources folder.
	model.renderer.material.color = Color(1,1,1); // Set the color (easy way to tint things).
	
	transform.eulerAngles = Vector3(0.0,0.0, 180.0);
	model.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); // Tell the renderer that our textures have transparency. 
}



function opposite(dir){
	switch(dir){
		case "N"[0]: return "S"[0]; break;
		case "S"[0]: return "N"[0]; break;
		case "E"[0]: return "W"[0]; break;
		case "W"[0]: return "E"[0]; break;
	}
}
function right(dir){
	switch(dir){
		case "N"[0]: return "W"[0]; break;
		case "S"[0]: return "E"[0]; break;
		case "E"[0]: return "N"[0]; break;
		case "W"[0]: return "S"[0]; break;
	}
}
function left(dir){
	switch(dir){
		case "N"[0]: return "E"[0]; break;
		case "S"[0]: return "W"[0]; break;
		case "E"[0]: return "S"[0]; break;
		case "W"[0]: return "N"[0]; break;
	}
}
function center(){
	switch(from){
		case "N"[0]: model.transform.position.x = Mathf.Floor(model.transform.position.x + .5);
					 model.transform.eulerAngles = Vector3(0, 0, 180);
					 break;
		case "S"[0]: model.transform.position.x = Mathf.Floor(model.transform.position.x + .5);
					 model.transform.eulerAngles = Vector3(0, 0, 0);
					 break;
		case "E"[0]: model.transform.position.y = Mathf.Floor(model.transform.position.y + .5);
					 model.transform.eulerAngles = Vector3(0, 0, 90);
					 break;
		case "W"[0]: model.transform.position.y = Mathf.Floor(model.transform.position.y + .5);
					 model.transform.eulerAngles = Vector3(0, 0, -90);
					 break;
	}
}

function gameOver(){
	Destroy(model);
}
function Update () {
	if(model == null){
		return;
	}
	var travelDistance = 1/frames_per_square;
	var twist = Vector3(0, 0, 0);
	if (right(from) == to){
		travelDistance = travelDistance * PI4;
		twist = Vector3(0, 0, -90/frames_per_square);
	}
	if (left(from) == to){
		travelDistance = travelDistance * PI4;
		twist = Vector3(0, 0, 90/frames_per_square);
	}
	model.transform.Translate(Vector3.up*travelDistance);
	model.transform.Rotate(twist);

	//transform.eulerAngles = Vector3(0,0.0,90 * (progress / frames_per_square));
	
	

}