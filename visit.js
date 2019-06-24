let baseURL = "https://developer.nps.gov/api/v1/";
let apiKey = "api_key=8pLcx0CKb31qq20dHrdn0UzNA8X1gF5JvhnIRfjG";
let limit = "limit=600&"

let parkCode = decodeURIComponent(window.location.search).substring(10);
console.log(parkCode);

document.body.onload = function() {
    get_visit_data(parkCode, 'visitorcenters');
    get_visit_data(parkCode, 'campgrounds');
};

function get_visit_data(parkCode, object) {
    
    let combinedURL = baseURL + object + "?" + "parkCode=" + parkCode + "&" + apiKey;
    console.log(combinedURL);
    
    let request = new XMLHttpRequest();
    request.open('GET', combinedURL);
    
    request.responseType = "json";
    request.send();
    
    request.onload = function() {
    
        let result = request.response.data;
        build_visit_page(result, object);
    }
}

function build_visit_page(result, object) {
    let park = result;
    
    if(park === undefined) {
        if(object === visitorcenters) {
            document.getElementsByClassName("visitorCenter")[0].remove();
            let empty = document.createElement("p");
            let message = document.createTextNode("There is no visitor center information for this park.");
            empty.appendChild(message);
            document.getElementById("vcTitle").appendChild(empty);
        } else {
        
            document.getElementsByClassName("campground")[0].remove();
            empty = document.createElement("p");
            message = document.createTextNode("There is no campground information for this park.");
            empty.appendChild(message);
            document.getElementById("campTitle").appendChild(empty);
        }
        
    } else {
    
        let count = 0;
        for (let link of document.getElementsByClassName("nav-link")) {
            link.setAttribute("href", link + "?parkcode=" + park.parkCode);
        }

        //document.getElementById("title").innerHTML = park.name;

        if(object == ("visitorcenters")) {
            build_visitor_centers(park);
        } else {
            build_campgrounds(park);
        }
    }
}

function build_visitor_centers(park) {
    
    for (let vc of park) {
        
        let clone = document.getElementById("origVC").cloneNode(true);
    
        clone.getElementsByClassName("centerUrl")[0].setAttribute("href", vc.url);
        clone.getElementsByClassName("centerUrl")[0].innerHTML = vc.name;

        clone.getElementsByClassName("centerDescription")[0].innerHTML = vc.description;

        clone.getElementsByClassName("directionsInfo")[0].innerHTML = vc.directionsInfo;
        clone.getElementsByClassName("directionsUrl")[0].setAttribute("href", vc.directionsUrl);
        
        document.getElementById("vcWrapper").appendChild(clone);
    }
    
    document.getElementById("origVC").remove();
    
    /*if(park.latLong.length > 4) {
        initMap(park);
    } else {
        document.getElementById("map").remove();
    }*/
}

function build_campgrounds(park) {
    
    
        for (let c of park) {
        
        let clone = document.getElementById("origC").cloneNode(true);
    
        clone.getElementsByClassName("campgroundName")[0].innerHTML = c.name;

        clone.getElementsByClassName("campgroundDescription")[0].innerHTML = c.description;
            
        clone.getElementsByClassName("weatherInfo")[0].innerHTML = c.weatheroverview;
            
            
        clone.getElementsByClassName("walkboatto")[0].innerHTML = c.campsites.walkboatto;
        clone.getElementsByClassName("rvonly")[0].innerHTML = c.campsites.rvonly;
        clone.getElementsByClassName("electricalhookups")[0].innerHTML = c.campsites.electricalhookups;
        clone.getElementsByClassName("tentonly")[0].innerHTML = c.campsites.tentonly;
        clone.getElementsByClassName("totalsites")[0].innerHTML = c.campsites.totalsites;
        clone.getElementsByClassName("horse")[0].innerHTML = c.campsites.horse;
        clone.getElementsByClassName("group")[0].innerHTML = c.campsites.group;
        clone.getElementsByClassName("other")[0].innerHTML = c.campsites.other;
        
        clone.getElementsByClassName("rvAllowed")[0].innerHTML = c.accessibility.rvallowed;
        clone.getElementsByClassName("rvMaxLength")[0].innerHTML = c.accessibility.rvmaxlength;
        clone.getElementsByClassName("adaInfo")[0].innerHTML = c.accessibility.adainfo;
        clone.getElementsByClassName("wheelchairAccess")[0].innerHTML = c.accessibility.wheelchairaccess;
        clone.getElementsByClassName("internetInfo")[0].innerHTML = c.accessibility.internetinfo;
        clone.getElementsByClassName("rvInfo")[0].innerHTML = c.accessibility.rvinfo;
        clone.getElementsByClassName("trailerAllowed")[0].innerHTML = c.accessibility.trailerallowed;
        clone.getElementsByClassName("additionalInfo")[0].innerHTML = c.accessibility.additionalinfo;
        clone.getElementsByClassName("trailerMaxLength")[0].innerHTML = c.accessibility.trailermaxlength;
        clone.getElementsByClassName("fireStovePolicy")[0].innerHTML = c.accessibility.firestovepolicy;
        clone.getElementsByClassName("cellPhoneInfo")[0].innerHTML = c.accessibility.cellphoneinfo;

            
        
        document.getElementById("cWrapper").appendChild(clone);
    }
    
    document.getElementById("origC").remove();
    
    
    
    /*if(park.latLong.length > 4) {
        initMap(park);
    } else {
        document.getElementById("map").remove();
    }*/
}