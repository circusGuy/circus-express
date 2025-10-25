// 🎪 🔥 👑 🏰 ✨ ⏳
async function load_locations(){
    const data = await fetch(`./locations.json?cacheBust=${Date.now()}`);
    return await data.json();
}

 function isToday(date) {
  const today = new Date();
  const normalized = new Date(date);
  normalized.setFullYear(today.getFullYear());  
  return (
    normalized.getDate() === today.getDate() &&
    normalized.getMonth() === today.getMonth() &&
    normalized.getFullYear() === today.getFullYear()
  );
}
function isDateMoreThan7DaysAway(dateString) {
  const monthMap = {
    Jan: "January", Feb: "February", Mar: "March", Apr: "April",
    May: "May", Jun: "June", Jul: "July", Aug: "August",
    Sep: "September", Sept: "September", Oct: "October",
    Nov: "November", Dec: "December"
 }


  const match = dateString.match(/^([A-Za-z]+)\s+(\d{1,2})$/);
  if (!match) return false;

  const monthAbbrev = match[1];
  const day = match[2];
  const fullMonth = monthMap[monthAbbrev];
  if (!fullMonth) return false;

  const currentYear = new Date().getFullYear();
  const targetDate = new Date(`${fullMonth} ${day}, ${currentYear}`);
  const today = new Date();

  // Normalize both dates to midnight
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffInDays = (targetDate - today) / (1000 * 60 * 60 * 24);
  return diffInDays > 7;
}


load_locations().then(data => {
    // console.log(data);
    const locationsContainer = document.querySelector('.locations'); // Get the element with the class "locations"
    data.forEach((location, index) => {
        // const times = ["2:30 PM", "5:00 PM", "7:30 PM"];
        // const lastTime = times[times.length - 1];
        // if () {}


        const linkElement = document.createElement('a');
        linkElement.href = location.link;
        linkElement.title = `Get Tickets — ${location.name} shows`;

        const locationDiv = document.createElement('div');
        locationDiv.className = 'location-container';
        locationDiv.id = `location-${index + 1}`;

        const cityDiv = document.createElement('div');
        cityDiv.className = 'city';
        cityDiv.innerHTML = `<span>✨ &nbsp;` + location.name + `&nbsp; ✨</span>`;
        locationDiv.appendChild(cityDiv);


        const addressDiv = document.createElement('div');
        addressDiv.className = 'address';
        if (location.address.length === 1) {
            addressDiv.innerHTML = `<div>` + location.address[1] + `</div>`;
        } else {
            addressDiv.innerHTML = location.address[0] + `<div>` + location.address[1] + `</div>`;
        }
        locationDiv.appendChild(addressDiv);

        if (location.sponsor) {
            const sponsorDiv = document.createElement('div');
            sponsorDiv.className = 'sponsor';
            sponsorDiv.innerHTML = `<div>Sponsored by:</div><div>` + location.sponsor + `</div>`;
            locationDiv.appendChild(sponsorDiv);
        }

        // Create the dates div
        const datesDiv = document.createElement('div');
        datesDiv.className = 'reading';
        if (index === 0) { // Highlight first location
            datesDiv.innerHTML = '<span>🎪 ' + location.date_range_text + ' 🎪</span>';
        } else {
            datesDiv.innerHTML = '<span>' + location.date_range_text + '</span>';
        }

        locationDiv.appendChild(datesDiv);
        
        location.shows.forEach((show, i) => {
            const showTimesDiv = document.createElement('div');
            showTimesDiv.className = 'showTimes';
            if (index === 0 && i === 0) { // Highlight first location's first show
                // showTimesDiv.innerHTML = `🔥&nbsp; <a href="${show.link}" title="Get Tickets — ${show.weekday}, ${show.date} show times">` + show.weekday + ": &nbsp; " + show.formattedTimes + "&nbsp; ($18)" + '</a> &nbsp;🔥';
                showTimesDiv.innerHTML = `<a href="${show.link}" title="Get Tickets — ${show.weekday}, ${show.date} show times">` + show.weekday + ": &nbsp; " + show.formattedTimes + '</a>';
            } else if (index === 0) { // Highlight first location's other shows
                // showTimesDiv.innerHTML = `&nbsp; <a href="${show.link}" title="Get Tickets — ${show.weekday}, ${show.date} show times">` + show.weekday + ": &nbsp; " + show.formattedTimes + "&nbsp; ($15)" + '</a> &nbsp;';
                showTimesDiv.innerHTML = `<a href="${show.link}" title="Get Tickets — ${show.weekday}, ${show.date} show times">` + show.weekday + ": &nbsp; " + show.formattedTimes + '</a>';
            } else {
                showTimesDiv.innerHTML = `<a href="${show.link}" title="Get Tickets — ${show.weekday}, ${show.date} show times">` + show.weekday + ": &nbsp; " + show.formattedTimes + '</a>';
            }
            locationDiv.appendChild(showTimesDiv);
        });

        // Create the promo div if promo is greater than 7 days away
        if (isDateMoreThan7DaysAway(location.shows[0].date)) {
            const promo = document.createElement('div');
            promo.className = 'promo';
            promo.innerHTML = "The circus is coming!<br>Reserve tickets now!";
            locationDiv.appendChild(promo);
        } else if (isToday(new Date(location.shows[0].date)) || location.shows.length === 1) {
            // "The show is today!"
            const promo = document.createElement('div');
            promo.className = 'promo';
            if (isToday(new Date(location.shows[0].date)) && location.shows.length === 1) {
                promo.innerHTML = "Last Show… Today<br>Don't Miss — Buy Now!";
            } else {
                // promo.innerHTML = `⏳ In ${location.shows.length} Days… We're Gone.<br>Get tickets Now!`;
                promo.innerHTML = `⏳ Going FAST.<br>Get tickets Now!`;
            }
            locationDiv.appendChild(promo);
        } else {
            const promo = document.createElement('div');
            promo.className = 'promo';
            promo.innerHTML = "Reserve NOW!<br>Tickets Going Fast!";
            locationDiv.appendChild(promo);
        }


        linkElement.appendChild(locationDiv);
        locationsContainer.appendChild(linkElement);


    });
    
})

