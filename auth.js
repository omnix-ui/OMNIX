// auth.js - Asli Login aur Signup ka logic

// 1. Sign Up Logic
document.querySelector('#signup-modal form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Page refresh hone se rokna
    
    // Form se values nikalna
    const inputs = this.querySelectorAll('input');
    const fullName = inputs[0].value;
    const email = inputs[1].value;
    const username = inputs[2].value;
    const password = inputs[3].value;

    // --- CONDITION 1: USERNAME ---
    // Rule: Kam se kam 5 letters aur SIRF CAPITAL LETTERS
    const usernameRegex = /^[A-Z]{5,}$/;
    if (!usernameRegex.test(username)) {
        alert("Username galat hai! Ye kam se kam 5 letters ka hona chahiye aur isme SIRF CAPITAL LETTERS (A-Z) hone chahiye.");
        return; // Pura code yahi ruk jayega
    }

    // --- CONDITION 2: PASSWORD ---
    // Rule: Exact 6 characters aur Alphanumeric (kam se kam ek letter aur ek number)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6}$/;
    if (!passwordRegex.test(password)) {
        alert("Password galat hai! Password sirf 6 characters ka hona chahiye aur usme letters aur numbers dono hone zaroori hain (Alphanumeric).");
        return;
    }

    // Agar dono condition pass ho gayi, toh Supabase ko data bhejenge
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: fullName,
                username: username
            }
        }
    });

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Bhaiya, account ban gaya! OMNIX mein swagat hai.");
        document.getElementById('signup-modal').style.display = 'none';
        this.reset(); // Form clear karne ke liye
    }
});

// 2. Sign In Logic (Ye waisa hi rahega)
document.querySelector('#signin-modal form').addEventListener('submit', async function(e) {
    e.preventDefault(); 
    
    const inputs = this.querySelectorAll('input');
    const email = inputs[0].value; 
    const password = inputs[1].value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert("Login fail ho gaya: " + error.message);
    } else {
        alert("Login successful! Welcome back.");
        document.getElementById('signin-modal').style.display = 'none';
        this.reset(); // Form clear karne ke liye
    }
});
