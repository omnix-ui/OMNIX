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
