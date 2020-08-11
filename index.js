let api_key = 'CoPdyLHNoI77xjEjFBWBjw0Qhy6PJjOvERyZMMo1'
let url = 'https://developer.nps.gov/api/v1/parks/?'

function searchParks(){
    $('#js-park-search').submit(function(e){
        e.preventDefault();
        buildUrl();
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
            });
    });
}

function buildUrl(){
    let stateSearch = $('#js-state-search').val();
    let searchLimit = $('#js-search-limit').val();
    if(!searchLimit){
        searchLimit = 10;
    }
    url = url + 'stateCode=' + stateSearch + '&limit=' + searchLimit + '&api_key=' + api_key;
    return url;
}

$(searchParks)