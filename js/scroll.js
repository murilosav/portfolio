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





if (navigator.userAgent.mobile) {
    const btnmobile = document.getElementById('btn-contact-mobile')
    
    btnmobile.onclick = function() {
        btnmobile.href="mailto:murilode.o.souza@gmail.com?subject=subject text"
      }
    

}else{
    $(".btn-contact").click(function() {
        $('html,body').animate({
            scrollTop: $(".contact-box").offset().top},
            'slow');
    });
}
