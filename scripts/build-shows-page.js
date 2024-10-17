
const anotherBandApi = new BandSiteApi(API_KEY);

const showsSection = document.querySelector(".shows");
const showsTable = document.createElement("table");

async function fetchAndDisplayShows() {
    try {
        const shows = await anotherBandApi.getShows();
        loopAndAppendShows(shows);
    } catch (error) {
        console.error(error);
    }
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(/,/g, '');
}


function loopAndAppendShows(listArray) {
    showsTable.innerText = ""

    showsTable.classList.add("shows-table");
    showsSection.appendChild(showsTable);

    const tableHead = document.createElement("thead");
    console.log(tableHead);
    showsTable.appendChild(tableHead);

    const tableRow = document.createElement("tr");
    tableRow.classList.add("table__row");
    tableHead.appendChild(tableRow);

    const thDate = document.createElement("th");
    thDate.textContent = "Date";
    tableRow.appendChild(thDate);

    const thVenue = document.createElement("th");
    thVenue.textContent = "Venue";
    tableRow.appendChild(thVenue);

    const thLocation = document.createElement("th");
    thLocation.textContent = "Location";
    tableRow.appendChild(thLocation);


    const thEmpty = document.createElement("th");
    tableRow.appendChild(thEmpty);


    const tableBody = document.createElement("tbody");
    console.log(tableBody);
    showsTable.appendChild(tableBody);

    for (i = 0; i < listArray.length; i++) {

        const showItem = document.createElement("tr")
        showItem.classList.add("shows__item");
        tableBody.appendChild(showItem);


        const showDate = document.createElement("td");
        showDate.classList.add("date");
        showDate.textContent = formatDate(listArray[i].date); 

        const mobileDate = document.createElement("span");
        mobileDate.classList.add("mobile-label");
        mobileDate.textContent = "Date";

        showDate.insertBefore(mobileDate, showDate.firstChild);  

        showItem.appendChild(showDate);

    
        const showVenue = document.createElement("td")
        showVenue.classList.add("venue");
        showVenue.textContent = listArray[i].place;


        const mobileVenue = document.createElement("span");
        mobileVenue.classList.add("mobile-label");
        mobileVenue.textContent = "Venue";

        showVenue.insertBefore(mobileVenue, showVenue.firstChild);

        showItem.appendChild(showVenue);
        

        const showLocation = document.createElement("td")
        showLocation.classList.add("location");
        showLocation.textContent = listArray[i].location;


        const mobileLocation = document.createElement("span");
        mobileLocation.classList.add("mobile-label");
        mobileLocation.textContent = "Location";

        showLocation.insertBefore(mobileLocation, showLocation.firstChild);

        showItem.appendChild(showLocation);


        const showButton = document.createElement("td")
        showItem.appendChild(showButton);

        const button = document.createElement("button");
        button.type = "button";       
        button.id = "button2";      
        button.textContent = "BUY TICKETS";
        showButton.appendChild(button);
    };
    
    addRowClickListeners();
}

function addRowClickListeners() {
    const rows = document.querySelectorAll('.shows__item');
    rows.forEach(row => {
        row.addEventListener('click', function() {
            rows.forEach(r => r.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

fetchAndDisplayShows();







