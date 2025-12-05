// Supabase Configuration
const SUPABASE_URL = "https://fnxywmlhqkpaqnyekrtn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_0TbsU3ys09Se9FcKpz2Q6w_64PlWI9I";

// Wait for Supabase library to load
let supabaseClient = null;

function initSupabase() {
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        // expose on window for other scripts and add debug logging
        window.supabaseClient = supabaseClient;
        console.log("Supabase initialized successfully", { url: SUPABASE_URL });
        return true;
    } else {
        console.error("Supabase library not loaded");
        return false;
    }
}

// Initialize when library is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSupabase);
} else {
    initSupabase();
}

// Check authentication status
async function checkAuth() {
    if (!supabaseClient) {
        console.error("Supabase client not initialized");
        return null;
    }
    
    try {
        const { data, error } = await supabaseClient.auth.getSession();
        if (error) {
            console.error("Auth check error:", error);
            return null;
        }
        console.debug('Auth session check', { session: data?.session });
        return data?.session || null;
    } catch (error) {
        console.error("Auth check exception:", error);
        return null;
    }
}
