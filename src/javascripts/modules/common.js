import 'svgxuse';
import ismobile from 'ismobilejs';
// import autosize from 'autosize';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'popover.js';
import Swiper from 'swiper';
// import LazyLoad from "vanilla-lazyload";
import 'uikit';
import 'jquery-menu-aim';

global.jQuery = $;
global.$ = $;

// $.fn.selectpicker.Constructor.DEFAULTS.dropupAuto = false;

$(() => {
  // 60fps scrolling using pointer-events: none
  // https://habrahabr.ru/post/204238/

  const { body } = document;
  let timer;

  window.addEventListener('scroll', () => {
    clearTimeout(timer);
    if (!body.classList.contains('disable-hover')) {
      body.classList.add('disable-hover');
    }
    timer = setTimeout(() => {
      body.classList.remove('disable-hover');
    }, 500);
  }, false);

  if (ismobile.phone) {
    body.classList.add('is-mobile');
  } else if (ismobile.tablet) {
    body.classList.add('is-tablet');
  } else {
    body.classList.add('is-desktop');
  }


  // menu toggle

  // $('.js-menu-toggle').on('click', function(){
  //   let $self = $(this);
  //   let $body = $(body);
  //   let target = $(this).data('target');
  //
  //   if ($self.hasClass('hide-menu')) {
  //     $self.add('.header-navbar').removeClass('hide-menu');
  //     $self.find('.hamburger').addClass('is-close');
  //   } else {
  //     $self.add('.header-navbar').addClass('hide-menu');
  //     $self.find('.hamburger').removeClass('is-close');
  //   }
  // });


  // hide header on scroll down

  // (() => {
  //   let didScroll;
  //   let lastScrollTop = 0;
  //   let delta = 5;
  //   let navbarHeight = $('.js-header').outerHeight();
  //
  //   $(window).resize(function(){
  //     navbarHeight = $('.js-header').outerHeight();
  //   });
  //
  //   $(window).scroll(function(event){
  //     didScroll = true;
  //   });
  //
  //   setInterval(function() {
  //     if (didScroll) {
  //       hasScrolled();
  //       didScroll = false;
  //     }
  //   }, 100);
  //
  //   function hasScrolled() {
  //     let scrollTop = $(window).scrollTop();
  //
  //     // Make scroll more than delta
  //     if(Math.abs(lastScrollTop - scrollTop) <= delta)
  //       return;
  //
  //     if (scrollTop > lastScrollTop && scrollTop > navbarHeight){
  //       // Scroll Down
  //       $('.js-header').removeClass('header-down').addClass('header-up');
  //     } else {
  //       // Scroll Up
  //       if(scrollTop + $(window).height() < $(document).height()) {
  //         $('.js-header').removeClass('header-up').addClass('header-down');
  //       }
  //     }
  //
  //     lastScrollTop = scrollTop;
  //   }
  // })();


  // dropdown

  $(document)
    .on('click.bs.dropdown.data-api', '.dropdown-menu.noclose', (e) => {
      e.stopPropagation();
    });

  $(document).on('click.bs.dropdown.data-api', '[data-dismiss="dropdown"]', function () {
    $(this).parents('.dropdown').eq(0).find('[data-toggle="dropdown"]')
      .dropdown('toggle');
  });

  // $(document).on('click', '.js-radio-buttons .btn, .js-radio-buttons .js-btn',  function () {
  //   $(this).siblings().removeClass('active').end().addClass('active');
  //   $(this).parent('[class*="col-"]').siblings().find('.js-btn').removeClass('active').end().end().addClass('active');
  // });


  // autosize textarea

  // autosize($('textarea.js-autosize'));


  // main hero swiper

  new Swiper('.js-swiper-container-main-hero', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // let swiperScrollbarRequestCourier = new Swiper('.js-swiper-container-scrollbar-request-courier', {
  //   slidesPerView: 'auto',
  //   spaceBetween: 0,
  //   mousewheel: false,
  //   freeMode: true,
  //   scrollbar: {
  //     el: '.swiper-scrollbar',
  //     hide: true,
  //   },
  //   grabCursor: false,
  // });

  // main category swiper

  new Swiper('.js-swiper-container-main-category', {
    slidesPerView: 2,
    spaceBetween: 15,
    breakpoints: {
      768: {
        slidesPerView: 3,
        resistanceRatio: 0,
      },
    },
  });


  // modal additional product swiper

  new Swiper('.js-swiper-container-additional-product', {
    slidesPerView: 3,
    spaceBetween: 10,
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
    },
  });


  // card collapse

  // $(document)
  //   .on('show.bs.collapse', '.card-collapse',  function () {
  //     $(this).parent('.card').addClass('is-expanded');
  //   })
  //   .on('hide.bs.collapse', '.card-collapse',  function () {
  //     $(this).parent('.card').removeClass('is-expanded');
  //   });

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  // let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  // document.documentElement.style.setProperty('--vh', `${vh}px`);

  // We listen to the resize event
  // window.addEventListener('resize', () => {
    // We execute the same script as before
    // let vh = window.innerHeight * 0.01;
    // document.documentElement.style.setProperty('--vh', `${vh}px`);
  // });


  // lazy load

  // new LazyLoad({
  //   elements_selector: "[loading=lazy]",
  //   use_native: true,
  //   // load_delay: 300,
  //   threshold: 0,
  // });


(function(){
    let $menu = $('.js-menu');

    $menu.menuAim({
      activate: activateSubmenu,
      deactivate: deactivateSubmenu,
      rowSelector: '> .header-submenu-dropdown, > .nav-link',
      submenuSelector: '.header-submenu-container',
      submenuDirection: 'below',
      tolerance: 75,  // bigger = more forgivey when entering submenu
      exitMenu: function() {
        $('.header-submenu-container').removeClass('show-submenu');
        $('.header-submenu-dropdown > .nav-link').removeClass('show-submenu');
      },
    });

    function activateSubmenu(row) {
      let $row = $(row);
      let submenuId = $row.data('submenuId');
      let $submenu = $(`#${submenuId}`);
      // let height = $menu.outerHeight();
      // let width = $menu.outerWidth();

      // Show the submenu
      $submenu.addClass('show-submenu');
      // $submenu.css({
      //   display: "block",
      //   top: -1,
      //   left: width - 3,  // main should overlay submenu
      //   height: height - 4  // padding for main dropdown's arrow
      // });

      // Keep the currently activated row's highlighted look
      $row.children('.nav-link').addClass('show-submenu');
    }

    function deactivateSubmenu(row) {
      let $row = $(row);
      let submenuId = $row.data('submenuId');
      let $submenu = $(`#${submenuId}`);

      // Hide the submenu and remove the row's highlighted look
      $submenu.removeClass('show-submenu');
      // $submenu.css("display", "none");
      $row.children('.nav-link').removeClass('show-submenu');
    }
  })();

  (function(){
    let $searchGroup = $('.js-search-input');
    let $wrapper = $searchGroup.parent('.js-search-wrapper');
    let $input = $searchGroup.find('.form-control');

    function init() {
      if (!!$input.val()) {
        $searchGroup.addClass('expand-search');
        $wrapper.addClass('expand-search');
      } else {
        $searchGroup.removeClass('expand-search');
        $wrapper.removeClass('expand-search');
      }
    }

    $input.focus(function(){
      $searchGroup.addClass('expand-search');
      $wrapper.addClass('expand-search');
    });

    $input.blur(function(){
      if (!!$input.val()) {
        return;
      }

      $searchGroup.removeClass('expand-search');
      $wrapper.removeClass('expand-search');
    });

    init();
  })();
});
