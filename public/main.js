// The Kingdom Of Wonders

// Background image arrays
const desktopImages = [
  'bkgd-juggling-desktop.jpg',
  'bkgd-queen-desktop.jpg',
  'bkgd-princess1-desktop.jpg',
  'bkgd-witch1-desktop.jpg',
  'bkgd-escape-desktop.jpg',
  'bkgd-viper1-desktop.jpg',
  'bkgd-dance-desktop.jpg',
  'bkgd-princess2-desktop.jpg',
  'bkgd-aerial-desktop.jpg',
  'bkgd-dance-desktop.jpg',
  'bkgd-viper2-desktop.jpg'
];

const mobileImages = [
  'bkgd-juggling-mobile.jpg',
  'bkgd-queen-mobile.jpg',
  'bkgd-princess1-mobile.jpg',
  'bkgd-witch1-mobile.jpg',
  'bkgd-escape-mobile.jpg',
  'bkgd-viper1-mobile.jpg',
  'bkgd-dance-mobile.jpg',
  'bkgd-princess2-mobile.jpg',
  'bkgd-aerial-mobile.jpg',
  'bkgd-dance-mobile.jpg',
  'bkgd-viper2-mobile.jpg'
];

// Preload all images
[...desktopImages, ...mobileImages].forEach(src => {
  const img = new Image();
  img.src = `/Images/${src}`;
});

let currentIndex = Math.floor(Math.random() * desktopImages.length);

function updateBackgrounds() {
  const isMobile = window.innerWidth <= 768;
  const desktopUrl = `/Images/${desktopImages[currentIndex]}`;
  const mobileUrl = `/Images/${mobileImages[currentIndex]}`;
  const chosenUrl = isMobile ? mobileUrl : desktopUrl;

  document.body.style.backgroundImage = `url('${chosenUrl}')`;

  currentIndex = (currentIndex + 1) % desktopImages.length;
}

// Initial load — wait for correct image before showing content to prevent FOUC (glitch)
window.addEventListener('load', () => {
  const isMobile = window.innerWidth <= 768;
  const chosenUrl = isMobile
    ? `/Images/${mobileImages[currentIndex]}`
    : `/Images/${desktopImages[currentIndex]}`;

  const img = new Image();
  img.onload = () => {
    document.body.style.backgroundImage = `url('${chosenUrl}')`;
    // document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';


    // Start cycling only after initial image is loaded
    setInterval(updateBackgrounds, 6000);
  };
  img.src = chosenUrl;
});




// Get the current path 
const currentPath = window.location.pathname;
// Get all anchor tags 
const links = document.querySelectorAll('nav a');
// Loop through each anchor tag 
links.forEach(link => {
    // Check if the href matches the current path 
    if (link.getAttribute('href') === currentPath) {
        // Add the active class 
        link.classList.add('active');
    }
});


function showNav() { 
    const menuBtn = document.getElementById('menuBtn');
    const navbar = document.getElementById('navbar');
    navbar.classList.add('show');
    const overlay = document.getElementById('overlay');
    overlay.classList.add('overlay');
    menuBtn.removeEventListener('click', showNav);
    menuBtn.addEventListener('click', closeNav);
    menuBtn.classList.add('active');
    document.body.classList.add('removeScrollbar');
}

function closeNav() { 
    const menuBtn = document.getElementById('menuBtn');
    const navbar = document.getElementById('navbar');
    navbar.classList.remove('show');
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('overlay');
    menuBtn.removeEventListener('click', closeNav);
    menuBtn.addEventListener('click', showNav);
    menuBtn.classList.remove('active');
    document.body.classList.remove('removeScrollbar');
}


// Define the media query
const mediaQuery = window.matchMedia("(min-width: 54em)");

// Function to handle media query changes
function handleMediaQueryChange(event) {
  const element = document.getElementById("overlay"); // Target element's ID
  
  if (event.matches) {
    // Media query matches, remove the class
    closeNav();
    // console.log("Class removed: Media query matched");
    
  } else {
    // Media query no longer matches, optional action
    console.log("Media query no longer matches");
  }
}

// Attach the event listener to the media query
mediaQuery.addEventListener("change", handleMediaQueryChange);

// Initial check
document.addEventListener('DOMContentLoaded', () => {
    handleMediaQueryChange(mediaQuery);
  });

// Show the button when the user scrolls away from the top of the webpage
// window.onscroll = function() {
//     toggleButtonVisibility();
// };

// function toggleButtonVisibility() {
//     const topBtn = document.getElementById("topBtn");
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         topBtn.style.display = "block";
//     } else {
//         topBtn.style.display = "none";
//     }
// }
window.addEventListener('scroll', () => {
  const btn = document.getElementById('topBtn');
  if (window.scrollY > 300) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
});

document.getElementById('topBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smoothly scroll to the top when the button is clicked
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
  

// Keep this method and uncomment the footer insert when this gets fixed.
function insertFile (file) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('footer').innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

// insertFile('includes/footer.html');
