document.addEventListener("mousemove", parallax)
function parallax(e) {
    this.querySelectorAll('.ad-illustration').forEach(illustration => {
        const speed = illustration.getAttribute('data-speed')

        const x = (window.innerWidth - e.pageX*speed)/100
        const y = (window.innerHeight - e.pageY*speed)/100

        illustration.style.transform = `translateX(${x}px) translateY(${y}px)`
    });
}