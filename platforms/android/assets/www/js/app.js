var resultDiv;

document.addEventListener("deviceready", init, false);
function init() {
	document.querySelector("#startScan").addEventListener("touchend", startScan, false);
	resultDiv = document.querySelector("#results");
	document.querySelector("#startRead").addEventListener("touchend", startRead, false);

}

function startScan() {

	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var s = "Result: " + result.text + "<br/>" +
			"Format: " + result.format + "<br/>" +
			"Cancelled: " + result.cancelled;
			resultDiv.innerHTML = s;
			startRead(result.text);
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	);

}

function startRead(s){
var xmlhttp = new XMLHttpRequest();
var url = "http://mnf.website/pricecheck.php?id="+s;

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
      

    document.getElementById("id01").innerHTML = "Name: "+myArr.name+"<br>Price: "+myArr.Price;
	
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();


}
