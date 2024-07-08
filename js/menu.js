document.getElementById("menu-home").addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.getElementById("menu-about").addEventListener("click", function() {
    window.scrollTo({
        top: document.querySelector(".about-me-container").offsetTop,
        behavior: 'smooth'
    });
});

document.getElementById("menu-services").addEventListener("click", function() {
    window.scrollTo({
        top: document.querySelector(".services-container").offsetTop,
        behavior: 'smooth'
    });
});

document.getElementById("menu-projects").addEventListener("click", function() {
    window.scrollTo({
        top: document.querySelector(".projects-container").offsetTop,
        behavior: 'smooth'
    });
});

document.getElementById("menu-contact").addEventListener("click", function() {
    window.scrollTo({
        top: document.querySelector(".contacts-container").offsetTop,
        behavior: 'smooth'
    });
});
