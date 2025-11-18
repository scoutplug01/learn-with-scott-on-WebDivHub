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
        spaceBetween: 2,
        centeredSlides: false,
        
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

// ================================================
// LOCALSTORAGE SYSTEM - TRACK ALL USER ACTIVITY
// Add this to your script.js file
// ================================================

// ================================================
// 1. LOCALSTORAGE MANAGER
// ================================================

const StorageManager = {
    // Keys for different data types
    keys: {
        messages: 'novalanding_messages',
        subscriptions: 'novalanding_subscriptions',
        planSelections: 'novalanding_plans',
        searches: 'novalanding_searches',
        videoViews: 'novalanding_videos',
        visitors: 'novalanding_visitors'
    },
    
    // Save data
    save: function(key, data) {
        try {
            const existing = this.get(key) || [];
            existing.push({
                ...data,
                id: Date.now(),
                timestamp: new Date().toISOString(),
                date: new Date().toLocaleString()
            });
            localStorage.setItem(key, JSON.stringify(existing));
            console.log('✅ Saved to localStorage:', key);
            return true;
        } catch (e) {
            console.error('❌ Error saving to localStorage:', e);
            return false;
        }
    },
    
    // Get data
    get: function(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('❌ Error reading from localStorage:', e);
            return [];
        }
    },
    
    // Get all data
    getAll: function() {
        return {
            messages: this.get(this.keys.messages),
            subscriptions: this.get(this.keys.subscriptions),
            planSelections: this.get(this.keys.planSelections),
            searches: this.get(this.keys.searches),
            videoViews: this.get(this.keys.videoViews),
            visitors: this.get(this.keys.visitors)
        };
    },
    
    // Clear specific data
    clear: function(key) {
        localStorage.removeItem(key);
        console.log('🗑️ Cleared:', key);
    },
    
    // Clear all data
    clearAll: function() {
        Object.values(this.keys).forEach(key => {
            localStorage.removeItem(key);
        });
        console.log('🗑️ All data cleared');
    },
    
    // Export data as JSON
    export: function() {
        return JSON.stringify(this.getAll(), null, 2);
    }
};

// ================================================
// 2. TRACK VISITOR INFO
// ================================================

function trackVisitor() {
    const visitorInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        referrer: document.referrer || 'Direct',
        platform: navigator.platform,
        visitTime: new Date().toLocaleString()
    };
    
    StorageManager.save(StorageManager.keys.visitors, visitorInfo);
}

// ================================================
// 3. TRACK CONTACT FORM SUBMISSIONS
// ================================================

function trackContactSubmission(email, additionalData = {}) {
    const messageData = {
        email: email,
        name: additionalData.name || 'Not provided',
        subject: additionalData.subject || 'Contact Form',
        message: additionalData.message || 'Subscription',
        source: additionalData.source || 'CTA Form',
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    };
    
    StorageManager.save(StorageManager.keys.messages, messageData);
    console.log('📧 Contact tracked:', email);
}

// ================================================
// 4. TRACK SUBSCRIPTIONS
// ================================================

function trackSubscription(email) {
    const subscriptionData = {
        email: email,
        status: 'Subscribed',
        source: 'Newsletter',
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    };
    
    StorageManager.save(StorageManager.keys.subscriptions, subscriptionData);
    console.log('📰 Subscription tracked:', email);
}

// ================================================
// 5. TRACK PLAN SELECTIONS
// ================================================

function trackPlanSelection(planName, price) {
    const planData = {
        plan: planName,
        price: price,
        status: 'Interested',
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    };
    
    StorageManager.save(StorageManager.keys.planSelections, planData);
    console.log('💎 Plan selection tracked:', planName);
}

// ================================================
// 6. TRACK SEARCHES
// ================================================

function trackSearch(query, resultsCount) {
    const searchData = {
        query: query,
        resultsCount: resultsCount,
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    };
    
    StorageManager.save(StorageManager.keys.searches, searchData);
}

// ================================================
// 7. TRACK VIDEO VIEWS
// ================================================

function trackVideoView() {
    const videoData = {
        video: 'Product Demo',
        action: 'Watched',
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    };
    
    StorageManager.save(StorageManager.keys.videoViews, videoData);
    console.log('🎬 Video view tracked');
}

// ================================================
// 8. INITIALIZE TRACKING
// ================================================

function initTracking() {
    // Track visitor on page load
    trackVisitor();
    
    // Update form submission tracking
    $('#ctaForm').on('submit', function(e) {
        e.preventDefault();
        
        const email = $('#emailInput').val().trim();
        
        if (isValidEmail(email)) {
            // Track the submission
            trackContactSubmission(email, {
                source: 'CTA Form - Main Page',
                message: 'Free trial signup'
            });
            
            // Continue with original form logic
            const $submitBtn = $(this).find('button[type="submit"]');
            const originalText = $submitBtn.html();
            
            $submitBtn.prop('disabled', true)
                      .html('<i class="fas fa-spinner fa-spin"></i> Processing...');
            
            setTimeout(function() {
                $('#ctaForm')[0].reset();
                
                $submitBtn.prop('disabled', false)
                          .html(originalText);
                
                showToast('Welcome aboard! Check your email 🎉', 'success');
                
                addNotification(
                    '🎉 Welcome Aboard!',
                    'Thank you for subscribing! Check your email.',
                    'success'
                );
            }, 2000);
        }
    });
    
    // Track pricing button clicks
    $('.btn-pricing').on('click', function(e) {
        e.preventDefault();
        
        const $card = $(this).closest('.pricing-card');
        const planName = $card.find('h3').text();
        const priceText = $card.find('.price').text();
        
        trackPlanSelection(planName, priceText);
        
        addNotification(
            '💎 Plan Selected',
            `Great choice! You selected the ${planName} plan.`,
            'success'
        );
        
        $('html, body').animate({
            scrollTop: $('#contact').offset().top - 80
        }, 800);
    });
    
    // Track video views
    $('.btn-outline').on('click', function() {
        const btnText = $(this).text().toLowerCase();
        if (btnText.includes('watch') || btnText.includes('demo')) {
            trackVideoView();
        }
    });
    
    // Track searches
    let lastSearchQuery = '';
    $('#searchInput').on('input', function() {
        const query = $(this).val().trim();
        if (query && query !== lastSearchQuery) {
            lastSearchQuery = query;
            const resultsCount = $('#searchResults .search-result-item').length;
            trackSearch(query, resultsCount);
        }
    });
    
    console.log('✅ Tracking initialized');
}

// ================================================
// 9. ADMIN DASHBOARD VIEW
// ================================================

function openAdminDashboard() {
    const allData = StorageManager.getAll();
    
    // Create dashboard HTML
    const dashboardHTML = `
        <div id="adminDashboard" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 99999; overflow-y: auto; padding: 2rem;">
            <div style="max-width: 1200px; margin: 0 auto; background: white; border-radius: 20px; padding: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1rem;">
                    <h1 style="margin: 0; color: #0f172a;">📊 Admin Dashboard</h1>
                    <div style="display: flex; gap: 1rem;">
                        <button onclick="exportData()" style="background: #10b981; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-download"></i> Export Data
                        </button>
                        <button onclick="clearAllData()" style="background: #ef4444; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-trash"></i> Clear All
                        </button>
                        <button onclick="closeAdminDashboard()" style="background: #6366f1; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-times"></i> Close
                        </button>
                    </div>
                </div>
                
                <!-- Stats Cards -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <div style="font-size: 2.5rem; font-weight: 800;">${allData.messages.length}</div>
                        <div style="opacity: 0.9;">Messages</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <div style="font-size: 2.5rem; font-weight: 800;">${allData.subscriptions.length}</div>
                        <div style="opacity: 0.9;">Subscriptions</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <div style="font-size: 2.5rem; font-weight: 800;">${allData.planSelections.length}</div>
                        <div style="opacity: 0.9;">Plan Selections</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #fa709a, #fee140); color: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <div style="font-size: 2.5rem; font-weight: 800;">${allData.visitors.length}</div>
                        <div style="opacity: 0.9;">Visitors</div>
                    </div>
                </div>
                
                <!-- Data Tables -->
                ${generateDataTable('📧 Messages', allData.messages)}
                ${generateDataTable('📰 Subscriptions', allData.subscriptions)}
                ${generateDataTable('💎 Plan Selections', allData.planSelections)}
                ${generateDataTable('🔍 Searches', allData.searches)}
                ${generateDataTable('🎬 Video Views', allData.videoViews)}
                ${generateDataTable('👥 Visitors', allData.visitors)}
            </div>
        </div>
    `;
    
    $('body').append(dashboardHTML);
}

function generateDataTable(title, data) {
    if (!data || data.length === 0) {
        return `
            <div style="margin-bottom: 2rem;">
                <h2 style="color: #0f172a; margin-bottom: 1rem;">${title}</h2>
                <p style="color: #64748b; padding: 2rem; background: #f8fafc; border-radius: 10px; text-align: center;">No data yet</p>
            </div>
        `;
    }
    
    const headers = Object.keys(data[0]).filter(key => key !== 'id');
    
    return `
        <div style="margin-bottom: 2rem;">
            <h2 style="color: #0f172a; margin-bottom: 1rem;">${title} (${data.length})</h2>
            <div style="overflow-x: auto; background: #f8fafc; border-radius: 10px; padding: 1rem;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #e2e8f0;">
                            ${headers.map(header => `<th style="padding: 1rem; text-align: left; font-weight: 600; color: #0f172a; text-transform: capitalize;">${header}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(item => `
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                ${headers.map(header => `<td style="padding: 1rem; color: #64748b;">${item[header] || 'N/A'}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function closeAdminDashboard() {
    $('#adminDashboard').remove();
}

function exportData() {
    const data = StorageManager.export();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `novalanding-data-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Data exported successfully!', 'success');
}

function clearAllData() {
    if (confirm('Are you sure you want to clear ALL data? This cannot be undone!')) {
        StorageManager.clearAll();
        closeAdminDashboard();
        showToast('All data cleared!', 'success');
    }
}

// ================================================
// 10. SECRET ADMIN ACCESS
// ================================================

// Press Ctrl+Shift+A to open admin dashboard
$(document).on('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        openAdminDashboard();
    }
});

// Or add a hidden button (optional)
function addAdminButton() {
    const $adminBtn = $(`
        <button id="adminAccessBtn" style="
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            z-index: 998;
            display: none;
        ">
            <i class="fas fa-chart-bar"></i>
        </button>
    `);
    
    $adminBtn.on('click', openAdminDashboard);
    $('body').append($adminBtn);
    
    // Show button after 3 clicks on logo
    let clickCount = 0;
    $('.navbar-brand').on('click', function() {
        clickCount++;
        if (clickCount >= 3) {
            $adminBtn.fadeIn();
            showToast('Admin access unlocked!', 'success');
        }
    });
}

// ================================================
// 11. INITIALIZE EVERYTHING
// ================================================

$(document).ready(function() {
    // Add this to your existing $(document).ready()
    initTracking();
    addAdminButton();
    
    console.log('✅ LocalStorage tracking active');
    console.log('💡 Press Ctrl+Shift+A to view admin dashboard');
    console.log('💡 Or click logo 3 times to unlock admin button');
});

// Make functions globally accessible
window.StorageManager = StorageManager;
window.openAdminDashboard = openAdminDashboard;
window.closeAdminDashboard = closeAdminDashboard;
window.exportData = exportData;
window.clearAllData = clearAllData;