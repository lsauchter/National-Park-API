const apiKey = "IkYHJ7ToHtymAllc2eCXFLhaHwxzq9CsE5ZmZTba";

const baseURL = "developer.nps.gov/api/v1/parks";

function displayParks() {
    //DOM manipulation
}

function formatQuery (queryString) {
    const finalString = queryString.remove(" ")
}

function searchParks(query, amount) {
    const searchQuery = formatQuery(query)
    const url = baseURL + "?" + 
    //create query
    //set search URL
    //fetch
    //call display function
    //catch
}


function watchSearch() {
    $('form').submit(event => {
        event.preventDefault();
        const query = $(".query").val();
        const amount = $(".amount").val();
        searchParks(query, amount);
    })
    //listen for submit
    //prevent default
    //get values
    //call searchParks function
}


$(watchSearch)