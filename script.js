<<<<<<< HEAD
// ================================================
// PROFESSIONAL PORTFOLIO - JAVASCRIPT
// ================================================

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
=======
// ================================================
// PROFESSIONAL PORTFOLIO - JAVASCRIPT
// ================================================

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
>>>>>>> 6775aa72debf7324700643818dfd74f70003978d
// ================================================