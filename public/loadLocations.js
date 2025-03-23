import { locations } from './locations.js'; // Import the locations array

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
    console.log('-------------------');
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    console.log('oneDayShow', oneDayShow);

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
    } else {
        showTimesDiv.innerHTML = startAbbreviatedDay.trim() === endAbbreviatedDay.trim()
            ? `${startAbbreviatedDay}: &nbsp; 5 PM&nbsp; & &nbsp;7:30 PM`
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
