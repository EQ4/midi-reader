var reader; //GLOBAL File Reader object
var resultString;
var readIndex = 0;
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
	var bytes = [];

	for (var i = 0; i < txt.length; ++i)
	{
	    bytes.push(txt.charCodeAt(i));
	    // document.getElementById("main").innerHTML += txt.charCodeAt(i).toString(16);
	    // if (i % 40 == 0){
	    // 	document.getElementById("main").innerHTML += "</br>";
	    // }
	}
	if(fileIsMidi(bytes)){
		parseHeader(bytes);
		parseTrack(bytes)
		printGuido();
	}else{
		alert("The file is corrupt. Please choose another file.")
	}

} 

function parseHeader(bytes){
	readIndex += 4; //first 4 bytes read in fileISMidi
	//read header length (4 bytes)
	//make sure its type 1 (2 bytes)
	//track count (2 bytes)
	//tick (2 bytes)

}
function parseTrack(bytes){
	//MTRK first (4 bytes)
	//track length (4 bytes)

}

function printGuido(){
	document.getElementById("guido").innerHTML = resultString;
}
function fileIsMidi(bytes){
	if(bytes[0] == 0x4d && bytes[1] == 0x54 && bytes[2] == 0x68 && bytes[3] == 0x64){
		return true;
	}
	return false;
}






















