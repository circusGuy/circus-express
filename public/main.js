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
window.addEventListener('resize', () => {
  clearTimeout(window.bgResizeTimeout);
  window.bgResizeTimeout = setTimeout(() => {
    swapBackground(getImageUrl(currentIndex));
  }, 500);
});

// Preload all images
[...desktopImages, ...mobileImages].forEach(src => {
  const img = new Image();
  img.src = `/Images/${src}`;
});

let currentIndex = Math.floor(Math.random() * desktopImages.length);

function getImageUrl(index) {
  const isMobile = window.innerWidth <= 768;
  return `/Images/${isMobile ? mobileImages[index] : desktopImages[index]}`;
}

let isTransitioning = false;

function swapBackground(newUrl) {
  if (isTransitioning) return;
  isTransitioning = true;

  const nextLayer = document.querySelector('.bg-layer.next');
  const currentLayer = document.querySelector('.bg-layer.current');

  // Reset next layer
  nextLayer.style.opacity = 0;
  nextLayer.style.backgroundImage = 'none';
  void nextLayer.offsetWidth; // force reflow

  const img = new Image();
  img.onload = () => {
    nextLayer.style.backgroundImage = `url('${newUrl}')`;

    // Listen for transition end once
    const onTransitionEnd = () => {
      currentLayer.classList.remove('current');
      currentLayer.classList.add('next');
      nextLayer.classList.remove('next');
      nextLayer.classList.add('current');

      nextLayer.removeEventListener('transitionend', onTransitionEnd);
      isTransitioning = false;
    };

    nextLayer.addEventListener('transitionend', onTransitionEnd);

    // Trigger transition
    nextLayer.style.opacity = 1;
    currentLayer.style.opacity = 0;
  };

  img.src = newUrl;
}


window.addEventListener('load', () => {
  const initialUrl = getImageUrl(currentIndex);
  const img = new Image();
  img.onload = () => {
    document.querySelector('.bg-layer.current').style.backgroundImage = `url('${initialUrl}')`;
    document.body.style.opacity = '1';

    setInterval(() => {
      currentIndex = (currentIndex + 1) % desktopImages.length;
      swapBackground(getImageUrl(currentIndex));
    }, 6000);
  };
  img.src = initialUrl;
});

// If currentPath, make active
const currentPath = window.location.pathname;
const links = document.querySelectorAll('nav a');
links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
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