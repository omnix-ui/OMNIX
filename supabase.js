// supabase.js - Sirf Database ka setup

const supabaseUrl = 'otbyobzvuomysphfgmym';
const supabaseKey = 'sb_publishable_ETKnkiMrAU-1DBSVAwQ2RA_hqvpLZLE';

// Supabase client ko global variable bana rahe hain taaki baaki files isko use kar sakein
window.supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log("Supabase alag file se connect ho gaya hai:", supabaseClient);
