const apiKey = "IkYHJ7ToHtymAllc2eCXFLhaHwxzq9CsE5ZmZTba";

const baseURL = "https://developer.nps.gov/api/v1/parks";

function displayParks(results) {
    console.log(results);
}

function searchParks(query, amount) {
    const url = baseURL + "?stateCode=" + query.join("%2C") + "&limit=" + amount + "&api_key=" + apiKey;
    
    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error (response.statusText);
    })
    .then(responseJson => displayParks(responseJson))
    .catch(error => {
        $(".error").text(`Something went wrong: ${error.message}`);
        $(".error").removeClass("hidden");
    })
}


function watchSearch() {
    $('form').submit(event => {
        event.preventDefault();
        $(".error").addClass("hidden");
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