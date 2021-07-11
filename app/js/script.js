"use strict"






//! slick-carousel
$(document).ready(function(){
  $('.skills__inner').slick({
		infinite: true,
    slidesToShow: 5,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
  	autoplaySpeed: 1500,

		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
				}
			},

			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				}
			}
		]
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



//! Анимация
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0){
	window.addEventListener('scroll', animOnScroll);

	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			//* настройка старта анимации
			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			}
			else{
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
		return {
			top: rect.top + scrollTop,
			left: rect.left + scrollLeft
		}
	}
	animOnScroll();
}




//! форма обратной связи
document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);
		//получаем все введеные данные полей
		let formData = new FormData(form);

		if (error === 0) {
			//добавляем класс '_sending' блягодаря которому можно визуально стилизовать то что файлы формы отправляются
			form.classList.add('_sending');
			//отправка формы если пройдены все проверки
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			//проверяем успешно ли отправлена форма
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}
	}

	function formValidate(e) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');
		//! класс '._req' нужно добавить к тем полям которые мы хотим проверить

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);
			//нужно добавить класс '_email' к полю где нужно ввести email
			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	//в css нужно стилизовать поля которые не прошли проверку и к которым добавили класс '_error' ('.form__input._error' и для checkbox 'checkbox._error .checkbox__label::before')
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	//функция проверки Email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});





//! Определение поддержки браузером формата webp для использования webp в свойстве background-image в scss
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