let baseURL = "https://developer.nps.gov/api/v1/parks?";
let apiKey = "api_key=8pLcx0CKb31qq20dHrdn0UzNA8X1gF5JvhnIRfjG";
let limit = "limit=600&"
let parkName = "";

function get_data() {
    let qVal = "";
    let state = "";
    let designation = document.getElementById("designation-dropdown").value;
    console.log(designation);
    
    if(document.getElementById("keyword").value) {
        qVal = "q=" + document.getElementById("keyword").value + "&";
    } else if(designation) {
        qVal = "q=" + designation + "&";
    }
    
    if(document.getElementById("state-dropdown").value) {
        state = "stateCode=" + document.getElementById("state-dropdown").value + "&";
    }
    
    let combinedURL = baseURL + qVal + state + limit + apiKey;
    console.log(combinedURL);
    
    let request = new XMLHttpRequest();
    request.open('GET', combinedURL);
    
    request.responseType = "json";
    request.send();
    
    request.onload = function() {
    
        let result = request.response.data;
        
        display_results(result);
    }
    
}

function display_results(result) {
    let designation = document.getElementById("designation-dropdown").value;
    let content = document.getElementById("content");
    
    content.removeChild(document.getElementById("search-functionality"));
    
    let backButton = document.createElement("button");
    backButton.appendChild(document.createTextNode("Back to Search"));
    backButton.setAttribute("onclick", "location.reload()");
    
    content.appendChild(backButton);
    
    let resultsList = document.createElement("ul");
    let count = 0;
    
    for(let entry of result) {
        
        if (designation == "Other Designations") {
            if(entry.designation == "") {
                appendToList(entry, resultsList);
                count++;
            }
        } else if(entry.designation.includes(designation)) {
            appendToList(entry, resultsList);
            count++;
        } else if(designation == "") {
            appendToList(entry, resultsList);
            count++;
        }
        
        content.appendChild(resultsList);
       
    }
    
    let resultCount = document.createElement("p");
    resultCount.appendChild(document.createTextNode("Results: " + count));
    content.appendChild(resultCount);
    
}

function appendToList(entry, resultsList) {
    let listElement = document.createElement("li");
    let listLink = document.createElement("a");
    listLink.setAttribute("href", "park.html" + "?parkcode=" + entry.parkCode);
    listLink.setAttribute("value", entry.parkCode);
    listLink.appendChild(document.createTextNode(entry.fullName));
    
    listLink.addEventListener("click", () => {
        qVal = listLink.id;
        console.log(qVal);
        get_park_data(qVal);
    });
    
    listElement.appendChild(listLink);
    resultsList.appendChild(listElement);
    return resultsList;
}

/*
function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
*/