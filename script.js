// ================================================
// FIXED JAVASCRIPT FOR MOBILE ISSUES
// ================================================

// Wait for everything to load
$(document).ready(function() {
    console.log('✅ Document ready - Initializing...');
    initializePortfolio();
});

// ================================================
// MAIN INITIALIZATION
// ================================================
function initializePortfolio() {
    // Initialize libraries first
    initAOS();
    initTyped();
    initSwiper();
    
    // Initialize navigation
    initNavigation();
    initMobileMenu(); // FIXED: Proper mobile menu with touch support
    
    // Initialize scroll features
    initScrollProgress();
    initBackToTop();
    initSmoothScroll();
    initActiveNavLinks();
    
    // Initialize animations
    initCounters();
    initSkillBars();
    
    // Initialize forms - FIXED
    initContactForm(); // FIXED: Contact button now works on mobile
    initNewsletter();
    
    // Initialize other features
    initCodeCopy();
    
    console.log('✅ All features initialized');
    console.log('Window width:', $(window).width());
}

// ================================================
// 1. FIXED MOBILE MENU (Works on all devices)
// ================================================
function initMobileMenu() {
    const $hamburger = $('#hamburger');
    const $navMenu = $('#navMenu');
    const $navLinks = $('.nav-link');
    const $body = $('body');
    
    if ($hamburger.length === 0) {
        console.error('❌ Hamburger menu not found');
        return;
    }
    
    console.log('✅ Mobile menu initializing...');
    
    // Remove any existing event listeners
    $hamburger.off('click touchend');
    $navLinks.off('click touchend');
    $(document).off('click.menu touchend.menu');
    
    // FIXED: Handle both click AND touch events
    $hamburger.on('click touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🔘 Hamburger clicked/touched');
        
        const isActive = $(this).hasClass('active');
        
        // Toggle classes
        $(this).toggleClass('active');
        $navMenu.toggleClass('active');
        
        // Prevent body scroll when menu is open
        if (!isActive) {
            $body.css({
                'overflow': 'hidden',
                'position': 'fixed',
                'width': '100%',
                'height': '100%'
            });
            console.log('📱 Menu opened');
        } else {
            $body.css({
                'overflow': 'auto',
                'position': 'relative',
                'height': 'auto'
            });
            console.log('📱 Menu closed');
        }
    });
    
    // Close menu when clicking nav links
    $navLinks.on('click touchend', function(e) {
        console.log('🔗 Nav link clicked');
        
        $hamburger.removeClass('active');
        $navMenu.removeClass('active');
        $body.css({
            'overflow': 'auto',
            'position': 'relative',
            'height': 'auto'
        });
    });
    
    // Close menu when clicking outside
    $(document).on('click.menu touchend.menu', function(e) {
        if (!$(e.target).closest('.nav-menu, #hamburger').length) {
            if ($navMenu.hasClass('active')) {
                $hamburger.removeClass('active');
                $navMenu.removeClass('active');
                $body.css({
                    'overflow': 'auto',
                    'position': 'relative',
                    'height': 'auto'
                });
            }
        }
    });
    
    // Handle window resize
    $(window).on('resize', function() {
        if ($(window).width() > 768) {
            $hamburger.removeClass('active');
            $navMenu.removeClass('active');
            $body.css({
                'overflow': 'auto',
                'position': 'relative',
                'height': 'auto'
            });
        }
    });
    
    console.log('✅ Mobile menu initialized successfully');
}

// ================================================
// 2. FIXED CONTACT FORM (Works on mobile)
// ================================================
function initContactForm() {
    const $sendBtn = $('#sendMessage');
    const $contactForm = $('#contactForm');
    const $formSuccess = $('#formSuccess');
    
    if ($sendBtn.length === 0) {
        console.log('❌ Send button not found');
        return;
    }
    
    console.log('✅ Contact form initializing...');
    
    // Remove any existing event listeners
    $sendBtn.off('click touchend');
    
    // FIXED: Handle both click AND touch events
    $sendBtn.on('click touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('📧 Send button clicked/touched');
        
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
            $contactForm.fadeOut(400, function() {
                $formSuccess.fadeIn(400);
            });
            
            // Reset button
            $btn.prop('disabled', false)
                .html('<i class="fas fa-paper-plane"></i> Send Message');
            
            // Clear form
            $('#contactName, #contactEmail, #contactSubject, #contactMessage').val('');
            
            showNotification('Message sent successfully!', 'success');
            
            console.log('✅ Message sent');
        }, 2000);
    });
    
    console.log('✅ Contact form initialized successfully');
}

// ================================================
// 3. FIXED NEWSLETTER (Works on mobile)
// ================================================
function initNewsletter() {
    const $subscribeBtn = $('#subscribeBtn');
    
    if ($subscribeBtn.length === 0) {
        console.log('❌ Subscribe button not found');
        return;
    }
    
    // Remove any existing event listeners
    $subscribeBtn.off('click touchend');
    
    // FIXED: Handle both click AND touch events
    $subscribeBtn.on('click touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('📰 Subscribe button clicked/touched');
        
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
// 4. NAVIGATION
// ================================================
function initNavigation() {
    const $navbar = $('#navbar');
    
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    });
}

// ================================================
// 5. AOS INIT
// ================================================
function initAOS() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100,
        delay: 0,
        disable: false // Enable on all devices
    });
}

// ================================================
// 6. SWIPER INIT
// ================================================
function initSwiper() {
    if ($('.projectsSwiper').length === 0) {
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
        },
        
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 15 },
            480: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 2, spaceBetween: 30 },
            1200: { slidesPerView: 3, spaceBetween: 30 }
        },
        
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true
    });
}

// ================================================
// 7. TYPED.JS
// ================================================
function initTyped() {
    if ($('.typing-text').length) {
        new Typed('.typing-text', {
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
            loop: true
        });
    }
}

// ================================================
// 8. SCROLL PROGRESS BAR
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
// 9. BACK TO TOP
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
    
    $backToTop.on('click touchend', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });
}

// ================================================
// 10. SMOOTH SCROLL
// ================================================
function initSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            const offset = $(window).width() < 768 ? 70 : 80;
            
            $('html, body').animate({
                scrollTop: target.offset().top - offset
            }, 800);
        }
    });
}

// ================================================
// 11. ACTIVE NAV LINKS
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
// 12. COUNTERS
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
// 13. SKILL BARS
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
                
                $this.animate({ width: progress + '%' }, 1500);
            });
        }
    });
}

// ================================================
// 14. CODE COPY BUTTONS
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
            zIndex: 10
        });
        
        $codeBlock.css('position', 'relative').append($copyBtn);
        
        $copyBtn.on('click touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const code = $codeBlock.find('code').text();
            
            navigator.clipboard.writeText(code).then(function() {
                $copyBtn.html('<i class="fas fa-check"></i> Copied!')
                       .css('background', '#10b981');
                
                setTimeout(function() {
                    $copyBtn.html('<i class="fas fa-copy"></i> Copy')
                           .css('background', 'rgba(255, 255, 255, 0.1)');
                }, 2000);
            });
        });
    });
}

// ================================================
// 15. NOTIFICATION SYSTEM
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
        right: '-300px',
        background: bgColor,
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 10000,
        fontWeight: '500'
    });
    
    $('body').append($notification);
    
    // Slide in
    $notification.animate({ right: '30px' }, 300);
    
    // Remove after 4 seconds
    setTimeout(function() {
        $notification.animate({ right: '-300px' }, 300, function() {
            $(this).remove();
        });
    }, 4000);
}

// ================================================
// UTILITY FUNCTIONS
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
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ================================================
// KEYBOARD SHORTCUTS
// ================================================
$(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
        $('#hamburger').removeClass('active');
        $('#navMenu').removeClass('active');
        $('body').css({
            'overflow': 'auto',
            'position': 'relative',
            'height': 'auto'
        });
    }
});

// ================================================
// CONSOLE WELCOME
// ================================================
console.log('%c🚀 Portfolio Loaded Successfully!', 'background: #667eea; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c✅ Mobile menu fixed', 'color: #10b981; font-weight: bold;');
console.log('%c✅ Contact button fixed', 'color: #10b981; font-weight: bold;');