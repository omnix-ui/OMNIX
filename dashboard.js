// dashboard.js - Dashboard ki functionalities

document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. Check karein ki user Login hai ya nahi
    const { data: { user }, error } = await window.supabaseClient.auth.getUser();

    // Agar user login nahi hai, toh wapas index.html (home page) par bhej do
    if (!user || error) {
        window.location.href = "index.html";
        return;
    }

    // 2. User ka data HTML mein set karein
    const fullName = user.user_metadata.full_name;
    const username = user.user_metadata.username;
    const email = user.email;

    // Center me 'Welcome Name'
    document.getElementById('welcome-name').innerText = fullName;

    // Sidebar me Profile details
    document.getElementById('profile-name').innerText = fullName;
    document.getElementById('profile-username').innerText = username;
    document.getElementById('profile-email').innerText = email;
   const avatarUrl = `https://ui-avatars.com/api/?name=${fullName}&background=random&color=fff&size=128&bold=true`;
    document.getElementById('profile-avatar').src = avatarUrl;
    // 3. Sidebar (Hamburger Menu) ka logic
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }

    menuBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar); // Bahar click karne par bhi band hoga

    // 4. Logout (Sign Out) Button ka logic
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', async () => {
        const { error } = await window.supabaseClient.auth.signOut();
        if (error) {
            alert("Logout karne me problem hui: " + error.message);
        } else {
            // Logout hone ke baad wapas home page par bhej do
            window.location.href = "index.html";
        }
    });
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
// ==========================================
// 🎥 VLOG POPUP (MODAL) BULLETPROOF LOGIC
// ==========================================

// Ye 'DOMContentLoaded' ensure karega ki JS tabhi chale jab HTML poora load ho chuka ho
document.addEventListener("DOMContentLoaded", function() {
    
    const vlogBtn = document.getElementById('vlog-btn');
    const videoModal = document.getElementById('video-modal');
    const closeVideoBtn = document.getElementById('close-video-btn');

    // Agar button aur modal mil gaye toh click event lagao
    if (vlogBtn && videoModal) {
        vlogBtn.addEventListener('click', () => {
            videoModal.style.display = 'block'; // Popup dikhao
        });
    }

    // X (Close) dabane ka logic
    if (closeVideoBtn && videoModal) {
        closeVideoBtn.addEventListener('click', () => {
            videoModal.style.display = 'none'; // Popup chhupao
            
            // Video background music stop trick
            const iframes = videoModal.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                let currentSrc = iframe.src;
                iframe.src = currentSrc; 
            });
        });
    }
});
    // ==========================================
// 💬 CHAT BUTTON LOGIC (CROSS-DOMAIN SSO)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const chatBtn = document.getElementById('chat-btn');
    
    if (chatBtn) {
        chatBtn.addEventListener('click', async () => {
            // 1. Current user ka token nikalo
            const { data, error } = await supabase.auth.getSession();
            
            if (data.session) {
                const accessToken = data.session.access_token;
                const refreshToken = data.session.refresh_token;
                
                // 2. Chat website ka Live Link
                const chatWebsiteLink = "https://omnix-ui.github.io/omnix.chat/"; 
                
                // 3. User ko URL ke sath chat par bhej do
                window.location.href = `${chatWebsiteLink}?access_token=${accessToken}&refresh_token=${refreshToken}`;
            } else {
                alert("Pehle login kijiye!");
            }
        });
    }
});
