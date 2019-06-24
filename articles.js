let baseURL = "https://developer.nps.gov/api/v1/";
let apiKey = "api_key=8pLcx0CKb31qq20dHrdn0UzNA8X1gF5JvhnIRfjG";
let limit = "limit=10&"

let parkCode = decodeURIComponent(window.location.search).substring(10);
console.log(parkCode);

document.body.onload = function() {
    get_articles(parkCode);
};

function get_articles(parkCode) {
    
    let combinedURL = baseURL + "articles" + "?" + "parkCode=" + parkCode + "&" + apiKey;
    console.log(combinedURL);
    
    let request = new XMLHttpRequest();
    request.open('GET', combinedURL);
    
    request.responseType = "json";
    request.send();
    
    request.onload = function() {
    
        let result = request.response.data;
        build_articles(result);
    }
}

function build_articles(result) {
    let park = result;
    
    if(park === undefined) {
        
            document.getElementsByClassName("article")[0].remove();
            let empty = document.createElement("p");
            let message = document.createTextNode("There are no articles for this park.");
            empty.appendChild(message);
            document.getElementById("articleWrapper").appendChild(empty);
        
    } else {
    
        let count = 0;
        for (let link of document.getElementsByClassName("nav-link")) {
            link.setAttribute("href", link + "?parkcode=" + park.parkCode);
        }

        build_article(park);
    }
}

function build_article(park) {
    
    for (let art of park) {
        
        let clone = document.getElementById("origArticle").cloneNode(true);
    
        clone.getElementsByClassName("title")[0].setAttribute("href", art.url);
        clone.getElementsByClassName("title")[0].innerHTML = art.title;

        clone.getElementsByClassName("description")[0].innerHTML = art.listingdescription;
        
        if(art.listingimage.url.length < 4) {
            clone.getElementsByClassName("articleImg")[0].remove();
        } else {
            clone.getElementsByClassName("articleImg")[0].setAttribute("src", art.listingimage.url);
        }
        
        let tmp = document.createElement("h1");
        let pgBreak = document.createTextNode("..........");
        pgBreak.style = "textAlign: center";
        tmp.appendChild(pgBreak);
        
        document.getElementById("articleWrapper").appendChild(clone);
        document.getElementById("articleWrapper").appendChild(tmp);
    }
    
    document.getElementById("origArticle").remove();
    
}