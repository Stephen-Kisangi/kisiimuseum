// Culture Page JavaScript for Kisii Wildlife & Cultural Museum

document.addEventListener("DOMContentLoaded", function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        offset: 100,
        delay: 100
    });

    // Navbar scroll effect
    const navbar = document.getElementById("mainNav");
    
    window.addEventListener("scroll", function() {
        if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll(".nav-link[href^='#']");
    
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll indicator click
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
        scrollIndicator.addEventListener("click", function() {
            const overviewSection = document.getElementById("overview");
            if (overviewSection) {
                const offsetTop = overviewSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        });
    }

    // Gallery modal functionality
    window.openGalleryModal = function(imageSrc, title, description) {
        const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
        const modalImage = document.getElementById('galleryModalImage');
        const modalTitle = document.getElementById('galleryModalTitle');
        const modalDescription = document.getElementById('galleryModalDescription');
        
        modalImage.src = imageSrc;
        modalImage.alt = title;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        modal.show();
    };

    // Parallax effect for hero section
    window.addEventListener("scroll", function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector(".hero-section");
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Counter animation for statistics
    function animateCounters() {
        const counters = document.querySelectorAll(".stat-number");
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format the number with appropriate suffix
                let displayValue = Math.floor(current);
                if (counter.textContent.includes('M')) {
                    displayValue = (displayValue / 1000000).toFixed(1) + 'M';
                } else if (counter.textContent.includes('K')) {
                    displayValue = (displayValue / 1000).toFixed(0) + 'K';
                } else if (counter.textContent.includes('+')) {
                    displayValue = displayValue + '+';
                }
                
                counter.textContent = displayValue;
            }, 20);
        });
    }

    // Intersection Observer for counter animation
    const statsSection = document.querySelector(".culture-stats");
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Timeline item hover effects
    const timelineItems = document.querySelectorAll(".timeline-item");
    
    timelineItems.forEach(item => {
        const content = item.querySelector(".timeline-content");
        const marker = item.querySelector(".timeline-marker");
        
        item.addEventListener("mouseenter", function() {
            marker.style.transform = "translateX(-50%) scale(1.2)";
            content.style.borderLeft = "4px solid var(--accent-color)";
        });
        
        item.addEventListener("mouseleave", function() {
            marker.style.transform = "translateX(-50%) scale(1)";
            content.style.borderLeft = "none";
        });
    });

    // Gallery item click effects
    const galleryItems = document.querySelectorAll(".gallery-item");
    
    galleryItems.forEach(item => {
        item.addEventListener("click", function() {
            // Add click animation
            this.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.style.transform = "scale(1)";
            }, 150);
        });
    });

    // Practice cards hover sound effect (visual feedback)
    const practiceCards = document.querySelectorAll(".practice-card");
    
    practiceCards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            const icon = this.querySelector(".practice-icon");
            icon.style.animation = "pulse 0.6s ease-in-out";
        });
        
        card.addEventListener("mouseleave", function() {
            const icon = this.querySelector(".practice-icon");
            icon.style.animation = "none";
        });
    });

    // Add pulse animation
    const style = document.createElement("style");
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Aspect cards stagger animation on scroll
    const aspectCards = document.querySelectorAll(".aspect-card");
    
    const aspectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 200);
                aspectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    aspectCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.6s ease";
        aspectObserver.observe(card);
    });

    // Mobile menu close on link click
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove("show");
            }
        });
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement("button");
    scrollToTopBtn.innerHTML = "<i class='fas fa-arrow-up'></i>";
    scrollToTopBtn.className = "scroll-to-top";
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
    
    window.addEventListener("scroll", function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = "1";
            scrollToTopBtn.style.visibility = "visible";
        } else {
            scrollToTopBtn.style.opacity = "0";
            scrollToTopBtn.style.visibility = "hidden";
        }
    });
    
    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll(".aspect-card, .practice-card, .stat-item");
    
    cards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-5px) scale(1.02)";
        });
        
        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0) scale(1)";
        });
    });

    // Image lazy loading with fade-in effect
    const images = document.querySelectorAll("img");
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = "0";
                img.style.transition = "opacity 0.6s ease";
                
                img.onload = function() {
                    this.style.opacity = "1";
                };
                
                // If image is already loaded
                if (img.complete) {
                    img.style.opacity = "1";
                }
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Dynamic text typing effect for hero subtitle
    const heroSubtitle = document.querySelector(".hero-subtitle");
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = "";
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after hero title animation
        setTimeout(typeWriter, 1000);
    }

    // Section visibility tracking for navigation
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".navbar-nav .nav-link");
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target.getAttribute("id");
                
                navItems.forEach(item => {
                    item.classList.remove("active");
                    if (item.getAttribute("href") === `#${currentSection}`) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Loading screen (optional)
    const loadingScreen = document.createElement("div");
    loadingScreen.id = "loading-screen";
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Loading Kisii Culture...</p>
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
    
    const loadingContent = loadingScreen.querySelector(".loading-content");
    loadingContent.style.cssText = `
        text-align: center;
        color: white;
    `;
    
    const spinner = loadingScreen.querySelector(".loading-spinner");
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
    const spinnerStyle = document.createElement("style");
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
    window.addEventListener("load", function() {
        setTimeout(() => {
            loadingScreen.style.opacity = "0";
            setTimeout(() => {
                if (loadingScreen.parentElement) {
                    document.body.removeChild(loadingScreen);
                }
            }, 500);
        }, 800);
    });

    // Interactive cultural facts tooltip
    const culturalElements = document.querySelectorAll(".aspect-card, .practice-card");
    
    culturalElements.forEach(element => {
        element.addEventListener("click", function() {
            // Create a temporary highlight effect
            const originalBorder = this.style.border;
            this.style.border = "3px solid var(--accent-color)";
            this.style.boxShadow = "0 0 20px rgba(212, 165, 116, 0.5)";
            
            setTimeout(() => {
                this.style.border = originalBorder;
                this.style.boxShadow = "";
            }, 2000);
        });
    });

    // Keyboard navigation support
    document.addEventListener("keydown", function(e) {
        // Press 'H' to go to hero section
        if (e.key.toLowerCase() === 'h') {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        
        // Press 'G' to go to gallery
        if (e.key.toLowerCase() === 'g') {
            const gallery = document.getElementById("gallery");
            if (gallery) {
                gallery.scrollIntoView({ behavior: "smooth" });
            }
        }
        
        // Press 'T' to go to timeline
        if (e.key.toLowerCase() === 't') {
            const timeline = document.getElementById("timeline");
            if (timeline) {
                timeline.scrollIntoView({ behavior: "smooth" });
            }
        }
    });

    // Add accessibility improvements
    const interactiveElements = document.querySelectorAll(".gallery-item, .aspect-card, .practice-card");
    
    interactiveElements.forEach(element => {
        // Add keyboard support
        element.setAttribute("tabindex", "0");
        
        element.addEventListener("keydown", function(e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add focus styles
        element.addEventListener("focus", function() {
            this.style.outline = "3px solid var(--accent-color)";
            this.style.outlineOffset = "2px";
        });
        
        element.addEventListener("blur", function() {
            this.style.outline = "none";
        });
    });

    console.log("Kisii Culture page loaded successfully!");
});

