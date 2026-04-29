// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    if (theme === 'dark') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return; // Skip if it's just "#"
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Animate skill cards on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(skill => {
    skillObserver.observe(skill);
});

// Add active state to nav links on scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = document.querySelector('.nav').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--text-primary)';
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Preload theme to prevent flash
(function() {
    const theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

// 3D Model Viewer Controls
let models = [];
let currentModelIndex = 0;
let modelLoaded = false;

// Fetch all .glb models from models/ directory
async function loadModelList() {
    try {
        const response = await fetch('./models/');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = doc.querySelectorAll('a');
        
        models = Array.from(links)
            .map(link => link.getAttribute('href'))
            .filter(href => href && href.endsWith('.glb'));
        
        if (models.length === 0) {
            console.error('No .glb models found');
        }
    } catch (error) {
        console.error('Failed to load model list:', error);
        // Fallback to hardcoded list
        models = ['./models/N0ruleOptimized.glb', './models/Avocado.glb', './models/BarramundiFish.glb'];
    }
}

// Initialize model list on page load
loadModelList();

const loadModelBtn = document.getElementById('loadModelBtn');
const modelPlaceholder = document.getElementById('modelPlaceholder');
const modelViewer = document.getElementById('modelViewer');
const prevModelBtn = document.getElementById('prevModelBtn');
const nextModelBtn = document.getElementById('nextModelBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const modelCounter = document.getElementById('modelCounter');
const modelViewerContainer = document.getElementById('modelViewerContainer');
const modelControls = document.getElementById('modelControls');
const fullscreenIcon = document.querySelector('.fullscreen-icon');
const exitFullscreenIcon = document.querySelector('.exit-fullscreen-icon');
const modelInstructions = document.getElementById('modelInstructions');
const closeInstructionsBtn = document.getElementById('closeInstructionsBtn');

// Load model on button click
loadModelBtn.addEventListener('click', () => {
    const progressBar = document.getElementById('progressBar');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressText = document.getElementById('progressText');
    
    // Show and reset progress bar
    if (progressBar) {
        progressBar.classList.remove('hidden');
        progressBarFill.style.width = '0%';
        progressText.textContent = 'Loading... 0%';
    }
    
    modelViewer.src = models[currentModelIndex];
    modelViewer.setAttribute('auto-rotate', '');
    modelPlaceholder.style.display = 'none';
    modelViewer.classList.remove('hidden');
    modelControls.classList.remove('hidden');
    modelLoaded = true;
    
    // Enable controls
    prevModelBtn.disabled = models.length <= 1;
    nextModelBtn.disabled = models.length <= 1;
    
    updateModelCounter();
});

// Listen for model loading progress
modelViewer.addEventListener('progress', (event) => {
    const progressBarFill = document.getElementById('progressBarFill');
    const progressText = document.getElementById('progressText');
    const progress = event.detail.totalProgress * 100;
    
    if (progressBarFill && progressText) {
        progressBarFill.style.width = `${progress}%`;
        progressText.textContent = `Loading... ${Math.round(progress)}%`;
    }
});

// Hide progress bar when model is loaded
modelViewer.addEventListener('load', () => {
    const progressBar = document.getElementById('progressBar');
    
    // Clear progress timeout if model loaded fast
    if (modelViewer.dataset.progressTimeout) {
        clearTimeout(parseInt(modelViewer.dataset.progressTimeout));
        delete modelViewer.dataset.progressTimeout;
    }
    
    if (progressBar) {
        progressBar.classList.add('hidden');
    }
    
    // Fade in model viewer
    modelViewer.style.transition = 'opacity 0.3s ease';
    modelViewer.style.opacity = '1';
    
    // Show instructions after model loads
    if (!localStorage.getItem('modelInstructionsShown')) {
        modelInstructions.classList.remove('hidden');
    }
});

// Close instructions
closeInstructionsBtn.addEventListener('click', () => {
    modelInstructions.classList.add('hidden');
    localStorage.setItem('modelInstructionsShown', 'true');
});

// Previous model
prevModelBtn.addEventListener('click', () => {
    if (models.length > 1) {
        currentModelIndex = (currentModelIndex - 1 + models.length) % models.length;
        loadModel(currentModelIndex);
    }
});

// Next model
nextModelBtn.addEventListener('click', () => {
    if (models.length > 1) {
        currentModelIndex = (currentModelIndex + 1) % models.length;
        loadModel(currentModelIndex);
    }
});

// Load model helper function
function loadModel(index) {
    const progressBar = document.getElementById('progressBar');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressText = document.getElementById('progressText');
    
    // Fade out model viewer during load
    modelViewer.style.transition = 'opacity 0.3s ease';
    modelViewer.style.opacity = '0';
    
    // Show progress bar only after delay (if model takes time to load)
    let progressTimeout = setTimeout(() => {
        if (progressBar) {
            progressBar.classList.remove('hidden');
            progressBarFill.style.width = '0%';
            progressText.textContent = 'Loading... 0%';
        }
    }, 25);
    
    // Store timeout ID to clear it if model loads fast
    modelViewer.dataset.progressTimeout = progressTimeout;
    
    // Load new model
    modelViewer.src = models[index];
    updateModelCounter();
}

// Fullscreen toggle
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        modelViewerContainer.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});

// Listen for fullscreen changes
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenIcon.classList.add('hidden');
        exitFullscreenIcon.classList.remove('hidden');
    } else {
        fullscreenIcon.classList.remove('hidden');
        exitFullscreenIcon.classList.add('hidden');
    }
});

// Update model counter
function updateModelCounter() {
    modelCounter.textContent = `${currentModelIndex + 1} / ${models.length}`;
}
