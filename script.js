// ================================================
// CRITICAL MOBILE FIXES
// ================================================

// Prevent zoom on input focus (iOS fix)
$('input, textarea, select').on('focus', function() {
    $('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
}).on('blur', function() {
    $('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1.0');
});

// Fix iOS rubber band scrolling when menu is open
function preventBodyScroll(enable) {
    if (enable) {
        $('body').css({
            'overflow': 'hidden',
            'position': 'fixed',
            'width': '100%',
            'height': '100%'
        });
    } else {
        $('body').css({
            'overflow': 'auto',
            'position': 'relative',
            'height': 'auto'
        });
    }
}

// ================================================
// MOBILE MENU ENHANCED
// ================================================

function initMobileMenu() {
    const $hamburger = $('#hamburger');
    const $navMenu = $('#navMenu');
    const $navLinks = $('.nav-link');
    
    // Ensure hamburger exists
    if ($hamburger.length === 0) {
        console.error('Hamburger menu not found');
        return;
    }
    
    // Toggle mobile menu
    $hamburger.off('click').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = $(this).hasClass('active');
        
        $(this).toggleClass('active');
        $navMenu.toggleClass('active');
        
        // Prevent body scroll when menu is open
        preventBodyScroll(!isActive);
        
        console.log('Menu toggled:', !isActive);
    });
    
    // Close menu when clicking on a link
    $navLinks.off('click').on('click', function(e) {
        console.log('Nav link clicked');
        $hamburger.removeClass('active');
        $navMenu.removeClass('active');
        preventBodyScroll(false);
    });
    
    // Close menu when clicking outside
    $(document).off('click.menu').on('click.menu', function(e) {
        if (!$(e.target).closest('.nav-menu, #hamburger').length) {
            if ($navMenu.hasClass('active')) {
                $hamburger.removeClass('active');
                $navMenu.removeClass('active');
                preventBodyScroll(false);
            }
        }
    });
    
    // Handle window resize
    $(window).on('resize', function() {
        if ($(window).width() > 768) {
            $hamburger.removeClass('active');
            $navMenu.removeClass('active');
            preventBodyScroll(false);
        }
    });
}

// ================================================
// FIX SWIPER FOR MOBILE
// ================================================

function initSwiper() {
    if ($('.projectsSwiper').length === 0) {
        console.log('Swiper container not found');
        return;
    }
    
    const projectsSwiper = new Swiper('.projectsSwiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        
        speed: 600,
        effect: 'slide',
        
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        
        // Better touch settings
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        touchStartPreventDefault: false,
        touchMoveStopPropagation: false,
        
        // Accessibility
        a11y: {
            enabled: true
        }
    });
    
    console.log('Swiper initialized');
    
    return projectsSwiper;
}

// ================================================
// FIX SMOOTH SCROLL FOR MOBILE
// ================================================

function initSmoothScroll() {
    $('a[href^="#"]').off('click').on('click', function(e) {
        e.preventDefault();
        
        const href = $(this).attr('href');
        const target = $(href);
        
        if (target.length) {
            // Close mobile menu if open
            $('#hamburger').removeClass('active');
            $('#navMenu').removeClass('active');
            preventBodyScroll(false);
            
            // Calculate offset for mobile
            const offset = $(window).width() < 768 ? 70 : 80;
            
            $('html, body').animate({
                scrollTop: target.offset().top - offset
            }, 800, 'swing');
        }
    });
}

// ================================================
// FIX BUTTONS FOR MOBILE
// ================================================

function fixMobileButtons() {
    // Make all buttons more tappable
    $('.btn, button, .nav-link, a').css({
        'min-height': '44px',
        'min-width': '44px',
        'touch-action': 'manipulation'
    });
    
    // Prevent double-tap zoom on buttons
    $('.btn, button').on('touchend', function(e) {
        e.preventDefault();
        $(this).trigger('click');
    });
}

// ================================================
// FIX CONTACT FORM FOR MOBILE
// ================================================

function initContactForm() {
    const $sendBtn = $('#sendMessage');
    
    if ($sendBtn.length === 0) {
        console.log('Send button not found');
        return;
    }
    
    $sendBtn.off('click').on('click', function(e) {
        e.preventDefault();
        console.log('Send button clicked');
        
        const $btn = $(this);
        const name = $('#contactName').val().trim();
        const email = $('#contactEmail').val().trim();
        const subject = $('#contactSubject').val().trim();
        const message = $('#contactMessage').val().trim();
        
        // Validate
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading
        $btn.prop('disabled', true)
            .html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        
        // Simulate sending
        setTimeout(function() {
            // Hide form, show success
            $('#contactForm').fadeOut(400, function() {
                $('#formSuccess').fadeIn(400);
            });
            
            // Reset button
            $btn.prop('disabled', false)
                .html('<i class="fas fa-paper-plane"></i> Send Message');
            
            // Clear form
            $('#contactName, #contactEmail, #contactSubject, #contactMessage').val('');
            
            showNotification('Message sent successfully!', 'success');
        }, 2000);
    });
}

// ================================================
// FIX NEWSLETTER FOR MOBILE
// ================================================

function initNewsletter() {
    const $subscribeBtn = $('#subscribeBtn');
    
    if ($subscribeBtn.length === 0) {
        console.log('Subscribe button not found');
        return;
    }
    
    $subscribeBtn.off('click').on('click', function(e) {
        e.preventDefault();
        console.log('Subscribe button clicked');
        
        const $btn = $(this);
        const email = $('#newsletterEmail').val().trim();
        
        if (!email) {
            showNotification('Please enter your email', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }
        
        $btn.prop('disabled', true)
            .html('<i class="fas fa-spinner fa-spin"></i>');
        
        setTimeout(function() {
            $('#newsletterEmail').val('');
            $btn.prop('disabled', false)
                .html('<i class="fas fa-envelope"></i> Subscribe');
            showNotification('Successfully subscribed!', 'success');
        }, 1500);
    });
}

// ================================================
// INITIALIZE EVERYTHING ON LOAD
// ================================================

$(document).ready(function() {
    console.log('✅ Document ready - Initializing...');
    
    // Wait a bit for everything to load
    setTimeout(function() {
        initializePortfolio();
        fixMobileButtons();
        
        console.log('✅ Portfolio initialized');
        console.log('Window width:', $(window).width());
        console.log('Hamburger exists:', $('#hamburger').length > 0);
        console.log('Nav menu exists:', $('#navMenu').length > 0);
    }, 100);
});

// Reinitialize on page show (for back button)
$(window).on('pageshow', function(event) {
    if (event.persisted) {
        initializePortfolio();
    }
});

// ================================================
// INITIALIZE ALL FUNCTIONS
// ================================================

function initializePortfolio() {
    // Initialize libraries
    initAOS();
    initSwiper();
    initTyped();
    
    // Initialize navigation
    initNavigation();
    initMobileMenu();
    
    // Initialize scroll features
    initScrollProgress();
    initBackToTop();
    initSmoothScroll();
    initActiveNavLinks();
    
    // Initialize animations
    initCounters();
    initSkillBars();
    
    // Initialize forms
    initContactForm();
    initNewsletter();
    
    // Initialize other features
    initCodeCopy();
    
    console.log('✅ All features initialized');
}

// ================================================
// 1. INITIALIZE AOS (Animate On Scroll)
// ================================================

function initAOS() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100,
        delay: 0,
        anchorPlacement: 'top-bottom',
        // Mobile settings
        disable: function() {
            return $(window).width() < 768 ? false : false;
        }
    });
    
    // Refresh AOS on window resize
    $(window).on('resize', function() {
        AOS.refresh();
    });
}

// ================================================
// 2. INITIALIZE SWIPER.JS (Project Slider)
// ================================================

function initSwiper() {
    const projectsSwiper = new Swiper('.projectsSwiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        
        // Better responsive breakpoints
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            576: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        
        effect: 'slide',
        speed: 600,
        
        keyboard: {
            enabled: true,
        },
        
        mousewheel: {
            forceToAxis: true,
        },
        
        // Touch settings for better mobile experience
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true
    });
    
    // Handle visibility change
    $(document).on('visibilitychange', function() {
        if (document.hidden) {
            projectsSwiper.autoplay.stop();
        } else {
            projectsSwiper.autoplay.start();
        }
    });
}

// ================================================
// 3. TYPED.JS - TYPING ANIMATION
// ================================================

function initTyped() {
    if ($('.typing-text').length) {
        const typed = new Typed('.typing-text', {
            strings: [
                'HTML & CSS',
                'JavaScript',
                'Responsive Design',
                'API Integration',
                'Modern Web Apps'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// ================================================
// 4. NAVIGATION - SCROLL & MOBILE MENU
// ================================================

function initNavigation() {
    const $navbar = $('#navbar');
    
    // Sticky navbar on scroll using jQuery
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    });
}

function initMobileMenu() {
    const $hamburger = $('#hamburger');
    const $navMenu = $('#navMenu');
    const $navLinks = $('.nav-link');
    
    // Toggle mobile menu with jQuery animation
    $hamburger.on('click', function() {
        $(this).toggleClass('active');
        $navMenu.toggleClass('active');
        
        // Prevent body scroll when menu is open
        if ($navMenu.hasClass('active')) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'auto');
        }
    });
    
    // Close menu when clicking on a link
    $navLinks.on('click', function() {
        $hamburger.removeClass('active');
        $navMenu.removeClass('active');
        $('body').css('overflow', 'auto');
    });
    
    // Close menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.nav-menu, #hamburger').length) {
            $hamburger.removeClass('active');
            $navMenu.removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });
}

// ================================================
// 5. SCROLL PROGRESS BAR
// ================================================

function initScrollProgress() {
    const $progressBar = $('#progressBar');
    
    $(window).on('scroll', function() {
        const windowHeight = $(document).height() - $(window).height();
        const scrolled = ($(window).scrollTop() / windowHeight) * 100;
        $progressBar.css('width', scrolled + '%');
    });
}

// ================================================
// 6. COUNTER ANIMATION (Using jQuery)
// ================================================

function initCounters() {
    const $counters = $('.counter');
    let animated = false;
    
    $(window).on('scroll', function() {
        if (!animated && isInViewport($counters.first())) {
            animated = true;
            
            $counters.each(function() {
                const $this = $(this);
                const target = parseInt($this.data('target'));
                
                $({ count: 0 }).animate({ count: target }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.count));
                    },
                    complete: function() {
                        $this.text(target);
                    }
                });
            });
        }
    });
}

// ================================================
// 7. SKILL PROGRESS BARS (Using jQuery)
// ================================================

function initSkillBars() {
    const $skillBars = $('.skill-progress');
    let skillsAnimated = false;
    
    $(window).on('scroll', function() {
        if (!skillsAnimated && isInViewport($skillBars.first())) {
            skillsAnimated = true;
            
            $skillBars.each(function() {
                const $this = $(this);
                const progress = $this.data('progress');
                
                $this.animate({
                    width: progress + '%'
                }, 1500, 'swing');
            });
        }
    });
}

// ================================================
// 8. SMOOTH SCROLL (jQuery)
// ================================================

function initSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'swing');
        }
    });
}

// ================================================
// 9. BACK TO TOP BUTTON (jQuery)
// ================================================

function initBackToTop() {
    const $backToTop = $('#backToTop');
    
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 500) {
            $backToTop.fadeIn().addClass('show');
        } else {
            $backToTop.fadeOut().removeClass('show');
        }
    });
    
    $backToTop.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'swing');
    });
}

// ================================================
// 10. ACTIVE NAVIGATION LINKS
// ================================================

function initActiveNavLinks() {
    const $sections = $('section[id]');
    const $navLinks = $('.nav-link');
    
    $(window).on('scroll', function() {
        const scrollY = $(this).scrollTop();
        
        $sections.each(function() {
            const $section = $(this);
            const sectionHeight = $section.outerHeight();
            const sectionTop = $section.offset().top - 100;
            const sectionId = $section.attr('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                $navLinks.removeClass('active');
                $(`.nav-link[href="#${sectionId}"]`).addClass('active');
            }
        });
    });
}

// ================================================
// 11. CONTACT FORM (jQuery Enhanced)
// ================================================

function initContactForm() {
    $('#sendMessage').on('click', function(e) {
        e.preventDefault();
        
        const $btn = $(this);
        const name = $('#contactName').val().trim();
        const email = $('#contactEmail').val().trim();
        const subject = $('#contactSubject').val().trim();
        const message = $('#contactMessage').val().trim();
        
        // Validate
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading
        $btn.prop('disabled', true)
            .html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        
        // Simulate sending
        setTimeout(function() {
            // Hide form, show success
            $('#contactForm').fadeOut(function() {
                $('#formSuccess').fadeIn();
            });
            
            // Reset button
            $btn.prop('disabled', false)
                .html('<i class="fas fa-paper-plane"></i> Send Message');
            
            // Clear form
            $('#contactName, #contactEmail, #contactSubject, #contactMessage').val('');
            
            showNotification('Message sent successfully!', 'success');
        }, 2000);
    });
}

// ================================================
// 12. NEWSLETTER SUBSCRIPTION (jQuery)
// ================================================

function initNewsletter() {
    $('#subscribeBtn').on('click', function() {
        const $btn = $(this);
        const email = $('#newsletterEmail').val().trim();
        
        if (!email) {
            showNotification('Please enter your email', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }
        
        $btn.prop('disabled', true)
            .html('<i class="fas fa-spinner fa-spin"></i>');
        
        setTimeout(function() {
            $('#newsletterEmail').val('');
            $btn.prop('disabled', false)
                .html('<i class="fas fa-envelope"></i> Subscribe');
            showNotification('Successfully subscribed!', 'success');
        }, 1500);
    });
}

// ================================================
// 13. CODE COPY BUTTONS
// ================================================

function initCodeCopy() {
    $('.code-example').each(function() {
        const $codeBlock = $(this);
        const $copyBtn = $('<button class="copy-code-btn"><i class="fas fa-copy"></i> Copy</button>');
        
        $copyBtn.css({
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            transition: 'all 0.3s ease'
        });
        
        $codeBlock.css('position', 'relative').append($copyBtn);
        
        $copyBtn.on('click', function() {
            const code = $codeBlock.find('code').text();
            
            // Copy to clipboard
            navigator.clipboard.writeText(code).then(function() {
                $copyBtn.html('<i class="fas fa-check"></i> Copied!')
                       .css('background', '#10b981');
                
                setTimeout(function() {
                    $copyBtn.html('<i class="fas fa-copy"></i> Copy')
                           .css('background', 'rgba(255, 255, 255, 0.1)');
                }, 2000);
            });
        });
        
        $copyBtn.hover(
            function() {
                if (!$(this).text().includes('Copied')) {
                    $(this).css('background', 'rgba(255, 255, 255, 0.2)');
                }
            },
            function() {
                if (!$(this).text().includes('Copied')) {
                    $(this).css('background', 'rgba(255, 255, 255, 0.1)');
                }
            }
        );
    });
}

// ================================================
// 14. NOTIFICATION SYSTEM (jQuery)
// ================================================

function showNotification(message, type = 'success') {
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const bgColor = type === 'success' ? '#10b981' : '#ef4444';
    
    const $notification = $(`
        <div class="notification notification-${type}">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `);
    
    $notification.css({
        position: 'fixed',
        top: '100px',
        right: '30px',
        background: bgColor,
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 10000,
        fontWeight: '500',
        opacity: 0
    });
    
    $('body').append($notification);
    
    // Fade in
    $notification.animate({ opacity: 1, right: '30px' }, 300);
    
    // Remove after 4 seconds
    setTimeout(function() {
        $notification.animate({ opacity: 0, right: '-300px' }, 300, function() {
            $(this).remove();
        });
    }, 4000);
}

// ================================================
// 15. UTILITY FUNCTIONS
// ================================================

function isInViewport($element) {
    if (!$element.length) return false;
    
    const elementTop = $element.offset().top;
    const elementBottom = elementTop + $element.outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();
    
    return elementBottom > viewportTop && elementTop < viewportBottom;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ================================================
// 16. KEYBOARD SHORTCUTS
// ================================================

$(document).on('keydown', function(e) {
    // Press 'H' to go home
    if ((e.key === 'h' || e.key === 'H') && !$(e.target).is('input, textarea')) {
        $('html, body').animate({ scrollTop: $('#home').offset().top }, 800);
    }
    
    // Press 'C' to go to contact
    if ((e.key === 'c' || e.key === 'C') && !$(e.target).is('input, textarea')) {
        $('html, body').animate({ scrollTop: $('#contact').offset().top }, 800);
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        $('#hamburger').removeClass('active');
        $('#navMenu').removeClass('active');
        $('body').css('overflow', 'auto');
    }
});

// ================================================
// 17. MOBILE TOUCH IMPROVEMENTS
// ================================================

// Improve touch scrolling on iOS
$('body').css({
    '-webkit-overflow-scrolling': 'touch',
    'overflow-scrolling': 'touch'
});

// Prevent zoom on double tap (mobile)
$('button, a, input, textarea').on('touchend', function(e) {
    e.preventDefault();
    $(this).trigger('click');
});

// ================================================
// 18. LAZY LOAD IMAGES (jQuery)
// ================================================

$('img[data-src]').each(function() {
    const $img = $(this);
    const imgObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                $img.attr('src', $img.data('src'));
                $img.removeAttr('data-src');
                imgObserver.unobserve(entry.target);
            }
        });
    });
    
    imgObserver.observe(this);
});

// ================================================
// 19. CONSOLE WELCOME
// ================================================

console.log('%c Welcome to My Portfolio! ', 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Built with Bootstrap, jQuery, AOS.js, Swiper.js', 'color: #667eea; font-size: 12px;');

// ================================================
// 20. PERFORMANCE MONITORING
// ================================================

$(window).on('load', function() {
    const loadTime = performance.now();
    console.log(`%c⚡ Page loaded in ${loadTime.toFixed(2)}ms`, 'color: #10b981; font-weight: bold;');
    
    // Refresh AOS after everything is loaded
    AOS.refresh();
});

// ================================================
// 1. INITIALIZE AOS (Animate On Scroll)
// ================================================

AOS.init({
    duration: 1000,           // Animation duration in milliseconds
    easing: 'ease-in-out',    // Easing function
    once: true,               // Animation happens only once
    mirror: false,            // Elements animate out when scrolling past them
    offset: 100,              // Offset from the original trigger point
    delay: 0,                 // Delay animations
    anchorPlacement: 'top-bottom'  // Defines which position triggers animation
});

// ================================================
// 2. INITIALIZE SWIPER.JS (Project Slider)
// ================================================

const projectsSwiper = new Swiper('.projectsSwiper', {
    // Enable loop mode
    loop: true,
    
    // Number of slides per view
    slidesPerView: 1,
    spaceBetween: 30,
    
    // Enable pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    
    // Enable navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // Autoplay
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    
    // Responsive breakpoints
    breakpoints: {
        // When window width is >= 640px
        640: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        // When window width is >= 768px
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        // When window width is >= 1024px
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    },
    
    // Effects
    effect: 'slide',
    speed: 600,
    
    // Keyboard control
    keyboard: {
        enabled: true,
    },
    
    // Mouse wheel control
    mousewheel: {
        forceToAxis: true,
    }
});

// ================================================
// 3. TYPED.JS - TYPING ANIMATION IN HERO
// ================================================

const typed = new Typed('.typing-text', {
    strings: [
        'HTML & CSS',
        'JavaScript',
        'Responsive Design',
        'API Integration',
        'Modern Web Apps'
    ],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
});

// ================================================
// 4. NAVIGATION - SCROLL & MOBILE MENU
// ================================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ================================================
// 5. SCROLL PROGRESS BAR
// ================================================

const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ================================================
// 6. COUNTER ANIMATION (Hero Stats)
// ================================================

const counters = document.querySelectorAll('.counter');
const speed = 200; // Lower = faster

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const increment = target / speed;
            
            const updateCounter = () => {
                const current = +counter.textContent;
                
                if (current < target) {
                    counter.textContent = Math.ceil(current + increment);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ================================================
// 7. SKILL PROGRESS BARS ANIMATION
// ================================================

const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
            skillObserver.unobserve(bar);
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ================================================
// 8. SMOOTH SCROLL FOR ANCHOR LINKS
// ================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================================
// 9. BACK TO TOP BUTTON
// ================================================

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================================
// 10. CONTACT FORM HANDLING
// ================================================

const sendMessageBtn = document.getElementById('sendMessage');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

sendMessageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    // Validate form
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    sendMessageBtn.disabled = true;
    sendMessageBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate sending (in real project, this would be an API call)
    setTimeout(() => {
        // Hide form, show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset button
        sendMessageBtn.disabled = false;
        sendMessageBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        
        // Clear form
        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactSubject').value = '';
        document.getElementById('contactMessage').value = '';
        
        // Show notification
        showNotification('Message sent successfully!', 'success');
        
        // In a real application, you would send this data to a server:
        /*
        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // Handle success
        })
        .catch(error => {
            // Handle error
        });
        */
    }, 2000);
});

// ================================================
// 11. NEWSLETTER SUBSCRIPTION
// ================================================

const subscribeBtn = document.getElementById('subscribeBtn');
const newsletterEmail = document.getElementById('newsletterEmail');

subscribeBtn.addEventListener('click', () => {
    const email = newsletterEmail.value.trim();
    
    if (!email) {
        showNotification('Please enter your email', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }
    
    // Show loading
    subscribeBtn.disabled = true;
    subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    // Simulate subscription
    setTimeout(() => {
        newsletterEmail.value = '';
        subscribeBtn.disabled = false;
        subscribeBtn.innerHTML = '<i class="fas fa-envelope"></i> Subscribe';
        showNotification('Successfully subscribed to newsletter!', 'success');
    }, 1500);
});

// ================================================
// 12. NOTIFICATION SYSTEM
// ================================================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const bgColor = type === 'success' ? '#10b981' : '#ef4444';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================================================
// 13. CODE SYNTAX HIGHLIGHTING (Optional Enhancement)
// ================================================

// Add copy button to code blocks
document.querySelectorAll('.code-example').forEach(codeBlock => {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
    copyBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.3s ease;
    `;
    
    codeBlock.style.position = 'relative';
    codeBlock.appendChild(copyBtn);
    
    copyBtn.addEventListener('click', () => {
        const code = codeBlock.querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = '#10b981';
            
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                copyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 2000);
        });
    });
    
    copyBtn.addEventListener('mouseenter', () => {
        copyBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    copyBtn.addEventListener('mouseleave', () => {
        if (!copyBtn.textContent.includes('Copied')) {
            copyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    });
});

// ================================================
// 14. LAZY LOADING IMAGES
// ================================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ================================================
// 15. ACTIVE NAVIGATION LINK ON SCROLL
// ================================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// ================================================
// 16. PREVENT CONTEXT MENU (Optional - Security)
// ================================================

// Uncomment if you want to prevent right-click
/*
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showNotification('Right-click is disabled', 'error');
});
*/

// ================================================
// 17. CONSOLE WELCOME MESSAGE
// ================================================

console.log('%c Welcome to My Portfolio! ', 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Built with ❤️ using HTML, CSS & JavaScript', 'color: #667eea; font-size: 14px; font-weight: bold;');
console.log('%c Featuring: AOS.js, Swiper.js, Typed.js', 'color: #764ba2; font-size: 12px;');

// ================================================
// 18. PERFORMANCE MONITORING (Optional)
// ================================================

window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`%c⚡ Page loaded in ${loadTime.toFixed(2)}ms`, 'color: #10b981; font-weight: bold;');
});

// ================================================
// 19. KEYBOARD SHORTCUTS
// ================================================

document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        if (!e.target.matches('input, textarea')) {
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        if (!e.target.matches('input, textarea')) {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ================================================
// 20. THEME SWITCHER (Optional Feature)
// ================================================

// Uncomment to add theme switching functionality
/*
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.className = 'theme-toggle';
themeToggle.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 1.2rem;
    color: #667eea;
    z-index: 999;
    transition: all 0.3s ease;
`;

document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});
*/

// ================================================
// 21. INITIALIZE EVERYTHING ON PAGE LOAD
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ All scripts loaded successfully');
    
    // Refresh AOS
    AOS.refresh();
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// ================================================
// 22. HANDLE PAGE VISIBILITY
// ================================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        projectsSwiper.autoplay.stop();
    } else {
        // Resume animations when page is visible
        projectsSwiper.autoplay.start();
    }
});

// ================================================
// END OF SCRIPT
// ================================================