/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)



/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal'),
        modalBtns = document.querySelectorAll('.services__button'),
        modalClose = document.querySelectorAll('.services__modal-close');

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((mb, i) =>{
    mb.addEventListener('click', () =>{
        modal(i)
    })
});

modalClose.forEach((mc) => {
    mc.addEventListener('click', () =>{
        modalViews.forEach((mv) =>{
            mv.classList.remove('active-modal')
        })
    })
});
/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active work */ 
const linkWork = document.querySelectorAll('.work__item')

function activeWork(){
    linkWork.forEach(L=> L.classList.remove('active-work'))
    this.classList.add('active-Work')
}

linkWork.forEach(L=> L.addEventListener('click', activeWork))

/*=============== SWIPER TESTIMONIAL ===============*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,

    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    breakpoints: {
        640: {
        slidesPerView: 2,
        spaceBetween: 20,
        },
        768: {
        slidesPerView: 2,
        },
        1024: {
        slidesPerView: 2,
        spaceBetween: 48,
        },
    },
    
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== LIGHT DARK THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300,
    // reset: true,
})

sr.reveal(`.home__data`)
sr.reveal(`.home__handle`, {delay: 50})
sr.reveal(`.home__social, .home__scroll`, {delay: 600, origin: 'bottom'})


/*----====== GAME SHOT ======-----*/

function iShoot(enemy) {
    
    enemy.classList.add("dead");

    if(!livingEnemies().length); {
        swal("Boom!");
        window.location.reload();
    }
}

function enemyAttacksMe (enemy) {
    enemy.classList.add("showing");
    setTimeout(() => {
        enemyShootsMe(enemy);
    }, 400 );
    
    
    setTimeout(() => {
        enemy.classList.remove("showing")
    }, 500);
}


function enemyShootsMe(enemy) {


    enemyGunSound.play();

    if(!enemy.classList.contains("dead")) {
        enemy.classList.add("shooting");
        setTimeout(() => {
            enemy.classList.remove("shooting");
        }, 300);
    }
    
    updateHealthPoints(healthPoints - 10);
    
    setTimeout(() => {
        enemy.classList.remove("shooting")
    },200);
}

function livingEnemies () {
    return document.querySelectorAll(".enemy:not(.dead)")
}

function randomEnemyAttacks() {
    var randomEnemyNo = Math.random() * livingEnemies ().length;
    randomEnemyNo = Math.floor(randomEnemyNo);
    var enemy = livingEnemies()[randomEnemyNo];

    var randomDelay = Math.random() * 2000 + 1000;
    
    
    setTimeout(() => {
        enemyAttacksMe(enemy);
        randomEnemyAttacks();
    }, randomDelay);
}

var healthPoints = 100;

function updateHealthPoints(points) {
    
    
    healthPoints = points;
    var healthBar = document.querySelector("#healthBar");

    healthBar.style.width = points + "%";

    if(healthPoints < 1) {
        swal("Contact Me!");
        window.location.reload();
    }
}

function newGame () {

    randomEnemyAttacks();
    document.querySelector("button").style.display = "none";
    music.play();
}

var myGunSound = new Audio ("bang.mp3");

var enemyGunSound = new Audio ("bang.mp3");
enemyGunSound.volume = 0.4;

var music = new Audio ("music.mp3");
music.loop = true;

/*----====== GAME SHOT ======-----*/

/* === SCRIPT VALIDATIONS FORM SUBMIT === --*/

    
//     const d = document;

//     function contactForm(){
//     const $form = d.querySelector(".contact__form"),
//     $inputs = d.querySelectorAll(".contact__form [required]");

//     $inputs.forEach((input) => {
//         const $span = d.createElement("span");
//         $span.id = input.name;
//         $span.textContent = input.title;
//         $span.classList.add("contact-form-error", "none")
//         input.insertAdjacentElement("afterend", $span);
//     });

//     d.addEventListener("keyup", (e) => {
//         if(e.target.matches(".contact__form [required]")){
//             let $input = e.target,
//             pattern = $input.pattern || $input.dataset.pattern;
            
//             if(pattern && $input.value !== ""){
//                 let regex = new RegExp(pattern);
//                 return !regex.exec($input.value)
//                 ? d.getElementById($input.name).classList.add("is-active")
//                 : d.getElementById($input.name).classList.remove("is-active")
//             }

//             if(!pattern){
//                 return $input.value === ""
//                 ? d.getElementById($input.name).classList.add("is-active")
//                 : d.getElementById($input.name).classList.remove("is-active");
//             }
//         }
//     });

//     d.addEventListener("submit", (e) => {
//         e.preventDefault();
//         alert("Enviando formulario");

//         const $loader = d.querySelector(".contact-form-loader"),
//         $response = d.querySelector(".contact-form-response");

//         $loader.classList.remove("none");

//         fetch("https://formsubmit.co/ajax/andresjr195@hotmail.com", {
//             method: "POST",
//             body: new FormData(e.target)
//         })
//         .then(res => res.ok ? res.json(): Promise.reject(res))
//         .then(json => {
//             console.log(json);
//             $loader.classList.add("none");
//             $response.classList.remove("none");
//             $response.innerHTML = `<p><span>${json.message}<span></p>`;
//             $form.reset();
//         })
//         .catch(err => {
//             console.log(err);
//             let message = err.statusText || "Ocurrio un error al enviar";
//             $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
//         })
//         .finally(() => setTimeout(() => {
//             $response.classList.add("none");
//             $response.innerHTML = "";
//         }, 2000));

//     })
// }

// d.addEventListener("DOMContentLoaded", contactForm)