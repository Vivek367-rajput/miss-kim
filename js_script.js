// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
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

// ===== FAQ Toggle =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        // Close other open FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').classList.remove('show');
            }
        });

        // Toggle current FAQ
        item.classList.toggle('active');
        answer.classList.toggle('show');
    });
});

// ===== Modal Functionality =====
const inviteButton = document.querySelector('a[href="#invite"]');
const inviteModal = document.getElementById('inviteModal');
const closeBtn = document.querySelector('.close');

if (inviteButton) {
    inviteButton.addEventListener('click', (e) => {
        e.preventDefault();
        inviteModal.style.display = 'block';
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        inviteModal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === inviteModal) {
        inviteModal.style.display = 'none';
    }
});

// ===== Contact Form Submission =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Validate form
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Observe command categories
document.querySelectorAll('.command-category').forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    category.style.transition = 'all 0.6s ease';
    observer.observe(category);
});

// Observe stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Observe testimonial cards
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Hamburger Animation =====
hamburger.addEventListener('click', function() {
    const spans = this.querySelectorAll('span');
    spans[0].style.transform = this.classList.contains('active') 
        ? 'rotate(45deg) translate(8px, 8px)' 
        : 'rotate(0) translate(0, 0)';
    spans[1].style.opacity = this.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = this.classList.contains('active') 
        ? 'rotate(-45deg) translate(8px, -8px)' 
        : 'rotate(0) translate(0, 0)';
});

// ===== Number Counter Animation =====
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const runCounter = (counter) => {
    const target = +counter.innerText.replace(/\D/g, '');
    const increment = target / speed;

    const updateCount = () => {
        const count = +counter.innerText.replace(/\D/g, '');
        if (count < target) {
            counter.innerText = Math.ceil(count + increment) + (counter.innerText.includes('+') ? '+' : (counter.innerText.includes('%') ? '%' : 'K+'));
            setTimeout(updateCount, 10);
        }
    };

    updateCount();
};

const statsSection = document.querySelector('.stats');
if (statsSection) {
    let counted = false;

    observer.observe(statsSection);

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => runCounter(counter));
            }
        });
    }, observerOptions);

    statsObserver.observe(statsSection);
}

// ===== Add active style to nav links on scroll =====
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            link.style.borderBottom = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--primary-color)';
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
});

// ===== Prevent Default Invite Link Behavior =====
document.addEventListener('DOMContentLoaded', function() {
    const inviteLink = document.querySelector('a[href="#invite"]');
    if (inviteLink) {
        inviteLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('inviteModal').style.display = 'block';
        });
    }
});

// ===== Console Easter Egg =====
console.log('%c🤖 Welcome to AwesomeBot!', 'font-size: 20px; color: #7c3aed; font-weight: bold;');
console.log('%cCheck out our source code and contribute on GitHub: https://github.com/awesomebot', 'font-size: 14px; color: #ec4899;');