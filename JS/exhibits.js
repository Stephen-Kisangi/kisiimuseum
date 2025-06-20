// Exhibits Page JavaScript for Kisii Wildlife & Cultural Museum

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
            const exhibitsSection = document.getElementById("exhibits");
            if (exhibitsSection) {
                const offsetTop = exhibitsSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        });
    }

    // Filter functionality
    const filterButtons = document.querySelectorAll(".filter-btn");
    const exhibitItems = document.querySelectorAll(".exhibit-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            const filter = this.getAttribute("data-filter");
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            
            // Filter exhibits
            exhibitItems.forEach(item => {
                if (filter === "all" || item.classList.contains(filter)) {
                    item.style.display = "block";
                    item.style.animation = "fadeInUp 0.6s ease-out";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    // Exhibit modal data
    const exhibitData = {
        mammals: {
            title: "African Wildlife - Mammals",
            image: "exhibit_mammal.jpg",
            content: `
                <div class="exhibit-category mb-3">
                    <i class="fas fa-paw me-2"></i>
                    <span>Mammals</span>
                </div>
                <h4 class="mb-3">African Wildlife Collection</h4>
                <p class="mb-3">Our mammal exhibit showcases the incredible diversity of African wildlife, featuring both large and small species that call the African continent home.</p>
                
                <h6>Featured Species:</h6>
                <ul class="mb-3">
                    <li><strong>Primates:</strong> Various monkey species and their social behaviors</li>
                    <li><strong>Herbivores:</strong> Antelopes, zebras, and grazing animals</li>
                    <li><strong>Carnivores:</strong> Information about African predators</li>
                    <li><strong>Small Mammals:</strong> Rodents and other small African mammals</li>
                </ul>
                
                <h6>Educational Features:</h6>
                <ul class="mb-3">
                    <li>Interactive habitat displays</li>
                    <li>Feeding behavior demonstrations</li>
                    <li>Conservation status information</li>
                    <li>Audio recordings of animal sounds</li>
                </ul>
                
                <div class="exhibit-stats mt-4">
                    <div class="row">
                        <div class="col-6">
                            <strong>Species Count:</strong> 15+
                        </div>
                        <div class="col-6">
                            <strong>Tour Duration:</strong> 45 minutes
                        </div>
                    </div>
                </div>
            `
        },
        birds: {
            title: "Avian Paradise - Birds",
            image: "exhibit_bird.jpg",
            content: `
                <div class="exhibit-category mb-3">
                    <i class="fas fa-feather-alt me-2"></i>
                    <span>Birds</span>
                </div>
                <h4 class="mb-3">Avian Paradise Collection</h4>
                <p class="mb-3">Experience the colorful and diverse world of birds, from tiny songbirds to magnificent raptors, each with unique adaptations and behaviors.</p>
                
                <h6>Featured Species:</h6>
                <ul class="mb-3">
                    <li><strong>Songbirds:</strong> Colorful species with beautiful melodies</li>
                    <li><strong>Raptors:</strong> Birds of prey and their hunting adaptations</li>
                    <li><strong>Water Birds:</strong> Species adapted to aquatic environments</li>
                    <li><strong>Tropical Birds:</strong> Exotic species with vibrant plumage</li>
                </ul>
                
                <h6>Interactive Experiences:</h6>
                <ul class="mb-3">
                    <li>Bird song identification stations</li>
                    <li>Flight pattern demonstrations</li>
                    <li>Nest building displays</li>
                    <li>Migration route mapping</li>
                </ul>
                
                <div class="exhibit-stats mt-4">
                    <div class="row">
                        <div class="col-6">
                            <strong>Species Count:</strong> 25+
                        </div>
                        <div class="col-6">
                            <strong>Tour Duration:</strong> 30 minutes
                        </div>
                    </div>
                </div>
            `
        },
        reptiles: {
            title: "Reptilian World - Reptiles",
            image: "exhibit_reptile.jpg",
            content: `
                <div class="exhibit-category mb-3">
                    <i class="fas fa-dragon me-2"></i>
                    <span>Reptiles</span>
                </div>
                <h4 class="mb-3">Reptilian World Collection</h4>
                <p class="mb-3">Discover the fascinating world of cold-blooded creatures, from tiny geckos to large monitor lizards, each perfectly adapted to their environment.</p>
                
                <h6>Featured Species:</h6>
                <ul class="mb-3">
                    <li><strong>Lizards:</strong> Various gecko and monitor species</li>
                    <li><strong>Turtles:</strong> Land and aquatic turtle species</li>
                    <li><strong>Iguanas:</strong> Large herbivorous lizards</li>
                    <li><strong>Chameleons:</strong> Color-changing specialists</li>
                </ul>
                
                <h6>Educational Highlights:</h6>
                <ul class="mb-3">
                    <li>Thermoregulation demonstrations</li>
                    <li>Shedding process exhibits</li>
                    <li>Habitat recreation displays</li>
                    <li>Conservation awareness programs</li>
                </ul>
                
                <div class="exhibit-stats mt-4">
                    <div class="row">
                        <div class="col-6">
                            <strong>Species Count:</strong> 12+
                        </div>
                        <div class="col-6">
                            <strong>Tour Duration:</strong> 35 minutes
                        </div>
                    </div>
                </div>
            `
        },
        snakes: {
            title: "Serpent Sanctuary - Snakes",
            image: "exhibit_snake.jpg",
            content: `
                <div class="exhibit-category mb-3">
                    <i class="fas fa-snake me-2"></i>
                    <span>Snakes</span>
                </div>
                <h4 class="mb-3">Serpent Sanctuary Collection</h4>
                <p class="mb-3">Our premier snake exhibit features both venomous and non-venomous species from around the world, showcasing their incredible diversity and ecological importance.</p>
                
                <h6>Featured Species:</h6>
                <ul class="mb-3">
                    <li><strong>Pythons:</strong> Large constrictor species</li>
                    <li><strong>Vipers:</strong> Venomous species (safely displayed)</li>
                    <li><strong>Colubrids:</strong> Common snake families</li>
                    <li><strong>Boas:</strong> New World constrictors</li>
                </ul>
                
                <h6>Special Features:</h6>
                <ul class="mb-3">
                    <li>Live feeding demonstrations (scheduled)</li>
                    <li>Venom extraction education</li>
                    <li>Snake handling safety presentations</li>
                    <li>Myth vs. reality educational displays</li>
                </ul>
                
                <div class="alert alert-warning mt-3">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    <strong>Safety Note:</strong> All venomous species are securely housed with multiple safety protocols.
                </div>
                
                <div class="exhibit-stats mt-4">
                    <div class="row">
                        <div class="col-6">
                            <strong>Species Count:</strong> 20+
                        </div>
                        <div class="col-6">
                            <strong>Tour Duration:</strong> 50 minutes
                        </div>
                    </div>
                </div>
            `
        },
        insects: {
            title: "Insect Kingdom - Insects",
            image: "exhibit_insect.jpg",
            content: `
                <div class="exhibit-category mb-3">
                    <i class="fas fa-bug me-2"></i>
                    <span>Insects</span>
                </div>
                <h4 class="mb-3">Insect Kingdom Collection</h4>
                <p class="mb-3">Explore the miniature world of insects, the most diverse group of animals on Earth, showcasing their incredible adaptations and ecological roles.</p>
                
                <h6>Featured Species:</h6>
                <ul class="mb-3">
                    <li><strong>Butterflies:</strong> Colorful lepidoptera in flight enclosures</li>
                    <li><strong>Beetles:</strong> Diverse coleoptera specimens</li>
                    <li><strong>Ants:</strong> Live colony observations</li>
                    <li><strong>Bees:</strong> Pollinator importance displays</li>
                </ul>
                
                <h6>Interactive Elements:</h6>
                <ul class="mb-3">
                    <li>Magnification stations for close observation</li>
                    <li>Metamorphosis lifecycle displays</li>
                    <li>Pollination garden demonstrations</li>
                    <li>Insect sound identification</li>
                </ul>
                
                <div class="alert alert-info mt-3">
                    <i class="fas fa-info-circle me-2"></i>
                    <strong>Did you know?</strong> Insects make up over 80% of all animal species on Earth!
                </div>
                
                <div class="exhibit-stats mt-4">
                    <div class="row">
                        <div class="col-6">
                            <strong>Species Count:</strong> 50+
                        </div>
                        <div class="col-6">
                            <strong>Tour Duration:</strong> 25 minutes
                        </div>
                    </div>
                </div>
            `
        },
        fossils: {
            title: "Prehistoric Gallery - Fossils",
            image: "exhibit_fossil.jpg",
            content: `
                <div class="exhibit-category mb-3">
                    <i class="fas fa-bone me-2"></i>
                    <span>Fossils</span>
                </div>
                <h4 class="mb-3">Prehistoric Gallery Collection</h4>
                <p class="mb-3">Journey through millions of years of evolutionary history with our extensive fossil collection, showcasing ancient life forms and the story of life on Earth.</p>
                
                <h6>Featured Specimens:</h6>
                <ul class="mb-3">
                    <li><strong>Dinosaur Fossils:</strong> Various species from different periods</li>
                    <li><strong>Marine Fossils:</strong> Ancient sea creatures and shells</li>
                    <li><strong>Plant Fossils:</strong> Prehistoric flora specimens</li>
                    <li><strong>Mammal Fossils:</strong> Early mammalian ancestors</li>
                </ul>
                
                <h6>Educational Features:</h6>
                <ul class="mb-3">
                    <li>Geological timeline displays</li>
                    <li>Fossil formation process exhibits</li>
                    <li>Paleontology tools demonstration</li>
                    <li>Evolution and extinction explanations</li>
                </ul>
                
                <div class="alert alert-success mt-3">
                    <i class="fas fa-star me-2"></i>
                    <strong>New Addition:</strong> Recently acquired Cretaceous period specimens!
                </div>
                
                <div class="exhibit-stats mt-4">
                    <div class="row">
                        <div class="col-6">
                            <strong>Specimens:</strong> 30+
                        </div>
                        <div class="col-6">
                            <strong>Tour Duration:</strong> 40 minutes
                        </div>
                    </div>
                </div>
            `
        }
    };

    // Global function to open exhibit modal
    window.openExhibitModal = function(exhibitType) {
        const data = exhibitData[exhibitType];
        if (!data) return;

        const modal = new bootstrap.Modal(document.getElementById('exhibitModal'));
        const modalTitle = document.getElementById('modalTitle');
        const modalImage = document.getElementById('modalImage');
        const modalContent = document.getElementById('modalContent');

        modalTitle.textContent = data.title;
        modalImage.src = data.image;
        modalImage.alt = data.title;
        modalContent.innerHTML = data.content;

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

    // Exhibit card hover effects
    const exhibitCards = document.querySelectorAll(".exhibit-card");
    
    exhibitCards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-10px) scale(1.02)";
        });
        
        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0) scale(1)";
        });
    });

    // Featured card animations
    const featuredCards = document.querySelectorAll(".featured-card");
    
    featuredCards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-5px) scale(1.01)";
        });
        
        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0) scale(1)";
        });
    });

    // Visit card hover effects
    const visitCards = document.querySelectorAll(".visit-card");
    
    visitCards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-5px)";
            this.style.background = "rgba(255, 255, 255, 0.15)";
        });
        
        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
            this.style.background = "rgba(255, 255, 255, 0.1)";
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector(".newsletter-form");
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector("input[type='email']");
        const submitBtn = newsletterForm.querySelector(".btn");
        
        submitBtn.addEventListener("click", function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate subscription
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                submitBtn.style.background = "#28a745";
                emailInput.value = "";
                
                setTimeout(() => {
                    submitBtn.innerHTML = "Subscribe";
                    submitBtn.style.background = "";
                }, 3000);
            } else {
                emailInput.style.borderColor = "#dc3545";
                setTimeout(() => {
                    emailInput.style.borderColor = "";
                }, 2000);
            }
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement("button");
    scrollToTopBtn.innerHTML = "<i class='fas fa-arrow-up'></i>";
    scrollToTopBtn.className = "scroll-to-top";
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener("scroll", function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add("visible");
        } else {
            scrollToTopBtn.classList.remove("visible");
        }
    });
    
    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Loading screen
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "loading-overlay";
    loadingOverlay.innerHTML = `
        <div class="text-center text-white">
            <div class="loading-spinner mb-3"></div>
            <h5>Loading Exhibits...</h5>
            <p>Preparing your wildlife experience</p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Hide loading screen after page load
    window.addEventListener("load", function() {
        setTimeout(() => {
            loadingOverlay.classList.add("hidden");
            setTimeout(() => {
                if (loadingOverlay.parentElement) {
                    document.body.removeChild(loadingOverlay);
                }
            }, 500);
        }, 1000);
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Observe exhibit items for stagger animation
    exhibitItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Search functionality (if search input exists)
    const searchInput = document.querySelector("#exhibitSearch");
    if (searchInput) {
        searchInput.addEventListener("input", function() {
            const searchTerm = this.value.toLowerCase();
            
            exhibitItems.forEach(item => {
                const title = item.querySelector("h5").textContent.toLowerCase();
                const description = item.querySelector("p").textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    }

    // Keyboard navigation support
    document.addEventListener("keydown", function(e) {
        // Press 'E' to go to exhibits section
        if (e.key.toLowerCase() === 'e') {
            const exhibitsSection = document.getElementById("exhibits");
            if (exhibitsSection) {
                exhibitsSection.scrollIntoView({ behavior: "smooth" });
            }
        }
        
        // Press 'F' to go to featured section
        if (e.key.toLowerCase() === 'f') {
            const featuredSection = document.getElementById("featured");
            if (featuredSection) {
                featuredSection.scrollIntoView({ behavior: "smooth" });
            }
        }
        
        // Press 'V' to go to visit section
        if (e.key.toLowerCase() === 'v') {
            const visitSection = document.getElementById("visit");
            if (visitSection) {
                visitSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    });

    // Add accessibility improvements
    const interactiveElements = document.querySelectorAll(".exhibit-card, .featured-card, .visit-card, .filter-btn");
    
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

    // Dynamic content loading simulation
    function loadExhibitStats() {
        const statElements = document.querySelectorAll(".exhibit-stats span");
        
        statElements.forEach(stat => {
            const icon = stat.querySelector("i");
            if (icon) {
                icon.style.animation = "pulse 2s infinite";
            }
        });
    }

    // Initialize stats animation
    setTimeout(loadExhibitStats, 2000);

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll("img");
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute("data-src");
                }
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });

    // Add smooth transitions to all interactive elements
    const allInteractiveElements = document.querySelectorAll("button, .btn, .card, .nav-link");
    allInteractiveElements.forEach(element => {
        element.style.transition = "all 0.3s ease";
    });

    console.log("Exhibits page loaded successfully!");
});

