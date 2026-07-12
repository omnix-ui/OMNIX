// Popups ko dhundhna
const signinModal = document.getElementById('signin-modal');
const signupModal = document.getElementById('signup-modal');

// Jab koi Sign In button dabaye
document.querySelectorAll('.btn-signin').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault(); // Link ko dusre page par jaane se rokna
        signinModal.style.display = 'flex';
    });
});

// Jab koi Sign Up button dabaye
document.querySelectorAll('.btn-signup').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.style.display = 'flex';
    });
});

// Jab 'X' (cross) dabayein popup band karne ke liye
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        signinModal.style.display = 'none';
        signupModal.style.display = 'none';
    });
});

// Agar form ke bahar (dark hisse par) click karein to popup band ho jaye
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});
// Pre-loader ko hatane ka logic (1.5 seconds baad)
window.addEventListener('load', function() {
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0'; // Pehle fade out hoga
        
        setTimeout(function() {
            preloader.style.display = 'none'; // Phir poori tarah hat jayega
        }, 500); 
    }, 1500); // 1500 milliseconds = 1.5 seconds
});
// --- DARK/LIGHT MODE LOGIC ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// 1. Pehle check karo ki user ne aakhiri baar kya set kiya tha
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeToggleBtn.innerText = '🌙'; // Light mode hai toh Moon dikhao
}

// 2. Button click hone par kya hoga
themeToggleBtn.addEventListener('click', () => {
    // Light mode class lagao ya hatao
    body.classList.toggle('light-mode');
    
    // Icon change karo aur memory (localStorage) mein save karo
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerText = '🌙'; 
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerText = '☀️'; 
    }
});
