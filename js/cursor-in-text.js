const cursor = document.querySelector(".cursor")
document.addEventListener("mousemove", (MOVEef) => {
    cursor.style.left = MOVEef.pageX + 'px'
    cursor.style.top = MOVEef.pageY + 'px'
})