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
    // Rule: Only 5 CAPITAL LETTERS
    const usernameRegex = /^[A-Z]{5,}$/;
    if (!usernameRegex.test(username)) {
        alert("ONLY 5 CAPITAL LETTER (A-Z)");
        return; // Pura code yahi ruk jayega
    }

    // --- CONDITION 2: PASSWORD ---
    // Rule: Exact 6 characters aur Alphanumeric (kam se kam ek letter aur ek number)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6}$/;
    if (!passwordRegex.test(password)) {
        alert("ONLY 6 LETTER / ALPHABET + NUMBER");
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
        alert("Account Created");
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
        alert("Login failed : " + error.message);
    } else {
        alert("Login successful! Welcome to Omnix.");
        document.getElementById('signin-modal').style.display = 'none';
        this.reset(); // Form clear karne ke liye
    }
});
