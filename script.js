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
