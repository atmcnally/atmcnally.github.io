let baseURL = "https://developer.nps.gov/api/v1/parks?";
let apiKey = "api_key=8pLcx0CKb31qq20dHrdn0UzNA8X1gF5JvhnIRfjG";
let limit = "limit=600&"

let parkCode = decodeURIComponent(window.location.search).substring(10);

function get_park_data(parkCode, fields) {

    let combinedURL = baseURL + "parkCode=" + parkCode + "&fields=" + fields + "&" + apiKey;
    console.log(combinedURL);
    
    let request = new XMLHttpRequest();
    request.open('GET', combinedURL);
    
    request.responseType = "json";
    request.send();
    
    request.onload = function() {
    
        let result = request.response.data;
        
        build_park_page(result);
    }
}

function build_park_page(result){
    let park = result[0];
    
    let count = 0;
    for (let link of document.getElementsByClassName("nav-link")) {
    
        link.setAttribute("href", link + "?parkcode=" + park.parkCode);
    }
    
    document.getElementById("intro").getElementsByTagName("h1")[0].innerHTML = park.fullName;
    document.getElementById("intro").getElementsByTagName("p")[0].innerHTML = park.description;
    
    createSlideshow(park);
    
    
    if(park.latLong.length > 4) {

        document.getElementById('mapTitle').innerHTML = "Location";
        
        initMap(park);
        
    } else {
        document.getElementById("map").remove();
    }
    
    populateBoxes(park);
}

function createSlideshow(park) {
    document.getElementById("slideshow").style.backgroundSize = "100%";
    
    if(park.images.length == 1) {
        document.getElementById("slideshow").style.backgroundImage = "url(" + park.images[0].url + ")";
    } else {
        let count = 1;
        for(let iter of park.images) {
            let newImg = document.createElement("img");
            newImg.setAttribute("src", iter.url);
            newImg.style.animationDelay = 12 * (park.images.length -  count) + "s";
            count++;
            document.getElementById("slideshow").appendChild(newImg);
        }
    }
}


function initMap(park) {

    let loc = park.latLong;
    let latO = parseFloat(loc.substr(4, loc.indexOf(',') - 4));
    let longO = parseFloat(loc.substr(loc.indexOf(',') + 7));
    let locat = {lat: latO, lng: longO};
    let map = new google.maps.Map(document.getElementById('map'), {zoom: 6, center: locat});
    let marker = new google.maps.Marker({position: locat, map: map});
}

/*function initMap(park) {
    let loc = park.latLong;
    let latO = parseFloat(loc.substr(4, loc.indexOf(',') - 4));
    let longO = parseFloat(loc.substr(loc.indexOf(',') + 7)); */
    
    /*
    let mymap = L.map('mapid').setView([lat, long], 7);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={pk.eyJ1IjoiYW1jbmFsbHkiLCJhIjoiY2p4OTFraGZsMGhrbzQwbW5ldWtxZDFlOCJ9.rvVw4Hhr1QTNrI2fLnnSFA}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.satellite',
    accessToken: 'pk.eyJ1IjoiYW1jbmFsbHkiLCJhIjoiY2p4OTFraGZsMGhrbzQwbW5ldWtxZDFlOCJ9.rvVw4Hhr1QTNrI2fLnnSFA'
}).addTo(mymap);
    
    var marker = L.marker([lat, long]).addTo(mymap); */
//}


function populateBoxes(park) {
    if(park.directionsInfo.length > 5) {
        document.getElementById("directionsBox").innerHTML = park.directionsInfo;
        document.getElementById("directionsURL").setAttribute("href", park.directionsUrl);
    } else {
        document.getElementById("directionsBox").innerHTML = "Sorry, no information is available!";
        document.getElementById("directionsURL").innerHTML = "";
    }
    
    if(park.weatherInfo.length > 5) {
        document.getElementById("weatherBox").innerHTML = park.weatherInfo;
    } else {
        document.getElementById("weatherBox").innerHTML = "Sorry, no information is available!";
    }
    
    if(park.entranceFees.length > 0) {
        for(let fee of park.entranceFees) {
            let newRow = document.getElementById("feesBox").insertRow();
            //document.createElement("tr")
            
            //make new tds with each datapoint
            let newTd = newRow.insertCell();
            let newText = document.createTextNode(fee.title);
            newTd.appendChild(newText);
            newRow.appendChild(newTd);
            
            newTd = newRow.insertCell();
            newText = document.createTextNode(fee.description);
            newTd.appendChild(newText);
            newRow.appendChild(newTd);
            
            newTd = newRow.insertCell();
            newText = document.createTextNode(fee.cost);
            newTd.appendChild(newText);
            newRow.appendChild(newTd);
            
        }
        
    } else {
        //remove table
        document.getElementById("feesTitle").remove();
        document.getElementById("feesBox").remove();
    }
    
    if(park.entrancePasses.length > 0) {
        for(let pass of park.entrancePasses) {
            let newRow = document.getElementById("passesBox").insertRow();
            //document.createElement("tr")
            
            //make new tds with each datapoint
            let newTd = newRow.insertCell();
            let newText = document.createTextNode(pass.title);
            newTd.appendChild(newText);
            newRow.appendChild(newTd);
            
            newTd = newRow.insertCell();
            newText = document.createTextNode(pass.description);
            newTd.appendChild(newText);
            newRow.appendChild(newTd);
            
            newTd = newRow.insertCell();
            newText = document.createTextNode(pass.cost);
            newTd.appendChild(newText);
            newRow.appendChild(newTd);
            
        }
    } else {
        //remove table
        document.getElementById("passesTitle").remove();
        document.getElementById("passesBox").remove();
    }
    
    if(park.entrancePasses.length < 1 && park.entranceFees.length < 1) {

        document.getElementById("b3").innerHTML = "Sorry, no information is available!";
    }
    
    
}

function openTab(tabName) {
  var i, x;
  x = document.getElementsByClassName("containerTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}