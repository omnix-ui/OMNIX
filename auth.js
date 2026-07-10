// auth.js - Crash Proof Code for Mobile Testing

// 1. Sign Up Logic
document.querySelector('#signup-modal form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Page refresh rokna
    
    try {
        // Step 1: Form se values nikalna
        const inputs = this.querySelectorAll('input');
        const fullName = inputs[0].value;
        const email = inputs[1].value;
        const username = inputs[2].value;
        const password = inputs[3].value;

        // Step 2: Username Condition Check
        const usernameRegex = /^[A-Z]{5,}$/;
        if (!usernameRegex.test(username)) {
            alert("Username galat hai! Sirf CAPITAL LETTERS dalein (kam se kam 5). Jaise: OMNIX");
            return; 
        }

        // Step 3: Password Condition Check
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6}$/;
        if (!passwordRegex.test(password)) {
            alert("Password galat hai! Exact 6 characters ka rakhein jisme Letter aur Number dono ho. Jaise: Pass12");
            return;
        }

        // Step 4: Supabase Check (Sabse zyada error yahan aate hain)
        if (typeof supabase === 'undefined') {
            alert("Error: Supabase file link nahi hui! index.html mein scripts ka order check karein ya Internet connection dekhein.");
            return;
        }

        // Step 5: Database mein bhejna
        alert("Conditions pass ho gayi! Data Supabase ko bhej rahe hain..."); // Ye dikhna chahiye
        
        const { data, error } = await supabase.auth.signUp({
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
            alert("Supabase ne error diya: " + error.message);
        } else {
            alert("Bhaiya, account ban gaya! OMNIX mein swagat hai.");
            document.getElementById('signup-modal').style.display = 'none';
            this.reset(); 
        }

    } catch (err) {
        // Agar code kahin bhi crash hua, toh ye error pakad lega
        alert("Code Crash Ho Gaya: " + err.message);
    }
});


// 2. Sign In Logic
document.querySelector('#signin-modal form').addEventListener('submit', async function(e) {
    e.preventDefault(); 
    
    try {
        const inputs = this.querySelectorAll('input');
        const email = inputs[0].value; 
        const password = inputs[1].value;

        if (typeof supabase === 'undefined') {
            alert("Error: Supabase load nahi hua hai.");
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            alert("Login fail ho gaya: " + error.message);
        } else {
            alert("Login successful! Welcome back.");
            document.getElementById('signin-modal').style.display = 'none';
            this.reset();
        }
    } catch (err) {
        alert("Code Crash Ho Gaya: " + err.message);
    }
});
