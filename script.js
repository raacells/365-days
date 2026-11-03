document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       OPENING & MUSIC
    ========================= */

    const openingScreen = document.getElementById("openingScreen");
    const openButton = document.getElementById("openButton");
    const mainContent = document.getElementById("mainContent");

    const backgroundMusic = document.getElementById("backgroundMusic");
    const vinylPlayer = document.getElementById("vinylPlayer");
    const vinylDisc = document.getElementById("vinylDisc");

    openButton.addEventListener("click", () => {

        // Open the main website
        openingScreen.classList.add("hide");
        mainContent.classList.add("show");
        vinylPlayer.classList.add("show");

        document.body.classList.remove("lock-scroll");

        // Start the music after the user's click
        backgroundMusic.volume = 0.45;

        backgroundMusic.play()
            .then(() => {
                vinylDisc.classList.add("playing");
            })
            .catch((error) => {
                console.log("Music could not start:", error);
                vinylDisc.classList.remove("playing");
            });

    });


    /* =========================
       VINYL PLAYER
    ========================= */

    backgroundMusic.addEventListener("play", () => {
        vinylDisc.classList.add("playing");
    });

    backgroundMusic.addEventListener("pause", () => {
        vinylDisc.classList.remove("playing");
    });

    backgroundMusic.addEventListener("ended", () => {
        vinylDisc.classList.remove("playing");
    });


    /* =========================
       SECRET NOTE
    ========================= */

    const secretButton = document.getElementById("secretButton");
    const secretMessage = document.getElementById("secretMessage");

    secretButton.addEventListener("click", () => {

        const isOpen = secretMessage.classList.toggle("open");

        if (isOpen) {
            secretButton.innerHTML = 'Close your little note <span>−</span>';
        } else {
            secretButton.innerHTML = 'Open your little note <span>↗</span>';
        }

    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, .timeline-item, .gallery-card, .video-frame, .letter-paper, .intro-text, .intro-section h2"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


/* =========================
   365 ROSES GENERATOR
========================= */

const bouquetFlowers = document.getElementById("bouquetFlowers");
const bouquetStage = document.getElementById("bouquetStage");

const bouquetButton = document.getElementById("bouquetButton");
const bouquetEnding = document.getElementById("bouquetEnding");

const fallingPetals = document.getElementById("fallingPetals");

const TOTAL_ROSES = 365;

let bouquetCreated = false;


// Create a heart-shaped cluster of 365 rose heads
function createBouquet() {

    if (bouquetCreated) return;

    bouquetCreated = true;

    for (let i = 0; i < TOTAL_ROSES; i++) {

        const rose = document.createElement("div");

        rose.classList.add("rose");

        /*
          Heart-shaped rose arrangement.
          All flowers are packed closely together.
        */

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random());

        const heartX =
            16 * Math.pow(Math.sin(angle), 3);

        const heartY =
            13 * Math.cos(angle)
            - 5 * Math.cos(2 * angle)
            - 2 * Math.cos(3 * angle)
            - Math.cos(4 * angle);

        const x = 50 + heartX * radius * 2.2;
        const y = 45 - heartY * radius * 2.2;

        const safeX = Math.max(3, Math.min(97, x));
        const safeY = Math.max(3, Math.min(92, y));

        const size = 22 + Math.random() * 7;

        rose.style.setProperty("--x", `${safeX}%`);
        rose.style.setProperty("--y", `${safeY}%`);
        rose.style.setProperty("--rose-size", `${size}px`);

        rose.style.transitionDelay = `${(i % 35) * 0.035}s`;

        bouquetFlowers.appendChild(rose);

    }

}


/* =========================
   FALLING PETALS
========================= */

function createFallingPetals() {

    fallingPetals.innerHTML = "";

    for (let i = 0; i < 45; i++) {

        const petal = document.createElement("div");

        petal.classList.add("petal");

        petal.style.left = `${Math.random() * 100}%`;

        petal.style.setProperty(
            "--fall-duration",
            `${3 + Math.random() * 3}s`
        );

        petal.style.setProperty(
            "--fall-delay",
            `${Math.random() * 2}s`
        );

        petal.style.setProperty(
            "--fall-x",
            `${(Math.random() - 0.5) * 180}px`
        );

        fallingPetals.appendChild(petal);

    }

}


/* =========================
   REVEAL BOUQUET
========================= */

bouquetButton.addEventListener("click", () => {

    if (bouquetStage.classList.contains("show")) return;

    bouquetButton.disabled = true;
    bouquetButton.textContent = "A little moment for you...";

    bouquetStage.classList.add("show");

    createBouquet();
    createFallingPetals();

    setTimeout(() => {

        bouquetStage.classList.add("assembled");

    }, 2200);

    setTimeout(() => {

        bouquetEnding.classList.add("show");
        bouquetButton.textContent = "Made just for you";

        }, 5200);

}); // Penutup event tombol bouquet

}); // Penutup DOMContentLoaded