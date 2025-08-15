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
        // { NOTE: Location was cancelled
        //     "name": "Chestertown, MD",
        //     // "address": "Minary's Dream Alliance, Inc.",
        //     "address2": "9155 American Legion Rd",
        //     "dates": ["2025-06-26", "2025-06-29"],
        //     "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/626-629-chestertown-md/2SUCRDL3IWMITLCB7CS4T3NF"
        // },

        {
            "name": "Bridgeville, DE",
            "address": "Bridgeville Banquet Center",
            "address2": "18531 S Main St, Bridgeville, DE 19933",
            "dates": ["2025-07-03", "2025-07-06"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/73-76-bridgeville-de/BOXKKCOTCL2FY5Y6T3K24FPG"
        },
        {
            "name": "Salisbury, MD",
            "address": "Parsonsburg Vol. Fire Dept.",
            "address2": "33030 Old Ocean City Rd, Parsonsburg, MD 21849",
            "dates": ["2025-07-10", "2025-07-13"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/710-713-salisbury-md/JYXLGFLSXU2ZD4NQCKKTB7M4"
        },
        {
            "name": "Gettysburg, PA",
            "address": "Gettysburg Recreation Park",
            "address2": "545 Long Lane, Gettysburg, PA 17325",
            "dates": ["2025-07-17", "2025-07-20"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/717-720-gettysburg-pa/YOJNPCLKSTQULQ7MWBD56DXS"
        },
        {
            "name": "Chambersburg, PA",
            "address": "Cumberland Valley Antique Engine & Machinery Assoc.",
            "address2": "1501 Criders Church Rd, Chambersburg, PA 17202",
            "dates": ["2025-07-24", "2025-07-27"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/724-727-chambersburg-pa/63RURNBKPRKAKADPTAWTC6G6"
        },
        {
            "name": "Hershey, PA",
            "address": "The AACA Museum",
            "address2": "161 Museum Dr, Hershey PA 17033",
            "dates": ["2025-07-31", "2025-08-03"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/731-83-hershey-pa/YIEJQBPPCZ56C25P7I2WHXGG"
        },
        // { // NOTE: Location was cancelled
        //     "name": "York, PA",
        //     "address": "200 N State Street, York, PA 17403",
        //     "dates": ["2025-08-07", "2025-08-10"],
        //     "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/87-710-york-pa/GK2AJNEPABUNRHHJSD6SEKI2"
        // },
        {
            "name": "Reading, PA",
            "address": "Willow Glen Park",
            "address2": "94 Park Ave, Sinking Spring, PA 19608",
            "dates": ["2025-08-13", "2025-08-24"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/813-824-reading-pa/7DGS3EF26T33WTBIZKTLNUGL"
        },
        {
            "name": "Williamsport, PA",
            "address": "Montgomery Park",
            "address2": "119 1st St, Montgomery, PA 17752",
            "dates": ["2025-08-27", "2025-08-31"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/827-831-williamsport-pa/R6HXRNRG5MBRLVTCO52TFFSN"
        },
        {
            "name": "Reedsville, PA",
            "address": "Mifflin County Youth Park",
            "address2": "110 W Logan St, Reedsville, PA 17084",
            "dates": ["2025-09-02", "2025-09-04"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/92-94-reedsville-pa/CYDVT6KVS6OB5JSIFM7XCNL4"
        },
        {
            "name": "Mill Hall, PA",
            "address": "Clinton County Fairgrounds",
            "address2": "98 Racetrack Rd, Mill Hall, PA 17751",
            "dates": ["2025-09-06", "2025-09-07"],
            "link": "https://purchase-tickets-forthe-kingdom-of-wonders.square.site/shop/96-97-mill-hall-pa/YVPOJ3CWBHSLXZXFZDCCSLKD"
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
    if (location.address) {
        addressDiv.innerHTML = location.address;
    }

    if (location.address2) {
        addressDiv.innerHTML += `<div>` + location.address2 + `</div>`;
    }

    // Create the dates div
	const datesDiv = document.createElement('div');
    datesDiv.className = 'dates';

    const promo = document.createElement('div');
    promo.className = 'promo';
    
    const showTimes1Div = document.createElement('div');
    showTimes1Div.className = 'showTimes1';

    const showTimes2Div = document.createElement('div');
    showTimes2Div.className = 'showTimes2';

    const showTimes3Div = document.createElement('div');
    showTimes3Div.className = 'showTimes3';

    const showTimes4Div = document.createElement('div');
    showTimes4Div.className = 'showTimes4';

    const showTimes5Div = document.createElement('div');
    showTimes5Div.className = 'showTimes5';

    const showTimes6Div = document.createElement('div');
    showTimes6Div.className = 'showTimes6';

    const showTimes7Div = document.createElement('div');
    showTimes7Div.className = 'showTimes7';

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
    } else if (location.name === 'Reading, PA') {
        datesDiv.innerHTML = `August 13th – 17th`;

    } else if (startDay === endDay) {
        datesDiv.innerHTML = `${startMonth} ${startDay} – <span class="lastDay">Last Day!</span>`;
    } else if (startMonth === endMonth) {
        datesDiv.innerHTML = `${startMonth} ${startDay} – ${endDay}`;
    } else {
        datesDiv.innerHTML = `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
    }


    locationDiv.appendChild(cityDiv);
    locationDiv.appendChild(addressDiv);

    // Remove after Reading, PA
    if (location.name === 'Reading, PA') {
        const readingDatesDiv = document.createElement('div');
        readingDatesDiv.className = 'reading';
        readingDatesDiv.innerHTML = `<span>August 13th – 24th</span>`;

        locationDiv.appendChild(readingDatesDiv)
    }

    locationDiv.appendChild(datesDiv);

    for (let i = 0; i <= getDifferenceInDays(startDate, endDate); i++) { 
        let currentDate = new Date(startDate);

        currentDate.setDate(startDate.getDate() + i); // Add # days
        const abbreviatedDay = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
        if (abbreviatedDay === 'Mon') {
            showTimes1Div.innerHTML = 'Mon: &nbsp; 6:00 PM';
        }
        if (abbreviatedDay === 'Tue') {
            showTimes2Div.innerHTML = 'Tue: &nbsp; 6:00 PM';
        }
        if (abbreviatedDay === 'Wed') {
            showTimes3Div.innerHTML = 'Wed: &nbsp; 6:00 PM';
        }
        if (abbreviatedDay === 'Thu') {
            showTimes4Div.innerHTML = 'Thu: &nbsp; 6:00 PM';
        }
        if (abbreviatedDay === 'Fri') {
            showTimes5Div.innerHTML = 'Fri: &nbsp; 6:00 PM';
            // let changeDate = new Date("2025-07-30");
            // if (location.name === 'Reading, PA') {
            //     showTimes5Div.innerHTML = 'Fri: &nbsp; 6:00 PM';
            // } else if (currentDate.getTime() >= changeDate.getTime()) {
            //     showTimes5Div.innerHTML = 'Fri: &nbsp; 6:00 PM&nbsp; & &nbsp;8:30 PM';
            // } else {
            //     showTimes5Div.innerHTML = 'Fri: &nbsp; 5:00&nbsp; & &nbsp;7:30 PM';
            // }
            // showTimes5Div.innerHTML = 'Fri: &nbsp; 5:00&nbsp; & &nbsp;7:30 PM';
        }
        if (abbreviatedDay === 'Sat' && location.name === 'Mill Hall, PA') {
            showTimes6Div.innerHTML = 'Sat: &nbsp; 2:30,&nbsp; & &nbsp;5:00 PM';
        } else if (abbreviatedDay === 'Sat') {
            showTimes6Div.innerHTML = 'Sat: &nbsp; 2:30,&nbsp; 5:00&nbsp; & &nbsp;7:30 PM';
        }
        if (abbreviatedDay === 'Sun') {
            showTimes7Div.innerHTML = 'Sun: &nbsp; 2:30&nbsp; & &nbsp;5:00 PM';
        }
    }

    // MONDAY
    // if (showTimes1Div.innerHTML) {
    //     locationDiv.appendChild(showTimes1Div);
    // }

    // TUESDAY
    if (showTimes2Div && location.name !== 'Reading, PA') {
        locationDiv.appendChild(showTimes2Div);
    }

    // WEDNESDAY
    if (showTimes3Div.innerHTML) {
        locationDiv.appendChild(showTimes3Div);
    }

    // THURSDAY
    if (showTimes4Div.innerHTML) {
        // NOTE: Turn this back on after Bridgeville, DE. 
        // promo.innerHTML = "First 100 tickets $10";
        // locationDiv.appendChild(promo);
        locationDiv.appendChild(showTimes4Div);
    }

    // FRIDAY
    if (showTimes5Div.innerHTML) {
        locationDiv.appendChild(showTimes5Div);
    }

    // SATURDAY
    if (showTimes6Div.innerHTML) {
        locationDiv.appendChild(showTimes6Div);
    }

    // SUNDAY
    if (showTimes7Div.innerHTML) {
        locationDiv.appendChild(showTimes7Div);
    }

    if (location.name === 'Reading, PA') { 
        let specialDiv = document.createElement('div');
        specialDiv.innerHTML = `<div class="reading"><span>~~~~~~~~~~~~~</span></div>`;
        specialDiv.innerHTML += `<div class="dates">August 18th – 24th</div>`;
        specialDiv.innerHTML += `<div class="showTimes1">Mon: &nbsp; 6:00 PM</div>`;
        specialDiv.innerHTML += `<div class="showTimes3">Wed: &nbsp; 6:00 PM</div>`;
        specialDiv.innerHTML += `<div class="showTimes4">Thu: &nbsp; 6:00 PM</div>`;
        specialDiv.innerHTML += `<div class="showTimes5">Fri: &nbsp; 6:00 PM</div>`;
        specialDiv.innerHTML += `<div class="showTimes6">Sat: &nbsp; 2:30,&nbsp; 5:00&nbsp; &amp; &nbsp;7:30 PM</div>`;
        specialDiv.innerHTML += `<div class="showTimes7">Sun: &nbsp; 2:30&nbsp; &amp; &nbsp;5:00 PM</div>`;
        locationDiv.appendChild(specialDiv);
    }

    linkElement.appendChild(locationDiv);
    locationsContainer.appendChild(linkElement);
});




