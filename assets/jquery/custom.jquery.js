/* jQuery-driven UI: FAQ accordion (slideToggle), fade animations, smooth-scroll,
 * newsletter subtle fade, mobile menu enhancements. Requires jquery.min.js loaded first. */
(function ($) {
  'use strict';
  if (typeof $ === 'undefined') return;

  $(function () {
    // FAQ accordion using slideToggle
    $('.accordion-header').on('click', function () {
      const $btn = $(this);
      const $item = $btn.closest('.accordion-item');
      const isOpen = $item.hasClass('open');

      // Close siblings
      $item.siblings('.accordion-item.open').removeClass('open')
        .find('.accordion-body').slideUp(250);

      $item.toggleClass('open');
      $btn.attr('aria-expanded', !isOpen);
      $btn.next('.accordion-body').stop(true, true).slideToggle(250);
    });

    // Fade in main content on page load
    $('main').hide().fadeIn(500);

    // Smooth scroll for in-page anchors
    $('a[href^="#"]').on('click', function (e) {
      const href = $(this).attr('href');
      if (href === '#' || href.length < 2) return;
      const $target = $(href);
      if ($target.length) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $target.offset().top - 80 }, 500);
      }
    });

    // Newsletter row: subtle bump on hover
    $('.newsletter .btn').hover(
      function () { $(this).animate({ paddingLeft: '32px', paddingRight: '32px' }, 200); },
      function () { $(this).animate({ paddingLeft: '24px', paddingRight: '24px' }, 200); }
    );

    // Loader fade-out fallback
    $(window).on('load', function () {
      $('#loader').fadeOut(400);
    });

    // Card lift with jQuery for browsers without transitions
    $('.card, .team-card, .testimonial-card').hover(
      function () { $(this).stop(true, false).animate({ marginTop: '-4px' }, 150); },
      function () { $(this).stop(true, false).animate({ marginTop: '0px' }, 150); }
    );
  });
})(window.jQuery);
