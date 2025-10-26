var stacksSwiper = new Swiper('.stacks-swiper', {
    loop: false,
    loopFillGroupWithBlank: true,
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
    navigation: {
        nextEl: ".stacks-swiper-button-next",
        prevEl: ".stacks-swiper-button-prev",
    },
    breakpoints: {
        380: {
            slidesPerView: 2,
            spaceBetween: 7,
            slidesPerGroup: 1,
        },
        585: {
            slidesPerView: 3,
            spaceBetween: 7,
            slidesPerGroup: 1,
        },
        888: {
            slidesPerView: 4,
            spaceBetween: 7,
            slidesPerGroup: 1,
        },
        1140: {
            slidesPerView: 4,
            spaceBetween: 10,
            slidesPerGroup: 1,
        }
    }
});


var servicesSwiper = new Swiper('.services-swiper', {
    loop: false,
    loopFillGroupWithBlank: true,
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
    navigation: {
        nextEl: ".services-swiper-button-next",
        prevEl: ".services-swiper-button-prev",
    },
    breakpoints: {
        380: {
            slidesPerView: 1,
            spaceBetween: 7,
            slidesPerGroup: 1,
        },
        586: {
            slidesPerView: 2,
            spaceBetween: 7,
            slidesPerGroup: 1,
        },
        817: {
            slidesPerView: 3,
            spaceBetween: 10,
            slidesPerGroup: 1,
            allowTouchMove: false,
            simulateTouch: false, 
        },
    }
});

var projectsSwiper = new Swiper('.projects-swiper', {
    loop: false,
    loopFillGroupWithBlank: true,
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
    navigation: {
        nextEl: ".projects-swiper-button-next",
        prevEl: ".projects-swiper-button-prev",
    },
    breakpoints: {
        380: {
            slidesPerView: 1,
            spaceBetween: 7,
            slidesPerGroup: 1,
        },
        441: {
            slidesPerView: 2,
            spaceBetween: 7,
            slidesPerGroup: 1,
        },
        817: {
            slidesPerView: 3,
            spaceBetween: 10,
            slidesPerGroup: 1,
        },
    }
});