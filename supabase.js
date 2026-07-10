// supabase.js - Sirf Database ka setup

const supabaseUrl = 'https://otbyobzvuomysphfgmym.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90YnlvYnp2dW9teXNwaGZnbXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2Nzk5MTMsImV4cCI6MjA5OTI1NTkxM30.UKLCLo3TrlTNAVv2-dl_m8w8YdudALZO05_R5iEKd64';

// Supabase client ko global variable bana rahe hain taaki baaki files isko use kar sakein
window.supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log("Supabase alag file se connect ho gaya hai:", supabaseClient);
