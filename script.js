document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Scroll reveal animation
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        
        return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else if (elementOutofView(el)) {
                hideScrollElement(el);
            }
        });
    };
    
    // Initialize elements already in view
    handleScrollAnimation();
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Enhanced scroll reveal animation using Intersection Observer
    const appearOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Add staggered animation delay based on index
            const elements = Array.from(entry.target.parentElement.children);
            const index = elements.indexOf(entry.target);
            entry.target.style.animationDelay = `${index * 0.1}s`;
            
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    
    // Apply to all cards and elements that should animate in
    document.querySelectorAll('.feature-card, .solution-card, .service-card, .stat-item, .team-member, .achievement-item, .value-card, .timeline-item, .service-process-item').forEach(element => {
        element.classList.add('fade-in');
        appearOnScroll.observe(element);
    });
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinksList = document.querySelectorAll('.nav-links a');
    
    navLinksList.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Add smooth scrolling for same-page links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navLinks.classList && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.querySelector('.menu-toggle').classList.remove('active');
                }
            }
        });
    });
    
    // Add basic browser detection for compatibility
    const detectBrowser = () => {
        const userAgent = navigator.userAgent;
        let browserName;
        
        if (userAgent.match(/chrome|chromium|crios/i)) {
            browserName = "chrome";
        } else if (userAgent.match(/firefox|fxios/i)) {
            browserName = "firefox";
        } else if (userAgent.match(/safari/i)) {
            browserName = "safari";
        } else if (userAgent.match(/opr\//i)) {
            browserName = "opera";
        } else if (userAgent.match(/edg/i)) {
            browserName = "edge";
        } else {
            browserName = "unknown";
        }
        
        document.body.classList.add(`browser-${browserName}`);
    };
    
    detectBrowser();
    
    // Fix for Safari/iOS issues with vh units
    const appHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    
    window.addEventListener('resize', appHeight);
    appHeight();
    
    // Add additional CSS for mobile menu when active
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: white;
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                padding: 1rem;
                z-index: 1000;
            }
            
            .nav-links.active li {
                margin: 0.5rem 0;
            }
            
            .menu-toggle.active .bar:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .menu-toggle.active .bar:nth-child(2) {
                opacity: 0;
            }
            
            .menu-toggle.active .bar:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        document.querySelectorAll('.feature-card, .solution-card, .stat-item').forEach(element => {
            element.classList.add('fade-in');
            appearOnScroll.observe(element);
        });
        
        // Add the necessary CSS for fade-in animations
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            .fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .fade-in.appear {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(animationStyle);
    }
    
    // Add highlight effect for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('highlight');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('highlight');
            });
        });
        
        // Add to the elements observed for animations
        if ('IntersectionObserver' in window) {
            document.querySelectorAll('.service-card, .service-process-item').forEach(element => {
                element.classList.add('fade-in');
                appearOnScroll.observe(element);
            });
        }
    }
    
    // Add animation for timeline on the about page
    if (document.querySelector('.timeline-item')) {
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.classList.add('fade-in');
            
            if ('IntersectionObserver' in window) {
                appearOnScroll.observe(item);
            }
        });
    }

    // Add animations for team members and achievements
    if ('IntersectionObserver' in window) {
        document.querySelectorAll('.team-member, .achievement-item, .value-card').forEach(element => {
            element.classList.add('fade-in');
            appearOnScroll.observe(element);
        });
    }
    
    // Add CSS for custom micro-interactions
    const microStyles = document.createElement('style');
    microStyles.textContent = `
        .theme-transition {
            transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
        }
        
        .menu-open {
            overflow: hidden;
        }
        
        .feature-icon, .service-icon, .value-icon, .achievement-icon {
            transition: transform 0.3s ease-in-out;
        }
        
        .feature-card:hover .feature-icon,
        .service-card:hover .service-icon,
        .value-card:hover .value-icon,
        .achievement-item:hover .achievement-icon {
            transform: scale(1.1) rotate(5deg);
        }
        
        .card-shine {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                135deg,
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,0.03) 50%,
                rgba(255,255,255,0) 100%
            );
            transform: translateX(-100%);
            transition: transform 0.6s;
        }
        
        .feature-card:hover .card-shine,
        .service-card:hover .card-shine,
        .solution-card:hover .card-shine {
            transform: translateX(100%);
        }
        
        /* Navigation link interaction */
        .nav-links a {
            position: relative;
        }
        
        .nav-links a:after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--primary);
            transition: width 0.3s ease-in-out;
        }
        
        .nav-links a:hover:after {
            width: 100%;
        }
        
        /* Button loading state */
        .button-loading {
            position: relative;
            pointer-events: none;
            color: transparent;
        }
        
        .button-loading:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: buttonLoading 0.8s infinite linear;
        }
        
        @keyframes buttonLoading {
            to {
                transform: rotate(360deg);
            }
        }
        
        /* Feedback animations */
        @keyframes successPulse {
            0% {
                box-shadow: 0 0 0 0 rgba(46, 213, 115, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(46, 213, 115, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(46, 213, 115, 0);
            }
        }
        
        @keyframes errorShake {
            0%, 100% {
                transform: translateX(0);
            }
            20%, 60% {
                transform: translateX(-5px);
            }
            40%, 80% {
                transform: translateX(5px);
            }
        }
        
        .success-feedback {
            animation: successPulse 1.5s ease-in-out;
        }
        
        .error-feedback {
            animation: errorShake 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(microStyles);
    
    // Add shine effect to cards
    document.querySelectorAll('.feature-card, .service-card, .solution-card').forEach(card => {
        const shine = document.createElement('div');
        shine.classList.add('card-shine');
        card.appendChild(shine);
    });
    
    // Initialize buttons with loading state capability
    document.querySelectorAll('.primary-button, .secondary-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // This is just for demo purposes - in real use,
            // you'd only add this class when actually loading
            if(button.classList.contains('demo-loading')) {
                e.preventDefault();
                button.classList.add('button-loading');
                
                setTimeout(() => {
                    button.classList.remove('button-loading');
                    button.classList.add('success-feedback');
                    
                    setTimeout(() => {
                        button.classList.remove('success-feedback');
                    }, 1500);
                }, 1500);
            }
        });
    });
    
    // Apply image styling for dark mode
    function applyImageFilters() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.querySelectorAll('img').forEach(img => {
            if (isDark) {
                img.style.filter = 'brightness(0.85) contrast(1.1)';
            } else {
                img.style.filter = 'none';
            }
        });
    }
    
    // Improve loading of images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        if (!img.getAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Set default aspect ratio if not already specified
        if (!img.style.aspectRatio) {
            img.style.aspectRatio = '16/9';
        }
    });
    
    // Add additional CSS for image transitions
    const imageStyles = document.createElement('style');
    imageStyles.textContent = `
        img {
            transition: filter 0.3s ease, transform 0.5s ease;
        }
        
        img:not(.loaded) {
            opacity: 0;
        }
        
        img.loaded {
            opacity: 1;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(imageStyles);
    
    // Add responsive image handling
    document.querySelectorAll('img').forEach(img => {
        if (!img.getAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Set default aspect ratio if not already specified
        if (!img.style.aspectRatio) {
            img.style.aspectRatio = '16/9';
        }
    });
    
    // Initialize matrix rain effect
    function createMatrixRain() {
        const matrixBg = document.createElement('div');
        matrixBg.className = 'matrix-bg';
        document.body.appendChild(matrixBg);
        
        const width = window.innerWidth;
        const height = window.innerHeight;
        const fontSize = 16;
        const columns = Math.floor(width / fontSize);
        
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -20);
        }
        
        const chars = "01010101あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん10101010";
        
        function draw() {
            const ctx = document.createElement('canvas');
            ctx.width = width;
            ctx.height = height;
            ctx.style.position = 'absolute';
            ctx.style.top = '0';
            ctx.style.left = '0';
            ctx.style.zIndex = '-1';
            ctx.style.opacity = '0.05';
            
            matrixBg.innerHTML = '';
            matrixBg.appendChild(ctx);
            
            const context = ctx.getContext('2d');
            context.fillStyle = 'rgba(0, 0, 0, 0.05)';
            context.fillRect(0, 0, width, height);
            
            context.fillStyle = '#0DD3FF';
            context.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                context.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > height && Math.random() > 0.98) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        setInterval(draw, 50);
    }
    
    // Add scanner effect
    function addScannerEffect() {
        const scanner = document.createElement('div');
        scanner.className = 'scanner-line';
        document.body.appendChild(scanner);
    }
    
    // Add glowing effect to icons and buttons
    function addGlowEffects() {
        document.querySelectorAll('.feature-icon svg, .service-icon svg, .value-icon svg').forEach(icon => {
            icon.classList.add('glow-effect');
        });
        
        document.querySelectorAll('.primary-button, .contact-button').forEach(button => {
            button.addEventListener('mouseover', function() {
                this.style.boxShadow = '0 0 20px rgba(13, 211, 255, 0.7)';
            });
            
            button.addEventListener('mouseout', function() {
                this.style.boxShadow = '';
            });
        });
    }
    
    // Digital clock in footer
    function addDigitalClock() {
        const clockContainer = document.createElement('div');
        clockContainer.className = 'digital-clock';
        
        function updateClock() {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { hour12: false });
            clockContainer.textContent = time;
        }
        
        updateClock();
        setInterval(updateClock, 1000);
        
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            const firstColumn = footerContent.querySelector('.footer-column');
            firstColumn.appendChild(clockContainer);
        }
    }
    
    // Cyber-themed text animation
    function addCyberTextEffect() {
        const headings = document.querySelectorAll('h1, h2');
        
        headings.forEach(heading => {
            heading.classList.add('cyber-text');
            
            // Add cyber-themed text animation
            const text = heading.textContent;
            heading.textContent = '';
            
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.textContent = text[i];
                span.style.animationDelay = `${i * 0.05}s`;
                span.classList.add('cyber-char');
                heading.appendChild(span);
            }
        });
        
        // Add style for cyber characters
        const style = document.createElement('style');
        style.textContent = `
            .cyber-char {
                display: inline-block;
                animation: cyber-char-animation 0.3s ease forwards;
                opacity: 0;
                transform: translateY(10px);
            }
            
            @keyframes cyber-char-animation {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Enhanced security animation
    function enhanceSecurityAnimation() {
        const svg = document.querySelector('.security-animation');
        if (svg) {
            // Add more animated elements
            const connectionLines = svg.querySelector('.connection-lines');
            const securityNodes = svg.querySelector('.security-nodes');
            
            // Add pulsating nodes
            const nodesCount = securityNodes.childElementCount;
            for (let i = 0; i < nodesCount; i++) {
                for (let j = i + 1; j < nodesCount; j++) {
                    const node1 = securityNodes.children[i];
                    const node2 = securityNodes.children[j];
                    
                    const x1 = parseFloat(node1.getAttribute('cx'));
                    const y1 = parseFloat(node1.getAttribute('cy'));
                    const x2 = parseFloat(node2.getAttribute('cx'));
                    const y2 = parseFloat(node2.getAttribute('cy'));
                    
                    // Calculate distance between nodes
                    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    
                    // Only connect if nodes are close enough
                    if (distance < 150) {
                        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                        line.setAttribute('x1', x1);
                        line.setAttribute('y1', y1);
                        line.setAttribute('x2', x2);
                        line.setAttribute('y2', y2);
                        line.setAttribute('stroke', 'var(--primary)');
                        line.setAttribute('stroke-width', '1');
                        line.setAttribute('stroke-opacity', '0.3');
                        line.style.animation = `pulseLine ${1 + Math.random()}s infinite alternate ${Math.random()}s`;
                        connectionLines.appendChild(line);
                    }
                }
            }
            
            // Add style for pulsating lines
            const style = document.createElement('style');
            style.textContent = `
                @keyframes pulseLine {
                    from {
                        stroke-opacity: 0.1;
                        stroke-width: 0.5;
                    }
                    to {
                        stroke-opacity: 0.4;
                        stroke-width: 1.5;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Apply cybersecurity-themed enhancements
    createMatrixRain();
    addScannerEffect();
    addGlowEffects();
    addDigitalClock();
    addCyberTextEffect();
    enhanceSecurityAnimation();
    
    // Add particles background
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#0DD3FF" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#0DD3FF",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
    
    // Case studies slider functionality
    const navDots = document.querySelectorAll('.nav-dot');
    if (navDots.length) {
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Here you would normally change the slide
                document.querySelectorAll('.nav-dot').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });
    }
    
    // Code highlighting effect for the tech showcase
    const codeContent = document.querySelector('.code-content code');
    if (codeContent) {
        const text = codeContent.innerHTML;
        let enhancedText = text
            .replace(/import|from|class|def|self|return|if|for|in/g, '<span style="color: #FF79C6;">$&</span>')
            .replace(/ThreatDefense|ThreatScanner|QuantumKey|neural_shield/g, '<span style="color: #50FA7B;">$&</span>')
            .replace(/"[^"]*"/g, '<span style="color: #F1FA8C;">$&</span>')
            .replace(/\b(True|False|None)\b/g, '<span style="color: #BD93F9;">$&</span>')
            .replace(/\b(\d+(\.\d+)?)\b/g, '<span style="color: #BD93F9;">$&</span>')
            .replace(/#.*/g, '<span style="color: #6272A4;">$&</span>');
        
        codeContent.innerHTML = enhancedText;
    }
    
    // Animate the code typing effect
    function animateCode() {
        const codeLines = document.querySelectorAll('.code-content code');
        if (codeLines.length) {
            codeLines.forEach((line, index) => {
                line.style.opacity = '0';
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.animation = `fadeInUp 0.5s ${index * 0.1}s forwards`;
                }, 500);
            });
        }
    }
    
    // Initialize any new animations
    function initializeAdditionalAnimations() {
        // Glowing button effect
        const glowButtons = document.querySelectorAll('.glow-button');
        glowButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = (e.clientX - rect.left) / button.clientWidth;
                const y = (e.clientY - rect.top) / button.clientHeight;
                
                button.style.setProperty('--x', x);
                button.style.setProperty('--y', y);
            });
        });
        
        // Add hover effects for client logos
        const logoItems = document.querySelectorAll('.logo-item');
        logoItems.forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                logo.style.transform = 'translateY(-5px)';
                logo.style.boxShadow = '0 8px 25px rgba(13, 211, 255, 0.3)';
                logo.style.borderColor = 'var(--primary)';
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.transform = '';
                logo.style.boxShadow = '';
                logo.style.borderColor = '';
            });
        });
    }
    
    // Initialize typewriter effect
    function initializeTypewriter() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.width = '0';
            
            let index = 0;
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        });
    }
    
    // Run all new initializations
    initializeAdditionalAnimations();
    initializeTypewriter();
    
    // Add this to the existing window load event or create a new one
    window.addEventListener('load', function() {
        animateCode();
    });
});