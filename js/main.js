/**
 * Brockn Code - Team Website Logic
 * Handles animations, UI interactions, background effects, and preloader.
 */

// 1. Team Data Configuration
const teamData = {
    rohan: {
        name: "Rohan Jadhav",
        role: "Full-Stack Lead",
        image: "https://robohash.org/rohan?set=set4&bg=set1",
        bio: "Rohan is a seasoned developer with a passion for scalable architecture. He leads the technical direction of Brockn Code, bridging the gap between backend logic and frontend experiences.",
        skills: ["React", "Node.js", "AWS", "MongoDB", "TypeScript"],
        color: "text-cyan-400"
    },
    yash: {
        name: "Yash Deshpande",
        role: "Frontend Wizard",
        image: "https://robohash.org/yash?set=set4&bg=set1",
        bio: "Yash breathes life into static designs. Specializing in animations and micro-interactions, he ensures every pixel is perfectly placed. Expert in GSAP and Three.js.",
        skills: ["Vue.js", "Tailwind CSS", "GSAP", "Three.js", "Figma"],
        color: "text-purple-400"
    },
    rushi: {
        name: "Rushi Patil",
        role: "Backend Architect",
        image: "https://robohash.org/rushi?set=set4&bg=set1",
        bio: "Rushi is the backbone of our operations. He designs secure APIs, manages databases, and ensures 99.9% uptime for all our deployed services.",
        skills: ["Python", "Django", "PostgreSQL", "Docker", "DevOps"],
        color: "text-green-400"
    },
    aditya: {
        name: "Aditya Bhandari",
        role: "UI/UX & Creative Dev",
        image: "https://robohash.org/aditya?set=set4&bg=set1",
        bio: "Aditya sees code as art. With a strong background in design theory, he crafts interfaces that are as intuitive as they are beautiful.",
        skills: ["UI/UX Design", "Figma", "SASS", "React", "Prototyping"],
        color: "text-pink-400"
    }
};

// 2. Modal Management
const modal = document.getElementById('team-modal');

function openModal(memberKey) {
    const member = teamData[memberKey];
    if(!member) return;

    document.getElementById('modal-name').textContent = member.name;
    document.getElementById('modal-role').textContent = member.role;
    document.getElementById('modal-bio').textContent = member.bio;
    document.getElementById('modal-img').src = member.image;
    document.getElementById('modal-role').className = `text-sm uppercase tracking-widest font-semibold mb-6 ${member.color}`;

    const skillsContainer = document.getElementById('modal-skills');
    skillsContainer.innerHTML = '';
    member.skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = "px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700";
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Global listeners for modal
if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

// 3. Navigation & Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu');

if (mobileMenuBtn) mobileMenuBtn.onclick = () => mobileMenu.classList.remove('hidden');
if (closeMenuBtn) closeMenuBtn.onclick = () => mobileMenu.classList.add('hidden');
document.querySelectorAll('.mobile-link').forEach(link => {
    link.onclick = () => mobileMenu.classList.add('hidden');
});

// 4. Hero Background Particles
const canvas = document.getElementById('hero-canvas');
let ctx;
let particles = [];
let width, height;

function resize() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.5;
        this.color = Math.random() > 0.5 ? '#00f3ff' : '#bc13fe';
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();
    }
}

function initCanvas() {
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    particles = Array.from({ length: 60 }, () => new Particle());
    requestAnimationFrame(animateCanvas);
}

function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    // Draw connecting lines
    for(let i = 0; i < particles.length; i++) {
        for(let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - dist/1200})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateCanvas);
}

// 5. GSAP Animations & Interactions
window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize elements hidden for the loader
    gsap.set("#hero, #navbar, #about, #team, #projects, #contact, footer", { opacity: 0 });

    // Create Loader Elements Programmatically if they don't exist
    let loader = document.getElementById('loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'loader';
        loader.className = 'fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center p-6 text-center';
        loader.innerHTML = `
            <div class="overflow-hidden mb-4">
                <h1 id="loader-title" class="text-3xl md:text-5xl font-bold text-white tracking-tighter translate-y-full">
                    Wel-Come to <span class="text-cyan-400">BrocknCode</span>
                </h1>
            </div>
            <div class="overflow-hidden">
                <p id="loader-subtitle" class="text-gray-400 text-lg md:text-xl tracking-widest translate-y-full">
                    design and develop web and software with us
                </p>
            </div>
            <div class="w-48 h-[2px] bg-gray-800 mt-8 relative overflow-hidden">
                <div id="loader-bar" class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 -translate-x-full"></div>
            </div>
        `;
        document.body.prepend(loader);
    }

    const loaderTl = gsap.timeline({
        onComplete: () => {
            initCanvas(); // Start particles after loader
        }
    });

    // Intro Animation Sequence
    loaderTl
        .to("#loader-title", { y: 0, duration: 1, ease: "power4.out" })
        .to("#loader-subtitle", { y: 0, duration: 1, ease: "power4.out" }, "-=0.6")
        .to("#loader-bar", { x: 0, duration: 1.5, ease: "power2.inOut" }, "-=0.5")
        .to("#loader-title, #loader-subtitle", { 
            opacity: 0, 
            y: -20, 
            duration: 0.8, 
            ease: "power2.in" 
        }, "+=0.5")
        .to("#loader", { 
            clipPath: "circle(0% at 50% 50%)", 
            duration: 1.2, 
            ease: "expo.inOut" 
        })
        .to("#loader", { display: "none" })
        
        // Main Website Reveal
        .to("#hero, #navbar, #about, #team, #projects, #contact, footer", { 
            opacity: 1, 
            duration: 0.1 
        }, "-=0.5")
        
        // Hero Entrance
        .to(".hero-badge", { y: 0, opacity: 1, duration: 0.8 }, "-=0.2")
        .to(".hero-title", { y: 0, opacity: 1, duration: 1 }, "-=0.4")
        .to(".hero-text", { y: 0, opacity: 1, duration: 1 }, "-=0.6")
        .to(".hero-btns", { y: 0, opacity: 1, duration: 0.8 }, "-=0.6");

    // Scroll Navbar Effect
    window.onscroll = () => {
        const nav = document.getElementById("navbar")?.querySelector("div");
        if (!nav) return;
        if (window.scrollY > 50) {
            nav.classList.add("bg-black/80", "backdrop-blur-xl");
            nav.classList.remove("glass-panel");
        } else {
            nav.classList.remove("bg-black/80", "backdrop-blur-xl");
            nav.classList.add("glass-panel");
        }
    };

    // Stagger Team Cards
    gsap.from("#team .glass-card", {
        scrollTrigger: { trigger: "#team", start: "top 75%" },
        y: 60, opacity: 0, duration: 0.8, stagger: 0.15
    });

    // 3D Card Hover Logic
    document.querySelectorAll('.perspective').forEach(card => {
        card.onmousemove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
            card.querySelector('.glass-card').style.transform = `rotateX(${y}deg) rotateY(${x}deg) scale(1.05)`;
        };
        card.onmouseleave = () => {
            card.querySelector('.glass-card').style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        };
    });
});

window.onresize = resize;