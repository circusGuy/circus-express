// FROM Kingdom Of Wonders test site

// Get the current path 
const currentPath = window.location.pathname;
console.log(currentPath);
// Get all anchor tags 
const links = document.querySelectorAll('nav a');
// Loop through each anchor tag 
links.forEach(link => {
    // Check if the href matches the current path 
    console.log(link.getAttribute('href'));
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


// // Get the toggle button and menu
// const toggleButton = document.querySelector('.menu-toggle');

// // Add event listener to toggle menu and button appearance
// toggleButton.addEventListener('click', () => {
//     toggleButton.classList.toggle('active'); // Toggles the "X" effect
// });


// Define the media query
const mediaQuery = window.matchMedia("(min-width: 54em)");

// Function to handle media query changes
function handleMediaQueryChange(event) {
  const element = document.getElementById("overlay"); // Replace 'yourElement' with your target element's ID
  
  if (event.matches) {
    // Media query matches, remove the class
    closeNav();
    // element.classList.remove("overlay"); // Replace 'your-class' with the class you want to remove
    // document.getElementById('navbar').classList.remove('show');
    // document.getElementById('menuBtn').classList.remove('active');
    // document.body.classList.remove('removeScrollbar');
    // toggleButton.click();
    console.log("Class removed: Media query matched");
    
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
// handleMediaQueryChange(mediaQuery);


// Show the button when the user scrolls away from the top of the webpage
window.onscroll = function() {
    toggleButtonVisibility();
};

function toggleButtonVisibility() {
    const topBtn = document.getElementById("topBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

// Smoothly scroll to the top when the button is clicked
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
  


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

insertFile('includes/footer.html');
