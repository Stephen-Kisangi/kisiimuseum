// Contact Page JavaScript for Kisii Wildlife & Cultural Museum

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (validateContactForm(data)) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            contactForm.classList.add('was-validated');
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });

    // Appointment Form Handling
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentModal = new bootstrap.Modal(document.getElementById('appointmentModal'));
    const bookAppointmentBtn = document.getElementById('bookAppointmentBtn');
    
    // Set minimum date to today
    const dateInput = document.getElementById('apptDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    bookAppointmentBtn.addEventListener('click', function() {
        appointmentModal.show();
    });
    
// Update the contact page to use the new API
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Update the appointment form submission to use the new API
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(appointmentForm);
        const data = Object.fromEntries(formData);
        
        // Validate appointment form
        if (validateAppointmentForm(data)) {
            // Show loading state
            const submitBtn = appointmentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Booking...';
            submitBtn.disabled = true;
            
            // Submit to the new API
            fetch('http://localhost/museum/backend/api/appointments.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    appointment_date: data.date,
                    appointment_time: data.time,
                    appointment_type: data.type,
                    guests: parseInt(data.guests),
                    notes: data.notes || ''
                })
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    showNotification(`Appointment booked successfully! Your confirmation code is: ${result.confirmation_code}`, 'success');
                    appointmentForm.reset();
                    appointmentForm.classList.remove('was-validated');
                    appointmentModal.hide();
                } else {
                    showNotification(result.message || 'Failed to book appointment', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Connection error. Please try again.', 'error');
            })
            .finally(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        } else {
            appointmentForm.classList.add('was-validated');
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });

    // ... rest of existing code ...
});

    // Form validation functions
    function validateContactForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return data.firstName && 
               data.lastName && 
               data.email && 
               emailRegex.test(data.email) && 
               data.subject && 
               data.message;
    }
    
    function validateAppointmentForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        
        return data.firstName && 
               data.lastName && 
               data.email && 
               emailRegex.test(data.email) && 
               data.phone && 
               phoneRegex.test(data.phone.replace(/\s/g, '')) && 
               data.date && 
               data.time && 
               data.type && 
               data.guests && 
               parseInt(data.guests) > 0;
    }

    // Store appointment data in localStorage (for dashboard simulation)
    function storeAppointment(data) {
        let appointments = JSON.parse(localStorage.getItem('museumAppointments')) || [];
        
        const appointment = {
            id: Date.now(),
            ...data,
            status: 'pending',
            createdAt: new Date().toISOString(),
            confirmationCode: generateConfirmationCode()
        };
        
        appointments.push(appointment);
        localStorage.setItem('museumAppointments', JSON.stringify(appointments));
        
        console.log('Appointment stored:', appointment);
    }
    
    function generateConfirmationCode() {
        return 'KWM-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('.input-group');
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const subscribeBtn = newsletterForm.querySelector('button');
    
    subscribeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showNotification('Please enter your email address.', 'error');
            return;
        }
        
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const originalText = subscribeBtn.innerHTML;
        subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        subscribeBtn.disabled = true;
        
        // Simulate subscription
        setTimeout(() => {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
            
            // Reset button
            subscribeBtn.innerHTML = originalText;
            subscribeBtn.disabled = false;
        }, 1500);
    });

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} me-2"></i>
                ${message}
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
            color: white;
            border-radius: 10px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 400px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
        `;
        
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            flex: 1;
            margin-right: 10px;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe elements for loading animations
    const animatedElements = document.querySelectorAll('.quick-contact-card, .info-card, .accordion-item');
    animatedElements.forEach(el => observer.observe(el));

    // Mobile menu close on link click
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.quick-contact-card, .info-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.startsWith('254')) {
                    value = '+' + value;
                } else if (!value.startsWith('+')) {
                    value = '+254' + value;
                }
            }
            e.target.value = value;
        });
    });

    // Real-time form validation
    const formInputs = document.querySelectorAll('.form-control, .form-select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            isValid = phoneRegex.test(value.replace(/\s/g, ''));
        }
        
        // Date validation (not in the past)
        if (field.type === 'date' && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            isValid = selectedDate >= today;
        }
        
        // Number validation
        if (field.type === 'number' && value) {
            const num = parseInt(value);
            isValid = num > 0 && num <= 50;
        }
        
        // Update field appearance
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
    }

    // WhatsApp link with pre-filled message
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const message = encodeURIComponent('Hello! I would like to inquire about visiting the Kisii Wildlife & Cultural Museum.');
            const href = this.getAttribute('href');
            if (!href.includes('text=')) {
                this.setAttribute('href', href + '?text=' + message);
            }
        });
    });

    // Loading screen (optional)
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Loading Contact Page...</p>
        </div>
    `;
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    const loadingContent = loadingScreen.querySelector('.loading-content');
    loadingContent.style.cssText = `
        text-align: center;
        color: white;
    `;
    
    const spinner = loadingScreen.querySelector('.loading-spinner');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255,255,255,0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    `;
    
    // Add spinner animation
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinnerStyle);
    
    // Show loading screen initially
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                if (loadingScreen.parentElement) {
                    document.body.removeChild(loadingScreen);
                }
            }, 500);
        }, 800);
    });

    console.log('Contact page loaded successfully!');
});

