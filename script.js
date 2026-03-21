// DOM ELEMENTS
const introSection = document.getElementById('intro-section');
const skillsSection = document.getElementById('skills-section');
const skillsList = document.getElementById('skills-list');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const music = document.getElementById('bg-music');
const muteBtn = document.getElementById('mute-btn');
const stage = document.getElementById('stage');

// Skills
const skillData = [
    { name: "⋆ musical appreciation", img: "images/1.png" },
    { name: "⋆ programming", img: "images/2.png" },
    { name: "⋆ front-end dev", img: "images/3.png" },
    { name: "⋆ system design", img: "images/4.png" },
    { name: "⋆ traditional art", img: "images/5.png" },
    { name: "⋆ digital art", img: "images/6.png" },
    { name: "⋆ video editing", img: "images/7.png" }
];

// SHOW/HIDE SECTIONS
btnNext.addEventListener('click', () => {
    introSection.style.display = 'none';
    skillsSection.style.display = 'block';
    
    skillsList.innerHTML = '';
    
    skillData.forEach((skill, index) => {
        setTimeout(() => {
            const skillBtn = document.createElement('div');
            skillBtn.className = 'skill-clickable blinking-theatre marquee-text';
            
            const textSpan = document.createElement('span');
            textSpan.innerHTML = `<b><i>${skill.name}</i></b>`;
            skillBtn.appendChild(textSpan);

            skillBtn.addEventListener('click', function() {
                const isShowingImage = this.querySelector('.skill-img-container');

                if (!isShowingImage) {
                    this.classList.remove('blinking-theatre', 'marquee-text');
                    this.style.border = "1px solid white";
                    
                    this.innerHTML = `
                        <div class="skill-img-container">
                            <div class="theatre-overlay"></div>
                            <img src="${skill.img}" alt="${skill.name}" class="skill-img">
                        </div>`;
                } else {
                    this.classList.add('blinking-theatre');
                    this.style.border = "1px dashed #ff0000";
                    this.innerHTML = `<span><b><i>${skill.name}</i></b></span>`;
                }
            });

            skillsList.appendChild(skillBtn);
        }, index * 400); 
    });
});

btnPrev.addEventListener('click', () => {
    skillsSection.style.display = 'none';
    introSection.style.display = 'block';
});

// AUDIO CONTROLS
stage.addEventListener('mouseenter', () => {
    if (music.paused) {
        music.play().catch(e => console.log("Audio play blocked"));
    }
}, { once: true });

muteBtn.addEventListener('click', () => {
    music.muted = !music.muted;
    muteBtn.innerText = music.muted ? "MUSIC: OFF" : "MUSIC: ON";
});