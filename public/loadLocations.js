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
            "promo": "Buy One Get One Thrusday",
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/43-46-kinston-nc/LFYJX536FW2WNCAHST3VGP3K"
        },
        {
            "name": "Kinston, NC",
            "address": "401 Fairgrounds Rd.",
            "dates": ["2025-04-13", "2025-04-13"],
            "promo": "Buy One Get One Thrusday",
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/413-kinston-nc/OJTZEZZHKU6YRCYTHMVQBQGM"
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
        },
        {
            "name": "Greenwood, SC",
            "address": "Greenwood County Fairgrounds",
            "dates": ["2025-05-08", "2025-05-11"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/58-511-greenwood-sc/G477ATAYLBC7SL4MCZY57KW6"
        },
        {
            "name": "Greeneville, TN",
            "address": "Greene County Fairgrounds",
            "address2": "109 Jeff Woods Memorial Dr",
            "dates": ["2025-05-15", "2025-05-18"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/515-518-greeneville-tn/JTPRXMFETZKFK3LQK5BILGOR"
        },
        {
            "name": "Lenoir, NC",
            "address": "Caldwell County Fairgrounds",
            "dates": ["2025-05-22", "2025-05-25"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/522-525-lenoir-nc/NT337AXTDWSXPBZDS3UEBKCY"
        },
        {
            "name": "South Boston, VA",
            "address": "Halifax County Fairgrounds",
            "address2": "1188 James D Hagwood Hwy",
            "dates": ["2025-05-29", "2025-06-01"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/529-61-south-boston-va/G7KU364KOJTDKYITEFWJRZVJ"
        },
        {
            "name": "Front Royal, VA",
            "address": "Warren County Fairgrounds",
            "address2": "26 Fairground Rd",
            "dates": ["2025-06-05", "2025-06-08"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/65-68-front-royal-va/NBIM2USA6W7HERDIOAHXWDZV"
        },
        {
            "name": "Ridgeley, WV",
            "address": "Ridgeley Community Center",
            "address2": "581 Veterans Memorial Hwy",
            "dates": ["2025-06-12", "2025-06-15"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/612-615-ridgeley-wv/ITBPN6TENPY5NTSUBFYOTZTK"
        },
        {
            "name": "Manchester, MD",
            "address": "Manchester VFD Activities Bldg",
            "address2": "3297 York Street",
            "dates": ["2025-06-19", "2025-06-22"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/619-622-manchester-md/5DEGCTHQAMRRZGRYAJPR2D2W"
        },
        {
            "name": "Chestertown, MD",
            "address": "Minary's Dream Alliance, Inc.",
            "address2": "9155 American Legion Rd",
            "dates": ["2025-06-26", "2025-06-29"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/626-629-chestertown-md/2SUCRDL3IWMITLCB7CS4T3NF"
        }
    ];

function getDifferenceInDays(date1, date2) {
    // Convert both dates to milliseconds
    const timeDifference = Math.abs(new Date(date2) - new Date(date1));

    // Convert milliseconds to days
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

const locationsContainer = document.querySelector('.locations'); // Get the element with the class "locations"

// Sort the locations by the startDate (first date in the array of dates property) of the event.
locations.sort((a, b) => {
    const dateA = new Date(a.dates[0]);
    const dateB = new Date(b.dates[0]);
    return dateA - dateB;
});

// Helper function to get the ordinal suffix
function getOrdinalSuffix(day) {
    if (day === 1 || day === 21 || day === 31) return `${day}st`;
    if (day === 2 || day === 22) return `${day}nd`;
    if (day === 3 || day === 23) return `${day}rd`;
    return `${day}th`;
}

locations.forEach((location, index) => {
    const linkElement = document.createElement('a');
    linkElement.href = location.link;
    linkElement.title = "Click for Tickets";

    const locationDiv = document.createElement('div');
    locationDiv.className = 'location-container';
    locationDiv.id = `location-${index + 1}`;

    const cityDiv = document.createElement('div');
    cityDiv.className = 'city';
    
    const addressDiv = document.createElement('div');
    addressDiv.className = 'address';

    // if (location.name === 'Kinston, NC') {
    //     cityDiv.innerHTML = `<span>👑 &nbsp; &nbsp;` + location.name + `&nbsp; &nbsp; 👑</span>`;
    //     addressDiv.innerHTML = `<span>🏰 &nbsp; &nbsp; ` + location.address + ` &nbsp; &nbsp; 🏰</span><div>✨&nbsp; ENC Renaissance Faire &nbsp;✨</div>`;
    // } else {
    //     cityDiv.innerHTML = `<span>✨ &nbsp; &nbsp;` + location.name + `&nbsp; &nbsp; ✨</span>`;
    //     addressDiv.innerHTML = location.address;
    // }
    cityDiv.innerHTML = `<span>✨ &nbsp; &nbsp;` + location.name + `&nbsp; &nbsp; ✨</span>`;
    addressDiv.innerHTML = location.address;

    if (location.address2) {
        addressDiv.innerHTML += `<div>` + location.address2 + `</div>`;
    }

    // Create the dates div
	const datesDiv = document.createElement('div');
    datesDiv.className = 'dates';

    const showTimes1Div = document.createElement('div');
    showTimes1Div.className = 'showTimes1';

    const showTimes2Div = document.createElement('div');
    showTimes2Div.className = 'showTimes2';

    const showTimes3Div = document.createElement('div');
    showTimes3Div.className = 'showTimes3';

    const showTimes4Div = document.createElement('div');
    showTimes4Div.className = 'showTimes4';

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

    for (let i = 0; i <= getDifferenceInDays(startDate, endDate); i++) { 
        let currentDate = new Date(startDate);

        currentDate.setDate(startDate.getDate() + i); // Add # days
        const abbreviatedDay = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
        if (abbreviatedDay === 'Thu') {
            showTimes1Div.innerHTML = 'Thu: &nbsp; 6:00 PM';
        }
        if (abbreviatedDay === 'Fri') {
            showTimes2Div.innerHTML = 'Fri: &nbsp; 5:00&nbsp; & &nbsp;7:30 PM';
        }
        if (abbreviatedDay === 'Sat') {
            showTimes3Div.innerHTML = 'Sat: &nbsp; 2:30,&nbsp; 5:00&nbsp; & &nbsp;7:30 PM';
        }
        if (abbreviatedDay === 'Sun') {
            showTimes4Div.innerHTML = 'Sun: &nbsp; 2:30&nbsp; & &nbsp;5:00 PM';
        }
    }

    if (showTimes1Div.innerHTML) {
        locationDiv.appendChild(showTimes1Div);
    }

    if (showTimes2Div.innerHTML) {
        locationDiv.appendChild(showTimes2Div);
    }

    if (showTimes3Div.innerHTML) {
        locationDiv.appendChild(showTimes3Div);
    }

    if (showTimes4Div.innerHTML) {
        locationDiv.appendChild(showTimes4Div);
    }

    linkElement.appendChild(locationDiv);
    locationsContainer.appendChild(linkElement);
});
