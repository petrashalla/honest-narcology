// animation
const animationItems = document.querySelectorAll('.animation-item')
if (animationItems.length > 0) {
	function onEntry(e) {
		e.forEach(e => {
			e.isIntersecting && e.target.classList.add('animation-active')
		})
	}
	let options = {
			threshold: [0.5],
		},
		observer = new IntersectionObserver(onEntry, options)
	for (let e of animationItems) observer.observe(e)
}

/*  search  */
document.addEventListener('DOMContentLoaded', function () {
	const searchForms = document.querySelectorAll('.header__bottom_search')

	searchForms.forEach(form => {
		const searchInput = form.querySelector('input[type="search"]')
		const searchResults = form.querySelector('.header__search-result')
		const searchResultList = searchResults.querySelector(
			'.header__search-result_list'
		)
		const searchResultText = searchResults.querySelector(
			'.header__search-result_text'
		)

		function showSearchResults(results) {
			searchResultList.innerHTML = ''

			if (results.length === 0) {
				searchResultText.textContent = 'Результатов не найдено.'
				searchResults.style.display = 'block'
				return
			}

			searchResultText.textContent = 'Результаты поиска:'
			results.forEach(result => {
				const li = document.createElement('li')
				const link = document.createElement('a')
				link.href = '#'
				link.className = 'header__search-result_link'
				link.textContent = result
				li.appendChild(link)
				searchResultList.appendChild(li)
			})

			searchResults.style.display = 'block'
		}

		searchInput.addEventListener('input', function () {
			const searchText = this.value.trim().toLowerCase()
			const results = [
				'Лечение алкоголизма',
				'Лечение женского алкоголизма',
				'Лечение пивного алкоголизма',
				'Капельница от алкоголизма',
			].filter(result => result.toLowerCase().includes(searchText))
			showSearchResults(results)
		})

		document.addEventListener('click', function (event) {
			const isClickInsideSearchResults = searchResults.contains(event.target)
			const isClickInsideSearchInput = searchInput.contains(event.target)

			if (!isClickInsideSearchResults && !isClickInsideSearchInput) {
				searchResults.style.display = 'none'
			}
		})
	})
})

/*  end search  */

let scrollWidthFunc = () => {
	let scrollWidth = window.innerWidth - document.body.clientWidth
	document.querySelector('html').style.paddingRight = scrollWidth + 'px'
	document.querySelector('header').style.paddingRight = scrollWidth + 'px'
}
const scrollTop = document.querySelector('.scroll-top')
if (scrollTop)
	scrollTop.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	})
;['load', 'resize'].forEach(event => {
	window.addEventListener(event, function () {
		let headerHeight = header.clientHeight
		const plashka = header.querySelector('.header__plashka')
		if (plashka) {
			var originalHeightPlashka = plashka.offsetHeight
		}
		window.onscroll = function (e) {
			if (window.scrollY > headerHeight) {
				if (!plashka.classList.contains('hide')) {
					plashka.classList.add('hide')
					plashka.style.height = '0px'
				}
			} else {
				plashka.style.height = originalHeightPlashka + 'px'
				plashka.classList.remove('hide')
			}
		}
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const burgerMenu = document.querySelector('.burger__menu')
	if (burgerMenu) {
		const headerMobile = document.querySelector('.header__bottom')
		const header = document.querySelector('.header')
		const plashka = document.querySelector('.header__plashka')
		burgerMenu.addEventListener('click', () => {
			if (burgerMenu.classList.contains('burger__menu--active')) {
				plashka.style.display = 'block'
				document.body.classList.remove('lock')
			} else {
				plashka.style.display = 'none'
			}
			headerMobile.classList.toggle('header__bottom--active')
			burgerMenu.classList.toggle('burger__menu--active')
			header.classList.toggle('header--active')

			document.querySelector('html').classList.toggle('burger-lock')
		})
	}

	/* Mask phone */
	;[].forEach.call(
		document.querySelectorAll('input[type=tel]'),
		function (input) {
			let keyCode
			function mask(event) {
				event.keyCode && (keyCode = event.keyCode)
				let pos = this.selectionStart
				if (pos < 3) event.preventDefault()
				let matrix = '+7 (___) ___ ____',
					i = 0,
					def = matrix.replace(/\D/g, ''),
					val = this.value.replace(/\D/g, ''),
					new_value = matrix.replace(/[_\d]/g, function (a) {
						return i < val.length ? val.charAt(i++) || def.charAt(i) : a
					})
				i = new_value.indexOf('_')
				if (i != -1) {
					i < 5 && (i = 3)
					new_value = new_value.slice(0, i)
				}
				let reg = matrix
					.substr(0, this.value.length)
					.replace(/_+/g, function (a) {
						return '\\d{1,' + a.length + '}'
					})
					.replace(/[+()]/g, '\\$&')
				reg = new RegExp('^' + reg + '$')
				if (
					!reg.test(this.value) ||
					this.value.length < 5 ||
					(keyCode > 47 && keyCode < 58)
				)
					this.value = new_value
				if (event.type == 'blur' && this.value.length < 5) this.value = ''
			}

			input.addEventListener('input', mask, false)
			input.addEventListener('focus', mask, false)
			input.addEventListener('blur', mask, false)
			input.addEventListener('keydown', mask, false)
		}
	)
	/* End Mask phone */

	/*  Popups  */
	function popupClose(popupActive) {
		popupActive.classList.remove('open')
		document.body.classList.remove('lock')
		document.querySelector('html').removeAttribute('style')
		document.querySelector('html').classList.remove('lock')
		document.querySelector('header').removeAttribute('style')
	}

	const popupOpenBtns = document.querySelectorAll('.popup-btn')
	const popups = document.querySelectorAll('.popup')
	const closePopupBtns = document.querySelectorAll(
		'.close-popup, .popup__btn-ok'
	)
	closePopupBtns.forEach(function (el) {
		el.addEventListener('click', function (e) {
			popupClose(e.target.closest('.popup'))
		})
	})

	const reloadButton = document.querySelector('.popup__btn-reload')
	reloadButton.addEventListener('click', function () {
		location.reload()
	})

	popupOpenBtns.forEach(function (el) {
		el.addEventListener('click', function (e) {
			e.preventDefault()
			const path = e.currentTarget.dataset.path
			const currentPopup = document.querySelector(`[data-target="${path}"]`)
			if (currentPopup) {
				popups.forEach(function (popup) {
					popupClose(popup)
					popup.addEventListener('click', function (e) {
						if (!e.target.closest('.popup__content')) {
							popupClose(e.target.closest('.popup'))
						}
					})
				})
				currentPopup.classList.add('open')
				document.querySelector('html').classList.add('lock')
			}
		})
	})
	/*  end popups  */

	/* yandex map */
	let flagMap = false
	document.addEventListener('scroll', function () {
		const blockMap = document.getElementById('map')
		if (blockMap) {
			const posTop = blockMap.getBoundingClientRect().top

			if (posTop < window.innerHeight && !flagMap) {
				if (
					!document.querySelector(
						'[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]'
					)
				) {
					const script = document.createElement('script')
					script.type = 'text/javascript'
					script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
					document.head.appendChild(script)
				}
				setTimeout(function () {
					ymaps.ready(init)
					function init() {
						const map = document.querySelector('#map')
						if (map) {
							var myMap = new ymaps.Map('map', {
								center: [59.945179, 30.386143],
								zoom: 15,
								controls: [],
							})

							var myPlacemark = new ymaps.Placemark(
								myMap.getCenter(),
								{
									hintContent: 'Санкт-Петербург, Очаковская ул, 9',
									balloonContent: 'Санкт-Петербург, Очаковская ул, 9',
								},
								{
									iconLayout: 'default#image',
									iconImageHref: 'assets/img/icons/map-pin.png', // Ссылка на вашу метку
									iconImageSize: [21, 26],
									iconImageOffset: [-15, -31],
								}
							)

							myMap.geoObjects.add(myPlacemark)
							myMap.behaviors.disable(['scrollZoom'])
						}
					}
				}, 500)
				flagMap = true
			}
		}
	})
	/* end yandex map */

	/*  FAQ  */
	const acc = document.getElementsByClassName('faq__accordion')
	for (let i = 0; i < acc.length; i++) {
		acc[i].addEventListener('click', function () {
			this.classList.toggle('price__accordion--active')
			const faqBtn = this.querySelector('.faq__more')
			faqBtn.classList.toggle('faq__more--active')
			const panel = this.nextElementSibling
			if (panel.style.display === 'block') {
				panel.style.display = 'none'
			} else {
				panel.style.display = 'block'
			}
		})
	}
	/*  End FAQ   */

	/*  footer accordion  */
	const footerNav = document.getElementsByClassName('footer__nav')
	for (let i = 0; i < footerNav.length; i++) {
		footerNav[i].addEventListener('click', function () {
			if (window.innerWidth < 1000) {
				const footerBtn = this.querySelector('.footer__nav_title')
				footerBtn.classList.toggle('footer__nav_title--active')

				const panel = this.querySelector('.footer__nav_list')
				if (panel.style.display === 'flex') {
					panel.style.display = 'none'
				} else {
					panel.style.display = 'flex'
				}
			}
		})
	}
	/*  end footer accordion  */

	/*  Slaider  */
	const commentsSwiper = new Swiper('.commentsSwiper', {
		slidesPerView: 1.2,
		spaceBetween: 10,
		pagination: {
			el: '.comments__swiper-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: '.comments__swiper-button-next',
			prevEl: '.comments__swiper-button-prev',
		},
		breakpoints: {
			1000: {
				slidesPerView: 3,
			},
			640: {
				slidesPerView: 2,
			},
		},
	})

	const licenseSwiper = new Swiper('.licenseSwiper', {
		slidesPerView: 1.2,
		spaceBetween: 10,
		freeMode: true,
		navigation: {
			nextEl: '.license__swiper-button-next',
			prevEl: '.license__swiper-button-prev',
		},

		breakpoints: {
			850: {
				slidesPerView: 4,
				spaceBetween: 10,
			},
			640: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
			500: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
		},
	})

	const licenseDoctorSwiper = new Swiper('.licenseDoctorSwiper', {
		slidesPerView: 1.4,
		spaceBetween: 10,
		freeMode: true,
		navigation: {
			nextEl: '.license-doctor__swiper-button-next',
			prevEl: '.license-doctor__swiper-button-prev',
		},

		breakpoints: {
			688: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
		},
	})

	const doctorsSwiper = new Swiper('.doctorsSwiper', {
		slidesPerView: 1.2,
		spaceBetween: 8,
		freeMode: true,
		pagination: {
			el: '.doctors__swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.doctors__swiper-button-next',
			prevEl: '.doctors__swiper-button-prev',
		},

		breakpoints: {
			1150: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			860: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			550: {
				slidesPerView: 2,
				spaceBetween: 13,
			},
		},
	})

	const gallerySwiper = new Swiper('.gallerySwiper', {
		slidesPerView: 1.2,
		spaceBetween: 10,
		freeMode: true,
		navigation: {
			nextEl: '.gallery__swiper-button-next',
			prevEl: '.gallery__swiper-button-prev',
		},

		breakpoints: {
			1200: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			950: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
			600: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
		},
	})

	const faqSwiper = new Swiper('.faqSwiper', {
		slidesPerView: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: '.faq__swiper-button-next',
			prevEl: '.faq__swiper-button-prev',
		},
	})
	/*  End slaider  */

	// navigation
	const articleNavigation = document.querySelector('.navigation')
	if (articleNavigation) {
		const jsScrollBlockList = document.querySelectorAll(
			'.text__content h1, .text__content h2, .text__content h3'
		)

		if (jsScrollBlockList.length > 0) {
			for (let i = 0; i < jsScrollBlockList.length; i += 1) {
				const jsScrollBlock = jsScrollBlockList[i]
				const titleBlock = jsScrollBlock.textContent
				const articleNavigationList = document.querySelector(
					'.navigation__item ul'
				)
				const articleNavigationItem = document.createElement('li')
				const articleNavigationLink = document.createElement('a')
				articleNavigationItem.classList.add('navigation__list-item')
				articleNavigationLink.classList.add('navigation__link')
				jsScrollBlock.setAttribute('id', `${i}`)
				articleNavigationLink.setAttribute('href', `$${i}`)
				articleNavigationLink.textContent = ' ' + titleBlock
				articleNavigationItem.append(articleNavigationLink)
				articleNavigationList.append(articleNavigationItem)
			}
			document.querySelectorAll('a[href^="$"').forEach(link => {
				link.addEventListener('click', function (e) {
					e.preventDefault()
					let href = this.getAttribute('href').substring(1)
					const scrollTarget = document.getElementById(href)
					const topOffset = 280
					const elementPosition = scrollTarget.getBoundingClientRect().top
					const offsetPosition = elementPosition - topOffset
					window.scrollBy({
						top: offsetPosition,
						behavior: 'smooth',
					})
				})
			})
		} else {
			articleNavigation.querySelector('.navigation__item').remove()
		}
	}
	// end navigation

	/* close popup-cookie */
	document
		.getElementById('popup__cookie_btn')
		.addEventListener('click', function () {
			document.getElementById('popup__cookie').style.display = 'none'
		})
})

/*  pop-up menu  */
document.addEventListener('DOMContentLoaded', function () {
	const list = document.querySelectorAll('.hide-item')

	function accordion(e) {
		e.stopPropagation()
		if (this.classList.contains('hide-item--active')) {
			this.classList.remove('hide-item--active')
		} else {
			for (let i = 0; i < list.length; i++) {
				list[i].classList.remove('hide-item--active')
			}
			this.classList.add('hide-item--active')
		}
	}
	for (let i = 0; i < list.length; i++) {
		list[i].addEventListener('click', accordion)
	}

	const sublinkButtons = document.querySelectorAll('.header__sublink_button')
	function toggleSubmenu(e) {
		e.stopPropagation()
		const submenuWrapper = this.nextElementSibling
		if (submenuWrapper.classList.contains('show')) {
			submenuWrapper.classList.remove('show')
		} else {
			document
				.querySelectorAll('.header__subsubmenu_wrapper')
				.forEach(wrapper => wrapper.classList.remove('show'))
			submenuWrapper.classList.add('show')
		}
	}
	for (let i = 0; i < sublinkButtons.length; i++) {
		sublinkButtons[i].addEventListener('click', toggleSubmenu)
	}

	document.addEventListener('click', function () {
		document
			.querySelectorAll('.header__subsubmenu_wrapper')
			.forEach(wrapper => wrapper.classList.remove('show'))
	})

	document.querySelectorAll('.header__subsubmenu_wrapper').forEach(wrapper => {
		wrapper.addEventListener('click', function (e) {
			e.stopPropagation()
		})
	})
})

/*  read more  */
const info = document.querySelectorAll('.text-block__more')
for (let i = 0; i < info.length; i++) {
	info[i].addEventListener('click', function () {
		const commentText = this.previousElementSibling
		commentText.classList.toggle('text-block__contant_more--active')
		this.innerText === 'Скрыть'
			? (this.innerText = 'Читать  далее')
			: (this.innerText = 'Скрыть')
	})
}

/*   tabs  */
const showTab = elTabBtn => {
	const elTab = elTabBtn.closest('.tab')
	if (elTabBtn.classList.contains('tab__btn--active')) {
		return
	}
	const targetId = elTabBtn.dataset.id
	const elTabPane = elTab.querySelectorAll(`.tabcontent[data-id="${targetId}"]`)
	console.log(elTabPane)

	for (let i = 0; i < elTabPane.length; i++) {
		if (elTabPane[i]) {
			const elTabBtnActive = document.querySelector('.tab__btn--active')
			elTabBtnActive.classList.remove('tab__btn--active')

			const elTabPaneShow = document.querySelectorAll('.tabcontent--active')
			for (let j = 0; j < elTabPaneShow.length; j++) {
				elTabPaneShow[j].classList.remove('tabcontent--active')
			}
			elTabBtn.classList.add('tab__btn--active')
			// elTabPane[i].classList.add('tabcontent--active');

			for (let j = 0; j < elTabPaneShow.length; j++) {
				elTabPane[j].classList.add('tabcontent--active')
			}
		}
	}
}
document.addEventListener('click', e => {
	if (e.target && !e.target.closest('.tab__btn')) {
		return
	}
	const elTabBtn = e.target.closest('.tab__btn')
	showTab(elTabBtn)
})
/*   end tabs  */

/*  search city */
document.addEventListener('DOMContentLoaded', function () {
	let inputSearch = document.querySelectorAll('input[type=search]')
	if (inputSearch.length > 0) {
		inputSearch.forEach(elem => {
			const wrapper = elem.closest('.search-wrapper')
			if (wrapper) {
				const searchResultBlock = wrapper.querySelector('.popup__search-result')
				const popularCitiesBlock = wrapper.querySelector('.popup__search-city')
				const noResultsMessage = searchResultBlock.querySelector(
					'.no-results-message'
				)

				function search() {
					let filter = elem.value.toUpperCase()
					let ul = wrapper.querySelectorAll('.search-list')
					let totalResults = 0

					ul.forEach(item => {
						let li = item.getElementsByTagName('li')
						for (let i = 0; i < li.length; i++) {
							let a = li[i].querySelector('.search-name')
							if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
								li[i].classList.remove('none')
								totalResults++
							} else {
								li[i].classList.add('none')
							}
						}
					})
					if (elem.value.trim() === '') {
						searchResultBlock.classList.add('none')
						popularCitiesBlock.classList.remove('none')
					} else {
						searchResultBlock.classList.remove('none')
						popularCitiesBlock.classList.add('none')
					}
					if (totalResults === 0 && elem.value.trim() !== '') {
						noResultsMessage.classList.remove('none')
					} else {
						noResultsMessage.classList.add('none')
					}
				}
				elem.addEventListener('input', search)
			}
		})
	}
})
/*  end search  */

/*  button price more   */
document.querySelectorAll('.price__more').forEach(button => {
	button.addEventListener('click', () => {
		const item = button.closest('.price__item')
		const textElement = item.querySelector('.price__description')

		if (
			textElement.style.display === 'none' ||
			textElement.style.display === ''
		) {
			textElement.style.display = 'block'
			button.classList.add('price__more--active')
			item.style.alignItems = 'flex-start'
		} else {
			textElement.style.display = 'none'
			button.classList.remove('price__more--active')
			item.style.alignItems = 'center'
		}
	})
})
/*  end button price more   */

/*   scrollTop  */
document.addEventListener('DOMContentLoaded', function () {
	const buttonUp = document.querySelector('.footer__btn-up')
	buttonUp.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})
})
/*   end scrollTop  */
