const api_key = 'CoPdyLHNoI77xjEjFBWBjw0Qhy6PJjOvERyZMMo1'
const searchURL = 'https://developer.nps.gov/api/v1/parks/'

// Take User Input
// Format the URL for the Fetch

// Make Fetch request
// Translate Data to JSON

// Append Appropriate JSON info to DOM

function formatUserInput(){
    $('#js-park-search').submit(function(e){
        e.preventDefault();
        let maxResults = 0;
        let stateSearch = $('#js-state-search').val();
        if($('#js-search-limit').val()){
            maxResults = $('#js-search-limit').val()
        }else{
            maxResults = 10;
        }
        let newSearch = stateSearch.replace(/\s+/g,'%2C').replace(/,/g,'%2C')
        stateSearch = "stateCode=" + newSearch
        buildURL(stateSearch, maxResults)
    });
}

function buildURL(stateSearch, maxResults=10){
    let url = searchURL + '?' + stateSearch + "&limit=" + maxResults + '&api_key=' + api_key
    buildPageOnRequest(url)
}

function buildPageOnRequest(url){
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(responseJson =>{
            for(let i = 0; i < responseJson.length; i++){
                let parkName = responseJson[i].name
                let parkDescription = responseJson[i].description
                let parkURL = responseJson[i].url
                $('#js-results').append(
                    `
                    <li class="park-result">
                        <h1 class="park-name">${parkName}</h1>
                        <p class="park-description>${parkDescription}</p>
                        <a class="park-url" href="${parkURL}">Visit Website</a>
                    <li>
                    `
                )
            }
        })
        .catch((error) => console.log(error));
}

$(formatUserInput)