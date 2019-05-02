const apiKey = "IkYHJ7ToHtymAllc2eCXFLhaHwxzq9CsE5ZmZTba";

const baseURL = "https://developer.nps.gov/api/v1/parks";

function resultAddresses (data) {
    const addresses = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].addresses.length === 0) {
            addresses.push(`<p>None</p>`);
        }
        if (data[i].addresses[0].type === "Physical") {
            const fullAddress = [];
                fullAddress.push(`<p>${data[i].addresses[0].line1}</p>`);
            if (data[i].addresses[0].line2 != "") {
                fullAddress.push(`<p>${data[i].addresses[0].line2}</p>`)
            }
            if (data[i].addresses[0].line3 != "") {
                fullAddress.push(`<p>${data[i].addresses[0].line3}</p>`)
            }
                fullAddress.push(`<p>${data[i].addresses[0].city}, ${data[i].addresses[0].stateCode} ${data[i].addresses[0].postalCode}</p>`);
            addresses.push(`${fullAddress.join("")}`);
        }
        if (data[i].addresses[1].type === "Physical") {
            const fullAddress = [];
                fullAddress.push(`<p>${data[i].addresses[1].line1}</p>`);
            if (data[i].addresses[1].line2 != "") {
                fullAddress.push(`<p>${data[i].addresses[1].line2}</p>`)
            }
            if (data[i].addresses[1].line3 != "") {
                fullAddress.push(`<p>${data[i].addresses[1].line3}</p>`)
            }
                fullAddress.push(`<p>${data[i].addresses[1].city}, ${data[i].addresses[1].stateCode} ${data[i].addresses[1].postalCode}</p>`);
            addresses.push(`${fullAddress.join("")}`);
        }
    }
    return addresses
}

function displayParks(results) {
    console.log(results);
    const addresses = resultAddresses(results);
    console.log(addresses);
    $(".results").empty();
    $(".results").append(
        `<h2>Results</h2>
        <ul class="resultParks"></ul>`
    );
    $(".query").val("");
    for (let i = 0; i < results.length; i++) {
        $(".resultParks").append(
            `<li><h3>${results[i].fullName}</h3>
            <p class="description">${results[i].description}</p>
            <a href="${results[i].url}">${results[i].url}</a>
            <h4>Address</h4>
            ${addresses[i]}
            </li><hr>`
        )
    }
    $(".results").removeClass("hidden");
}

function searchParks(query, amount) {
    const url = baseURL + "?stateCode=" + query.join("%2C") + "&limit=" + (amount - 1) + "&fields=addresses&api_key=" + apiKey;
    
    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error (response.statusText);
    })
    .then(responseJson => displayParks(responseJson.data))
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