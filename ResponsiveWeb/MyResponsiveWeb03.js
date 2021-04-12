$(document).ready(function(){
        $('.header-logo a:nth-of-type(2)').click(function(){
            $('.header-nav').toggleClass('active');
            $('.header-shared').toggleClass('active');
            $('.header-logo a:nth-of-type(2)').toggleClass('rotate');
    });
});
