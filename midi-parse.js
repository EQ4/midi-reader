var reader; //GLOBAL File Reader object
var resultString;
var readIndex = 0;
var ticksPerQuarter = 0;
var bytes = [];
var runningStatus;
function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
        return true; 
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}

/**
 * read text input
 */
function readText(filePath) {
    var output = "";
    if(filePath.files && filePath.files[0]) {           
        reader.onload = function (e) {
            output = e.target.result;
            parseMidi(output);
        };
        reader.readAsBinaryString(filePath.files[0]);
    }
    return true;
}   

/**
 * display content using a basic HTML replacement
 */
function parseMidi(txt) {
	

	for (var i = 0; i < txt.length; ++i)
	{
	    bytes.push(txt.charCodeAt(i));
	    document.getElementById("main").innerHTML += txt.charCodeAt(i).toString(16) + " | ";
	    if (i % 40 == 0){
	    	document.getElementById("main").innerHTML += "</br>";
	    }
	}
	if(fileIsMidi(bytes)){
		parseHeader(bytes);
		parseTrack(bytes)
		printGuido();
	}else{
		alert("The file is corrupt. Please choose another file.")
	}

} 

function parseHeader(){
	//first 4 bytes read in fileISMidi
	readIndex += 4; 

	//read header length (4 bytes)
	readIndex += 3; // Just hope that these are unused.
	var headerLength = bytes[readIndex];
	readIndex += 1;

	//make sure its type 1 (2 bytes)
	readIndex += 1;
	var fileType = bytes[readIndex];
	document.getElementById("stats").innerHTML += "<h5><b>File Type: " + fileType + "</b></h5>";
	readIndex += 1;

	//track count (2 bytes)
	readIndex += 1;
	var trackNumber = bytes[readIndex];
	document.getElementById("stats").innerHTML += "<h5><b>Track Number: " + trackNumber + "</b></h5>";
	readIndex += 1;

	//tick (2 bytes)
	readIndex += 1; //Hope that the tempo is under 256 ticks/quarter note
	ticksPerQuarter = bytes[readIndex];
	document.getElementById("stats").innerHTML += "<h5><b>Ticks per Quarter Note: " + ticksPerQuarter + "</b></h5>"
	readIndex +=1;

}
function parseTrack(){
	//MTRK first (4 bytes), Just hope that this is correct
	readIndex += 4;

	//track length (4 bytes)
	var trackLength = getFourByteNumber();
	document.getElementById("stats").innerHTML += "<h5><b>Track Length: " + trackLength + "</b></h5>"
	
	while(!isEnd()){
		parseTime();
		parseEvent();
	}

}

function printGuido(){
	//document.getElementById("guido").innerHTML = resultString;
}
function fileIsMidi(){
	if(bytes[0] == 0x4d && bytes[1] == 0x54 && bytes[2] == 0x68 && bytes[3] == 0x64){
		return true;
	}
	return false;
}

function getFourByteNumber(){
	var first = Math.pow(256,3) * bytes[readIndex];
	readIndex += 1;
	var second = Math.pow(256,2) * bytes[readIndex];
	readIndex += 1;
	var third = 256 * bytes[readIndex];
	readIndex += 1;
	var fourth = bytes[readIndex];
	readIndex += 1;
	return first + second + third + fourth;
}



function isEnd(){
	if(bytes[readIndex] == 0xff && bytes[readIndex + 1] == 0x2f && bytes[readIndex + 2] == 0x0){
		return true;
	}
	return false;
}
function parseSystemCommand(){
	if(bytes[readIndex] == 0xff){
		readIndex += 1;
		if(bytes[readIndex] == 0x00 || bytes[readIndex] == 0x20 || bytes[readIndex] == 0x2f
			|| bytes[readIndex] == 0x51 || bytes[readIndex] == 0x54 || bytes[readIndex] == 0x58 
			|| bytes[readIndex] == 0x59){
			readIndex += 1;
			//check for key signature here 0x59
			//check for time signature here 0x58
			return;
		}else{
			readIndex += 1;
			var len = bytes[readIndex];
			readIndex += 1;
			readIndex += len;
		}
	}
}


function parseTime(){
	if (bytes[readIndex] == 0x0){	
		
	}
	if(bytes[readIndex] >> 7 == 1){
		readIndex + 1;
		parseTime();
	}else{
		readIndex += 1;
	}
	//keep track of last_time variable here
}

function handleNoteOn(){
	readIndex += 3;
}
function handleNoteOff(){
	readIndex += 3;
}

function parseEvent(){
	if(bytes[readIndex] >= 0xf0){
		parseSystemCommand();
		return;
	}
	if(bytes[readIndex] >= 0xe0){
		//pitch bend
		readIndex += 2;
		return;
	}
	if(bytes[readIndex] >= 0xd0){
		//channel presure
		readIndex += 2;
		return;
	}
	if(bytes[readIndex] >= 0xc0){
		//patch change
		readIndex += 2;
		return;
	}
	if(bytes[readIndex] >= 0xb0){
		//controller
		readIndex += 3;
		return;
	}
	if(bytes[readIndex] >= 0xa0){
		//aftertouch
		readIndex += 3;
		return;
	}
	if(bytes[readIndex] >= 0x90){
		handleNoteOn();
		return;
	}
	if(bytes[readIndex] >= 0x80){
		handleNoteOff();
		return;
	}

}

















