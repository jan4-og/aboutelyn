// DOM ELEMENTS 
const sections = document.querySelectorAll('.interest-section');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const music = document.getElementById('bg-music');
const stage = document.getElementById('stage');
const muteBtn = document.getElementById('mute-btn');

let currentSection = 0;
let isTyping = false;
let typeInterval;

// TYPING ANIMATION (WITH SKIP)
function typeText(element, text) {
    if (!text) return;

    clearInterval(typeInterval);
    isTyping = true;
    element.innerHTML = "";
    element.classList.add('is-typing'); 
    
    let i = 0;
    typeInterval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            finishTyping(element, text);
        }
    }, 40);
}

function finishTyping(element, text) {
    clearInterval(typeInterval);
    element.innerHTML = text;
    isTyping = false;
    element.classList.remove('is-typing');
    console.log("Typing finished/skipped. Navigation enabled.");
}

// NAVIGATION
function updatePage(index) {
    sections.forEach((sec, i) => {
        sec.style.display = (i === index) ? 'block' : 'none';
    });

    const activeText = sections[index].querySelector('.type-target');
    const fullText = activeText.getAttribute('data-fulltext');

    activeText.onclick = () => {
        if (isTyping) {
            finishTyping(activeText, fullText);
        }
    };

    typeText(activeText, fullText);
}

// Next button is locked until description typing is finished or skipped
btnNext.addEventListener('click', () => {
    if (isTyping) return; 
    currentSection = (currentSection + 1) % sections.length;
    updatePage(currentSection);
});

// Prev button is locked until description typing is finished or skipped
btnPrev.addEventListener('click', () => {
    if (isTyping) return;
    currentSection = (currentSection - 1 + sections.length) % sections.length;
    updatePage(currentSection);
});

// IMAGE SWAPPING
document.querySelectorAll('.interest-gallery').forEach(gallery => {
    gallery.addEventListener('click', function() {
        const images = this.querySelectorAll('.gallery-img-container');
        let visibleIndex = Array.from(images).findIndex(img => img.style.display !== 'none');
        
        images[visibleIndex].style.display = 'none';
        let nextIndex = (visibleIndex + 1) % images.length;
        images[nextIndex].style.display = 'block';
    });
});

// AUDIO CONTROLS
stage.addEventListener('mouseenter', () => {
    if (music.paused) {
        music.play().catch(e => console.log("Audio blocked. Click page first."));
    }
}, { once: true });

if(muteBtn) {
    muteBtn.addEventListener('click', () => {
        music.muted = !music.muted;
        muteBtn.innerText = music.muted ? "MUSIC: OFF" : "MUSIC: ON";
    });
}

window.onload = () => updatePage(0);