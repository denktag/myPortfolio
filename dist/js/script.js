


//! slick-carousel
$(document).ready(function(){
  $('.skills__inner').slick({
		infinite: true,
    slidesToShow: 5,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
  	autoplaySpeed: 1500,
  });
});


//! burger-menu
$(document).on("click", ".header__burger", function(e) {
	$('.header__burger, .header__menu').toggleClass('_active');
});

$(document).on("click", ".footer__burger", function(e) {
	$('.footer__burger, .footer__menu-list').toggleClass('_active');
});



//! Скрыть блок навигации, по клику вне блока
$(document).mouseup(function (e) { // событие клика по веб-документу
	if ( ! $(".header__burger").is(e.target) && $(".header__burger").has(e.target).length === 0 &&
		// если клик был не по нашему блоку
		! $(".header__menu").is(e.target) && $(".header__menu").has(e.target).length === 0
		// и не по его дочерним элементам
			) {
	$(".header__burger, .header__menu").removeClass('_active'); // скрываем его
	}
});

// скрыть меню при сколле
$(window).on('scroll', function() {
	if ($(this).scrollTop() > 340) {
		$('.header__burger, .header__menu').removeClass('_active');
	}
});



//! Плавный скрол
$(document).on("click", ".header__link", function(e) {
	e.preventDefault();
	let id  = $(this).attr('href');
	let top = $(id).offset().top;
	$('body, html').animate({scrollTop: top}, 800);
});


//! Плавный скролл вверх
$(document).on("click", ".scroll-up", function(e) {
	e.preventDefault();
	$('body, html').animate({scrollTop: 0}, 800);
});



// Определение поддержки браузером формата webp для использования webp в свойстве background-image в scss
function testWebP(callback) {

	let webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});
/////////////////////////////////////////////////////////////////