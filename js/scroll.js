$("#about").click(function() {
    $('html,body').animate({
        scrollTop: $(".container-about").offset().top},
        'slow');
});


$("#services").click(function() {
    $('html,body').animate({
        scrollTop: $(".services-container").offset().top},
        'slow');
});


$("#projects").click(function() {
    $('html,body').animate({
        scrollTop: $(".project-title").offset().top},
        'slow');
});


$("#contact").click(function() {
    $('html,body').animate({
        scrollTop: $(".contact-box").offset().top},
        'slow');
});





if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {           
    window.scrollTo(0,1000)
}else{
    $(".btn-contact").click(function() {
        $('html,body').animate({
            scrollTop: $(".contact-box").offset().top},
            'slow');
    });
}