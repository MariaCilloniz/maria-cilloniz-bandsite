const showsArray = [
    { date: "Mon Sept 09 2024", venue: "Ronald Lane", location: "San Francisco, CA" },
    { date: "Tue Sept 17 2024", venue: "Pier 3 East", location: "San Francisco, CA" },
    { date: "Sat Oct 12 2024", venue: "View Lounge", location: "San Francisco, CA" },
    { date: "Sat Nov 16 2024", venue: "Hyatt Agency", location: "San Francisco, CA" },
    { date: "Fri Nov 29 2024", venue: "Moscow Center", location: "San Francisco, CA" },
    { date: "Wed Dec 18 2024", venue: "Press Club", location: "San Francisco, CA" }
];

console.log(showsArray);

const showsSection = document.querySelector(".shows");
console.log(showsSection);
const showsTable = document.createElement("table");


function loopAndAppendComments(listArray) {
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
        tableBody.appendChild(showItem)


        const showDate = document.createElement("td")
        showDate.classList.add("date")
        
        showDate.textContent = listArray[i].date;
        showItem.appendChild(showDate);


        const mobileDate = document.createElement("span");
        mobileDate.classList.add("mobile-label");
        mobileDate.textContent = "Date"; 
        showDate.appendChild(mobileDate);

        const inputDate = document.createElement("td")
        inputDate.textContent=listArray[i].date


        const showVenue = document.createElement("td")
        showVenue.classList.add("venue");
        showVenue.textContent = listArray[i].venue;
        showItem.appendChild(showVenue);


        const mobileVenue = document.createElement("span");
        mobileVenue.classList.add("mobile-label");
        showVenue.appendChild(mobileVenue);
        mobileVenue.textContent = "Venue";

        



        const showLocation = document.createElement("td")
        showLocation.classList.add("location");
        showLocation.textContent = listArray[i].location;
        showItem.appendChild(showLocation);

        const mobileLocation = document.createElement("span");
        mobileLocation.classList.add("mobile-label");
        showLocation.appendChild(mobileLocation);
        mobileLocation.textContent = "Location";

        const showButton = document.createElement("td")
        showItem.appendChild(showButton);

        const button = document.createElement("button");
        button.type = "button";       
        button.id = "button2";      
        button.textContent = "BUY TICKETS";
        showButton.appendChild(button);
        }
    }

loopAndAppendComments(showsArray);








