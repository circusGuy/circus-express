// import { locations } from './locations.js'; // Import the locations array
const locations =
    [
        {
            "name": "Chester, SC",
            "address": "2355 Great Falls Hwy.",
            "dates": ["2025-03-19", "2025-03-20"], 
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/319-320-chester-sc/C2KJR2W7VERKIHW3ULB2QDFY"
        },
        {
            "name": "Lake City, SC",
            "address": "748 McCutcheon Rd.",
            "dates": ["2025-03-21", "2025-03-23"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/321-323-lake-city-sc/PHS5KRPI2PLN7UXVQ3QDQOS2"
        },
        {
            "name": "Orangeburg, SC",
            "address": "350 Magnolia Street",
            "dates": ["2025-03-26", "2025-03-28"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/326-328-orangeburg-sc/3RFFSBJLOIBROIOHGFK57JY3"
        },
        {
            "name": "Barnwell, SC",
            "address": "12403 Ellenton Street",
            "dates": ["2025-03-29", "2025-03-30"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/329-330-barnwell-sc/2I75PKPN4XSI7VRQKXCR6U7K"
        },
        {
            "name": "Kinston, NC",
            "address": "401 Fairgrounds Rd.",
            "dates": ["2025-04-03", "2025-04-06"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/43-46-kinston-nc/LFYJX536FW2WNCAHST3VGP3K"
        },
        {
            "name": "Lexington, NC",
            "address": "Davidson County Agricultural Fairgrounds",
            "dates": ["2025-04-17", "2025-04-20"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/417-420-lexington-nc/UCG6W4YD4CDGRVJ3M2MRG7BJ"
        },
        {
            "name": "Union, SC",
            "address": "Union County Fairgrounds",
            "dates": ["2025-04-24", "2025-04-27"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/424-427-union-sc/7O63KNV66WF2GR6SUPBBUYIJ"
        }
    ];



const locationsContainer = document.querySelector('.locations'); // Get the element with the class "locations"

// Sort the locations by the startDate (first date in the array of dates property) of the event.
locations.sort((a, b) => {
    const dateA = new Date(a.dates[0]);
    const dateB = new Date(b.dates[0]);
    return dateA - dateB;
});

locations.forEach((location, index) => {
    const linkElement = document.createElement('a');
    linkElement.href = location.link;
    linkElement.title = "Click for Tickets";

    const locationDiv = document.createElement('div');
    locationDiv.className = 'location-container';
    locationDiv.id = `location-${index + 1}`;

    const cityDiv = document.createElement('div');
    cityDiv.className = 'city';
    cityDiv.innerHTML = location.name;

    const addressDiv = document.createElement('div');
    addressDiv.className = 'address';
    addressDiv.innerHTML = location.address;

    // Create the dates div
	const datesDiv = document.createElement('div');
    datesDiv.className = 'dates';

    // Helper function to get the ordinal suffix
    function getOrdinalSuffix(day) {
        if (day === 1 || day === 21 || day === 31) return `${day}st`;
        if (day === 2 || day === 22) return `${day}nd`;
        if (day === 3 || day === 23) return `${day}rd`;
        return `${day}th`;
    }

    const showTimesDiv = document.createElement('div');
    showTimesDiv.className = 'showTimes';

    const showTimes2Div = document.createElement('div');
    showTimes2Div.className = 'showTimes2';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(location.dates[0]);
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date(location.dates[1]);
    endDate.setHours(0, 0, 0, 0);
    endDate.setDate(endDate.getDate() + 1);
    const oneDayShow = startDate.getTime() === endDate.getTime(); 

    // Do not display locationDiv if endDate is less than today's date
    if (endDate < today) {
        return; // Exit the loop iteration for this location
    }

    // Increment startDate until it matches today's date or endDate
    while (startDate < today && startDate != endDate) {
        startDate.setDate(startDate.getDate() + 1);
        }

    // Get the formatted dates
    const startMonth = startDate.toLocaleString('default', { month: 'long' });
    const startDay = getOrdinalSuffix(startDate.getDate());
    const startAbbreviatedDay = startDate.toLocaleDateString('en-US', { weekday: 'short' });
    
    const endMonth = endDate.toLocaleString('default', { month: 'long' });
    const endDay = getOrdinalSuffix(endDate.getDate());
    const endAbbreviatedDay = endDate.toLocaleDateString('en-US', { weekday: 'short' });
    // Construct the date string
    if (oneDayShow) {
        datesDiv.innerHTML = `${startMonth} ${startDay} – <span class="lastDay">One Day Only!</span>`;
    } else if (startDay === endDay) {
        datesDiv.innerHTML = `${startMonth} ${startDay} – <span class="lastDay">Last Day!</span>`;
    } else if (startMonth === endMonth) {
        datesDiv.innerHTML = `${startMonth} ${startDay} – ${endDay}`;
    } else {
        datesDiv.innerHTML = `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
    }


    locationDiv.appendChild(cityDiv);
    locationDiv.appendChild(addressDiv);
    locationDiv.appendChild(datesDiv);

    if (endAbbreviatedDay === 'Sun' && startAbbreviatedDay === 'Sun') {
		showTimes2Div.innerHTML = 'Sun: &nbsp; 2:30 PM&nbsp; & &nbsp;5 PM';
        if (location.name === 'Barnwell, SC') {  // REMOVE once show is over. 
            showTimes2Div.innerHTML = 'Sun: &nbsp; 5 PM&nbsp; & &nbsp;7:30 PM';
        }
		
	} else if (endAbbreviatedDay === 'Sun' && startAbbreviatedDay !== endAbbreviatedDay) {
        const saturdayDate = new Date(endDate);
        saturdayDate.setDate(endDate.getDate() - 1);

        const saturdayAbbreviatedDay = saturdayDate.toLocaleDateString('en-US', { weekday: 'short' });

        if (startAbbreviatedDay === saturdayAbbreviatedDay) {
            showTimesDiv.innerHTML = `${saturdayAbbreviatedDay}: &nbsp; 5 PM&nbsp; & &nbsp;7:30 PM`;
        } else {
            showTimesDiv.innerHTML = `${startAbbreviatedDay} – ${saturdayAbbreviatedDay}: &nbsp; 5 PM&nbsp; & &nbsp;7:30 PM`;
        }
        
        showTimes2Div.innerHTML = 'Sun: &nbsp; 2:30 PM&nbsp; & &nbsp;5 PM';
        if (location.name === 'Barnwell, SC') {  // REMOVE once show is over. 
            showTimes2Div.innerHTML = 'Sun: &nbsp; 5 PM&nbsp; & &nbsp;7:30 PM';
        }

    } else {
        showTimesDiv.innerHTML = startAbbreviatedDay.trim() === endAbbreviatedDay.trim()
            ? `${startAbbreviatedDay} @ 5 PM&nbsp; & &nbsp;7:30 PM`
            : `${startAbbreviatedDay} – ${endAbbreviatedDay}: &nbsp; 5 PM&nbsp; & &nbsp;7:30 PM`;
    }

    if (showTimesDiv.innerHTML) {
        locationDiv.appendChild(showTimesDiv);
    }

    if (showTimes2Div.innerHTML) {
        locationDiv.appendChild(showTimes2Div);
    }

    linkElement.appendChild(locationDiv);
    locationsContainer.appendChild(linkElement);
});
