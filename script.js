/*
RALPH CALACHAN
OSUID: CALACHAR
CS WEB DEVELOPMENT ASSIGNTMENT 3
*/

//INITIALIZE X Y COORDS
var x = 0;
var y = 1;

document.addEventListener('DOMContentLoaded', bindButtons);
	function deleteRow(r) {
    var i = r.parentNode.rowIndex;
    document.getElementById("ThisTable").deleteRow(i);
	}
	
	function createTable(req){
		console.log("CREATING TABLE");
		console.log(JSON.parse(req.responseText));
		var response = JSON.parse(req.responseText)
		//console.log(response);
		if(document.getElementById("ThisTable")){
					var loseBody = document.getElementById("ThisTable");
					loseBody.parentNode.removeChild(loseBody);
			}
			var AddBody = document.getElementsByTagName("body")[0];
			var newTable = document.createElement("table");
			newTable.id = "ThisTable";
			newTable.style.width = '100%';
			newTable.setAttribute('border', '1');
			var newTR = document.createElement("tr");
			
			var newRow = document.createElement("th");
			newRow.textContent = "Activity";
			newTR.appendChild(newRow);
			
			var newRow = document.createElement("th");
			newRow.textContent = "Reps";
			newTR.appendChild(newRow);
			
			var newRow = document.createElement("th");
			newRow.textContent = "Weight";
			newTR.appendChild(newRow);
			
			var newRow = document.createElement("th");
			newRow.textContent = "Units";
			newTR.appendChild(newRow);
			
			var newRow = document.createElement("th");
			newRow.textContent = "Date";
			newTR.appendChild(newRow);
			
			var newRow = document.createElement("th");
			newRow.textContent = "DELETE";
			newTR.appendChild(newRow);
			
			newTable.appendChild(newTR);		  
			
			
			
			//testing

			for(var k = 0; k < response.length; k++){
				var newTR = document.createElement("tr");
				newTR.id = response[k].id;
				//console.log(newTR.id);
				var newRow = document.createElement("th");
				newRow.textContent = response[k].name;
				newTR.appendChild(newRow);
				
				var newRow = document.createElement("th");
				newRow.textContent = response[k].reps;
				newTR.appendChild(newRow);
				
				var newRow = document.createElement("th");
				if(response[k].weight != null){
					newRow.textContent = response[k].weight;
				}
				else{
					newRow.textContent = "N/A";
				}
				newTR.appendChild(newRow);
				
				var newRow = document.createElement("th");
				if(response[k].lbsorkg == 1){
					newRow.textContent = "lbs";
				}
				else if(response[k].lbsorkg == 0){
					newRow.textContent = "kgs";
				}
				else{ newRow.textContent = "N/A";
				}
				newTR.appendChild(newRow);
				
				var newRow = document.createElement("th");
				newRow.textContent = response[k].dateDone;
				newTR.appendChild(newRow);
				
				
				var newRow = document.createElement("button");
				//console.log("this checker");
				//console.log(newTR);
				//DELETE IN DATABASE
				newTR.addEventListener("click", function(){
					var req = new XMLHttpRequest();
					var targetUrl = "http://flip2.engr.oregonstate.edu:3493/delete"
					var payload = {id: null};
					payload.id = this.id;
					console.log("the payload is " + payload.id);
					req.open("POST", targetUrl , true);
					req.setRequestHeader('Content-Type', 'application/json');
					req.addEventListener('load',function(){
					if(req.status >= 200 && req.status < 400){
						var response = JSON.parse(req.responseText);
					}
					else {
						console.log("Error in network request: " + req.statusText);
					}});
					console.log("Payload is");
					console.log(payload);
					req.send(JSON.stringify(payload));
					console.log(this.id);document.getElementById("ThisTable").deleteRow(this.rowIndex);
					event.preventDefault();
					}
				);
				
				newRow.textContent = "Delete";
				//newRow.addEventListener("click", deleteRow(0));
				newTR.appendChild(newRow);
				
				newTable.appendChild(newTR);
			}
			newTable.appendChild(newTR);
			
			AddBody.appendChild(newTable);
	}


      function bindButtons(){
		//ADD ITEM BIND
		document.getElementById('newSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
		var targetUrl = "http://flip2.engr.oregonstate.edu:3493/insert"
		var payload = {name: null, reps: null, weight: null, date: null, lbsorkg: null};
		payload.name = document.getElementById("activityName").value;
		payload.reps = document.getElementById("activityReps").value;
		payload.weight = document.getElementById("activityWeight").value;
		payload.date = document.getElementById("activityDate").value;
		if(Number(document.getElementById("lbs").checked)){
			payload.lbsorkg = 1;
		}
		else{
			payload.lbsorkg = 0;
		}
		req.open("POST", targetUrl , true);
		req.setRequestHeader('Content-Type', 'application/json');
		console.log(req);
		req.addEventListener('load',function(){
			if(req.status >= 200 && req.status < 400){
				console.log("fixed?");
				createTable(req);
			}
			else {
				console.log("Error in network request: " + req.statusText);
		}});
		console.log("Payload is");
		console.log(payload);
		req.send(JSON.stringify(payload));
		event.preventDefault();
		})
		
		
		
		//THE GRAPH CREATOR
        
        var req = new XMLHttpRequest();
		req.open("POST", "http://flip2.engr.oregonstate.edu:3493/", true);
		req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
			createTable(req);
		}
		else {
			console.log("Error in network request: " + req.statusText);
		}});
		req.send(null);
		
		
		event.preventDefault();
		  

        
		
      }
	 
//INITIALIZE TABLE




