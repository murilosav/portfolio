$("#about").click(function() {
    $('html,body').animate({
        scrollTop: $(".container-about").offset().top},
        'slow')
});


$("#services").click(function() {
    $('html,body').animate({
        scrollTop: $(".services-container").offset().top},
        'slow')
});


$("#projects").click(function() {
    $('html,body').animate({
        scrollTop: $(".project-title").offset().top},
        'slow')
});


$("#contact").click(function() {
    $('html,body').animate({
        scrollTop: $(".contact-box").offset().top},
        'slow')
});




const btnmobile = document.getElementById('btn-contact-mobile')

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {           
    btnmobile.href="mailto:murilode.o.souza@gmail.com?subject=subject text"
}else{
    $(".btn-contact").click(function() {
        $('html,body').animate({
            scrollTop: $(".contact-box").offset().top},
            'slow')
    });
}
