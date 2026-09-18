// ===== Matrix Rain Effect =====
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let columns;
let drops = [];
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const charArray = chars.split('');
const fontSize = 14;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 5, 8, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = '#00f5ff';
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
setInterval(drawMatrix, 50);

// ===== Particle Network Effect =====
const particleCanvas = document.createElement('canvas');
particleCanvas.id = 'particles-canvas';
document.body.insertBefore(particleCanvas, document.body.firstChild);
const pCtx = particleCanvas.getContext('2d');

let pWidth, pHeight;
let particles = [];
const particleCount = 60;
const connectionDistance = 150;
const mouseDistance = 200;

class Particle {
    constructor() {
        this.x = Math.random() * pWidth;
        this.y = Math.random() * pHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > pWidth) this.vx *= -1;
        if (this.y < 0 || this.y > pHeight) this.vy *= -1;
    }
    
    draw() {
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        pCtx.fillStyle = 'rgba(0, 245, 255, 0.5)';
        pCtx.fill();
    }
}

function initParticles() {
    pWidth = particleCanvas.width = window.innerWidth;
    pHeight = particleCanvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function drawParticles() {
    pCtx.clearRect(0, 0, pWidth, pHeight);
    
    particles.forEach((particle, i) => {
        particle.update();
        particle.draw();
        
        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - particle.x;
            const dy = particles[j].y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
                pCtx.beginPath();
                pCtx.moveTo(particle.x, particle.y);
                pCtx.lineTo(particles[j].x, particles[j].y);
                pCtx.strokeStyle = `rgba(0, 245, 255, ${0.2 * (1 - distance / connectionDistance)})`;
                pCtx.lineWidth = 1;
                pCtx.stroke();
            }
        }
    });
    
    requestAnimationFrame(drawParticles);
}

initParticles();
drawParticles();
window.addEventListener('resize', initParticles);

// ===== Loader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2000);
});

// ===== Typewriter Effect =====
const typewriterText = 'Digital Forensics & Cyber Security Expert';
const typewriterElement = document.getElementById('typewriter-text');
let charIndex = 0;

function typeWriter() {
    if (charIndex < typewriterText.length) {
        typewriterElement.textContent += typewriterText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
    }
}

setTimeout(typeWriter, 2500);

// ===== Navigation =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== Back to Top =====
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.section-header, .about-card, .about-stat, .highlight-card, .timeline-item, .skill-category, .tools-section, .expertise-item, .cert-card, .education-item, .contact-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ===== 3D Tilt Effect on Cards =====
document.querySelectorAll('.stat-card, .highlight-card, .cert-card, .skill-category').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===== Parallax Effect for Hero Orbs =====
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.glow-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (window.innerWidth / 2 - e.clientX) / speed;
        const y = (window.innerHeight / 2 - e.clientY) / speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== Magnetic Button Effect =====
document.querySelectorAll('.btn, .nav-cta, .contact-card').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== Console Easter Egg =====
console.log('%c🔒 Sandhan Singh - Digital Forensics & Cyber Security Expert', 'color: #00f5ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00f5ff;');
console.log('%cCEI / CHFI / CTIA Certified', 'color: #a855f7; font-size: 12px;');
console.log('%cContact: sandhansingh811201@gmail.com', 'color: #94a3b8; font-size: 11px;');
console.log('%c⚠️ This is a secure portfolio. All activities are monitored.', 'color: #ff3366; font-size: 10px; font-family: monospace;');
