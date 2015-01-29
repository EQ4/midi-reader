var reader; //GLOBAL File Reader object
var resultString;
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
	    bytes.push(txt.charCodeAt(i).toString(16));
	    document.getElementById("main").innerHTML += txt.charCodeAt(i).toString(16);
	    if (i % 40 == 0){
	    	document.getElementById("main").innerHTML += "</br>";
	    }
	}
	parseHeader(bytes);
	parseRemaining(bytes)
	printGuido();

} 

function parseHeader(bytes){

}
function parseRemaining(bytes){

}

function printGuido(){
	document.getElementById("guido").innerHTML = resultString;
}



















