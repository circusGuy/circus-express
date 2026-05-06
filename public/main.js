// The Kingdom Of Wonders

// Background image arrays (NO extension here)
const desktopImages = [
  'bkgd-cast-desktop',
  'bkgd-sktl-desktop',
  'bkgd-yoyo-desktop',
  'bkgd-handstand-desktop',
  'bkgd-witch1-desktop',
  'bkgd-viper1-desktop',
  'bkgd-queen-desktop',
  'bkgd-viper2-desktop'
];

const mobileImages = [
  'bkgd-cast-mobile',
  'bkgd-sktl-mobile',
  'bkgd-yoyo-mobile',
  'bkgd-handstand-mobile',
  'bkgd-witch1-mobile',
  'bkgd-viper1-mobile',
  'bkgd-queen-mobile',
  'bkgd-viper2-mobile'
];

// Detect WebP support
let imageExt = 'jpg'; // fallback default

function detectWebP(callback) {
  const img = new Image();
  img.onload = () => callback(img.width === 1);
  img.onerror = () => callback(false);
  img.src =
    "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IC4AAACwAgCdASoCAAIALmk0mk0iIiIiIgBoSywA";
}

detectWebP(supported => {
  imageExt = supported ? 'webp' : 'jpg';

  // After detection, preload images
  preloadImages();
});

// Preload images AFTER we know the extension
function preloadImages() {
  [...desktopImages, ...mobileImages].forEach(name => {
    const img = new Image();
    img.src = `/Images/${name}.${imageExt}`;
  });
}

let currentIndex = Math.floor(Math.random() * desktopImages.length);

function getImageUrl(index) {
  const isMobile = window.innerWidth <= 768;
  const baseName = isMobile ? mobileImages[index] : desktopImages[index];
  return `/Images/${baseName}.${imageExt}`;
}

window.addEventListener('resize', () => {
  clearTimeout(window.bgResizeTimeout);
  window.bgResizeTimeout = setTimeout(() => {
    swapBackground(getImageUrl(currentIndex));
  }, 500);
});

let isTransitioning = false;

function swapBackground(newUrl) {
  if (isTransitioning) return;
  isTransitioning = true;

  const nextLayer = document.querySelector('.bg-layer.next');
  const currentLayer = document.querySelector('.bg-layer.current');

  nextLayer.style.opacity = 0;
  nextLayer.style.backgroundImage = 'none';
  void nextLayer.offsetWidth;

  const img = new Image();
  img.onload = () => {
    nextLayer.style.backgroundImage = `url('${newUrl}')`;

    const onTransitionEnd = () => {
      currentLayer.classList.remove('current');
      currentLayer.classList.add('next');
      nextLayer.classList.remove('next');
      nextLayer.classList.add('current');

      nextLayer.removeEventListener('transitionend', onTransitionEnd);
      isTransitioning = false;
    };

    nextLayer.addEventListener('transitionend', onTransitionEnd);

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

// Navigation highlighting
const currentPath = window.location.pathname;
document.querySelectorAll('nav a').forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  }
});

// Mobile nav
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

// Media query
const mediaQuery = window.matchMedia("(min-width: 54em)");

function handleMediaQueryChange(event) {
  if (event.matches) {
    closeNav();
  }
}

mediaQuery.addEventListener("change", handleMediaQueryChange);

document.addEventListener('DOMContentLoaded', () => {
  handleMediaQueryChange(mediaQuery);
});

// Scroll to top button
window.addEventListener('scroll', () => {
  const btn = document.getElementById('topBtn');
  btn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

document.getElementById('topBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
