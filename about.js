// DOM ELEMENTS
const sections = {
    bio: document.getElementById('bio-section'),
    edu: document.getElementById('edu-section'),
    goals: document.getElementById('goals-section')
};
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const stage = document.getElementById('stage');
const music = document.getElementById('bg-music');
const muteBtn = document.getElementById('mute-btn');

let currentSectionIndex = 0;
const sectionOrder = ['bio', 'edu', 'goals'];

// Biography Content
const bioParagraphs = [
    "In the quiet suburbs of Rizal, Janelyn’s childhood was a whirlwind of energy. By the age of two, she became a big sister for the first time, followed by a second brother at seven and a sister at ten. She was the 'free spirit' of the neighborhood—balancing the responsibility of caring for her siblings with a boundless love for the outdoors. To Janelyn, academia was simply another playground; she excelled in her studies with the same natural ease and excitement she brought to her games outside.",
    "Life changed pace in 2015. Due to her mother’s pregnancy and the logistical challenge of commuting between her home in Cainta and her school in Pasig City, Janelyn transferred to a local school. Though she was only ten and required assistance to travel, she remained focused on her priorities, eventually graduating from elementary school with Honors.",
    "During Junior High School, the family moved to Pasig City. It was here that Janelyn truly began to shine, navigating the halls of Manggahan High School and forming a circle of 'for-lifers'—friends who remain her anchor to this day. She proved her academic mettle by graduating from junior high school with High Honors.",
    "When the pandemic hit, the stage went dark. Janelyn struggled with the sudden transition to a digital world, leading her to take a 'long intermission' to prioritize her mental health. This period of rest was not a setback, but a gathering of strength. She returned to the stage of education with renewed vigor, conquering the STEM strand and graduating from Senior High School with High Honors once again.",
    "Today, Janelyn’s narrative has reached a peak of independence. Now a student at La Verdad Christian College, she has braved the reality of a three-hour commute from her home, eventually transitioning into the 'dorm life.' The girl who once needed a guide to cross cities now navigates the distance with ease and autonomy.",
    "Her first semester at LVCC has been a testament to this growth; she recently concluded the term not just as a survivor of the distance, but as a President’s Lister.",
    "Janelyn once dreamt of becoming an architect—daydreamed of building structures out of stone and steel. Today, she builds them out of her coding and skills in art. Under the ICT umbrella, she is merging her identity as a cartoonist with her programming skills. The mask has unfolded, and her future looks bright as both a creator and a developer"
];

let currentBioPara = 0;
let typingInterval;
const bioTextContainer = document.getElementById('bio-text');

// TYPING ANIMATION
function typeEffect(element, text, speed = 30) {
    clearInterval(typingInterval);
    element.innerHTML = "";
    element.classList.add('is-typing');
    let i = 0;
    
    typingInterval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            stopTyping(element, text);
        }
    }, speed);
}

function stopTyping(element, fullText) {
    clearInterval(typingInterval);
    element.innerHTML = fullText;
    element.classList.remove('is-typing');
}

// Typing Animation Skip on Click
bioTextContainer.addEventListener('click', () => {
    const fullText = bioParagraphs[currentBioPara];
    if (bioTextContainer.classList.contains('is-typing')) {
        stopTyping(bioTextContainer, fullText);
    } else {
        currentBioPara = (currentBioPara + 1) % bioParagraphs.length;
        typeEffect(bioTextContainer, bioParagraphs[currentBioPara]);
    }
});

// NAVIGATION LOGIC
function updateNavigation() {
    sectionOrder.forEach((id, index) => {
        sections[id].style.display = index === currentSectionIndex ? 'block' : 'none';
    });
    
    if (sectionOrder[currentSectionIndex] === 'bio') {
        typeEffect(bioTextContainer, bioParagraphs[currentBioPara]);
    }

    if (sectionOrder[currentSectionIndex] === 'edu') {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, i) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            
            setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }, i * 400);
        });
    }
}

btnNext.addEventListener('click', () => {
    currentSectionIndex = (currentSectionIndex + 1) % sectionOrder.length;
    updateNavigation();
});

btnPrev.addEventListener('click', () => {
    currentSectionIndex = (currentSectionIndex - 1 + sectionOrder.length) % sectionOrder.length;
    updateNavigation();
});

// TIMELINE TOGGLE
document.querySelectorAll('.timeline-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const details = btn.nextElementSibling;
        details.style.display = details.style.display === 'block' ? 'none' : 'block';
    });
});

// AUDIO CONTROLS
stage.addEventListener('mouseover', () => {
    if (music.paused) {
        music.play()
        .then(() => console.log("Music started successfully!"))
        .catch(e => console.log("Playback failed. Please click anywhere on the page first."));
    }
}, { once: true });

muteBtn.addEventListener('click', () => {
    if (music.muted) {
        music.muted = false;
        muteBtn.innerText = "MUSIC: ON";
    } else {
        music.muted = true;
        muteBtn.innerText = "MUSIC: OFF";
    }
});

updateNavigation();