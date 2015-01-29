var reader; //GLOBAL File Reader object
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
            displayContents(output);
        };
        reader.readAsBinaryString(filePath.files[0]);
    }
    return true;
}   

/**
 * display content using a basic HTML replacement
 */
function displayContents(txt) {
	var bytes = [];

	for (var i = 0; i < txt.length; ++i)
	{
	    bytes.push(txt.charCodeAt(i));
	}

	alert(bytes); // 72,0,101,0,108,0,108,0,111,0

    // var el = document.getElementById('main'); 
    // el.innerHTML = txt; //display output in DOM
} 