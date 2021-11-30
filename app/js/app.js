document.addEventListener("DOMContentLoaded", function () {
    const $html = document.querySelector('html');
    let scrollTop = window.pageYOffset;
    
    function hideScroll() {
        document.body.classList.add('block-scroll');
        // Блокировка скролла для Safari
        if (window.innerWidth <= 1200) {
            $html.style.scrollBehavior = 'auto';
            scrollTop = window.pageYOffset; // запоминаем текущую прокрутку сверху
            document.body.style.position = 'fixed';
            document.body.style.top = -scrollTop + 'px';
            $html.style.scrollBehavior = '';
        }
    }

    function showScroll() {
        document.body.classList.remove('block-scroll');

        // Блокировка скролла для Safari
        if (window.innerWidth <= 1200) {
            $html.style.scrollBehavior = 'auto';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scroll(0, scrollTop);
            $html.style.scrollBehavior = '';
        }
    }

    function initMenu() {
        const $header = document.querySelector('.header');
        const $headerBtn = document.querySelector('.header__menu-btn');
        const $headerPhoneBtn = document.querySelector('.header__phone-btn');
        let isInit = false;

        const checkScreenWidth = () => {
            // Активируем меню только на экранах <= 1200
            if (window.innerWidth <= 1200 && !isInit) {
                isInit = true;
                $headerBtn.addEventListener('click', () => {
                    $header.classList.remove('active-2');

                    if ($header.classList.contains('active')) {
                        $header.classList.remove('active');
                        $html.classList.remove('overflow-hidden');
                    } else {
                        $header.classList.add('active');
                        $html.classList.add('overflow-hidden');
                    }
                })
                $headerPhoneBtn.addEventListener('click', () => {
                    $header.classList.remove('active');

                    if ($header.classList.contains('active-2')) {
                        $header.classList.remove('active-2');
                        $html.classList.remove('overflow-hidden');
                    } else {
                        $header.classList.add('active-2');
                        $html.classList.add('overflow-hidden');
                    }

                })
            } else {
                window.addEventListener('resize', checkScreenWidth);
            }
        }

        checkScreenWidth();
    }

    function initWorkSlider() {
        const $workSlider = document.querySelector('.work__slider');
        if ($workSlider) {
            const workSlider = new Swiper('.work__slider', {
                autoplay: true,
                slidesPerView: 5,
                spaceBetween: 0,
                pagination: {
                    el: ".swiper-pagination",
                },
                breakpoints: {
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                    },
                    601: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    700: {
                        slidesPerView: 3
                    },
                    900: {
                        slidesPerView: 4
                    },
                    1280: {
                        slidesPerView: 5
                    },
                },
            });
        }
    }

    function initCoursesSlider() {
        const $coursesSlider = document.querySelector('.courses__list-wrapper');
        let isInit = false;
        
        if ($coursesSlider && window.innerWidth <= 1300 && !isInit) {
            isInit = true;
            $coursesSlider.classList.add('swiper-container');
            $coursesSlider.querySelector('.courses__list').classList.add('swiper-wrapper');
            $coursesSlider.querySelectorAll('.courses__item').forEach(item => item.classList.add('swiper-slide'));

            const coursesSlider = new Swiper('.courses__list-wrapper', {
                autoplay: true,
                slidesPerView: 'auto',
                spaceBetween: 20,
                pagination: {
                    el: ".swiper-pagination",
                },
                autoHeight: 'true',
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    461: {
                        slidesPerView: 'auto'
                    },
                },
            });
        } else {
            window.addEventListener('resize', function() {

                if (window.innerWidth <= 1300) {
                    isInit = true;
                    $coursesSlider.classList.add('swiper-container');
                    $coursesSlider.querySelector('.courses__list').classList.add('swiper-wrapper');
                    $coursesSlider.querySelectorAll('.courses__item').forEach(item => item.classList.add('swiper-slide'));

                    const coursesSlider = new Swiper('.courses__list-wrapper', {
                        autoplay: true,
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                        pagination: {
                            el: ".swiper-pagination",
                        },
                        autoHeight: 'true',
                        breakpoints: {
                            320: {
                                slidesPerView: 1
                            },
                            461: {
                                slidesPerView: 'auto'
                            },
                        },
                    });
                }
            })
        }

    }

    function initDynamicAdapt() {
        const da = new DynamicAdapt("max");  
        da.init();
    }

    function initHeroSlider() {
        const $heroSlider = document.querySelector('.hero__slider');
        if ($heroSlider) {
            const heroSlider = new Swiper('.hero__slider');
            heroSlider.on('slideChange', function (e) {
                if (e.activeIndex === 1) {
                    document.body.classList.add('yellow-theme');
                } else {
                    document.body.classList.remove('yellow-theme');
                }
            });
        }
    }

    function initModals() {
        const $modals = document.querySelectorAll('.modal');
        const $modalsTriggers = document.querySelectorAll('[data-micromodal-trigger]');

        $modalsTriggers.forEach(item => {
            item.addEventListener('click', (e) => e.preventDefault());
        })

        if ($modals.length > 0) {
            MicroModal.init({
                onShow: (modal) => {
                    // hideScroll();
                },
                onClose: (modal) => {
                    // showScroll();
                },
                disableFocus: true,
                openClass: 'is-open', 
                awaitOpenAnimation: true, 
                awaitCloseAnimation: true, 
                disableScroll: true
            });
        }
    }

    function disableTransitionsBeforePageLoading() {
        if (document.body.classList.contains('preload')) {
            document.body.classList.remove('preload');
        }
    }

    function initPhoneMasks() {
        const $phones = document.querySelectorAll('.phone-mask');

        $phones.forEach(item => {
            IMask(item, {
                mask: '+{380}(00)00-00',
            });
        })
    }

    function initBenefitsAccordion() {
        const $triggers = document.querySelectorAll('.benefits__item-head');
        let isInit = false;

        if ($triggers.length > 0) {

            if (window.innerWidth <= 900) {
                $triggers.forEach(item => {
                    item.addEventListener('click', function() {
                        item.closest('.benefits__item').classList.toggle('active');
                    })
                })
                isInit = true;
            } else {
                window.addEventListener('resize', function() {
                    if (window.innerWidth <= 900 && !isInit) {
                        isInit = true;
                        $triggers.forEach(item => {
                            item.addEventListener('click', function() {
                                item.closest('.benefits__item').classList.toggle('active');
                            })
                        })
                    }
                })
            }
        }
    }

    function initSelects() {
        const $selects = document.querySelectorAll('.custom-select select');
        const $headerAddress = document.querySelector('.header__select');

        // Инициализация основных селектов (с классом custom-select)
        if ($selects.length > 0) {
            $selects.forEach(select => {
                NiceSelect.bind(select);
            })
        }

        // Инициализация селекта адресса+телефон
        if ($headerAddress) {
            const $headerSelect = $headerAddress.querySelector('.header__select select');
            const $listItems = $headerAddress.querySelectorAll('.list li');

            // Устанавливаем значения селектов при загрузке
            $listItems.forEach((item, i) => {
                item.innerHTML = `<span>${$headerSelect.options[i].textContent}</span> <b>${$headerSelect.options[i].dataset.num}</b>`;
            })

            // Устанавливаем значения активного селекта при загрузке
            const $current = $headerAddress.querySelector('.current');
            let phoneNumber = $headerSelect.options[$headerSelect.options.selectedIndex].dataset.num;

            $current.innerHTML = `<span>${$current.textContent}</span> <b> ${phoneNumber} </b>`;

            // Устанавливаем значения активного селекта при изменении
            $headerSelect.addEventListener('change', function() {
                phoneNumber = this.options[this.options.selectedIndex].dataset.num;
                $current.innerHTML = `<span>${$current.textContent}</span> <b> ${phoneNumber} </b>`;
            })
        }

    }

    function initWhyTabs() {
        const $tabs = document.querySelectorAll('.why__tabs-title');
        const $tabsContents = document.querySelectorAll('.why__content-box');

        if ($tabs.length > 0) {
            $tabs.forEach(tab => {
                tab.addEventListener('click', function(e) {
                    e.preventDefault();

                    const activeTab = document.querySelector('.why__tabs-title.active');
                    const activeContent = document.querySelector('.why__content-box.active');

                    const id = this.getAttribute('data-tab');

                    if (activeTab) {
                        activeTab.classList.remove('active');
                        activeContent.classList.remove('active');
                    }
                    const content = document.querySelector('.why__content-box[data-tab="'+id+'"]');
                    
                    tab.classList.add('active');
                    content.classList.add('active');
                })
            })
        }
    }

    disableTransitionsBeforePageLoading();
    initDynamicAdapt();
    initMenu();

    initModals();
    initPhoneMasks();

    initWorkSlider();
    initHeroSlider();
    initBenefitsAccordion();
    initCoursesSlider();
    initSelects();
    initWhyTabs();
});
