// Simple auth guard utilities used by pages.
// Requires `supabase-config.js` to be loaded first (provides checkAuth()).

async function waitForSupabase(timeout = 5000) {
	if (window.supabaseClient) return true;
	return new Promise((resolve) => {
		const start = Date.now();
		const iv = setInterval(() => {
			if (window.supabaseClient) { clearInterval(iv); resolve(true); }
			if (Date.now() - start > timeout) { clearInterval(iv); resolve(false); }
		}, 100);
	});
}

async function requireAuth(redirect = 'Login.html') {
	const ready = await waitForSupabase();
	if (!ready) {
		console.warn('Supabase not ready in requireAuth');
		window.location.href = redirect;
		return false;
	}
	try {
		const session = await checkAuth();
		if (!session) {
			console.debug('requireAuth: no session, redirecting');
			window.location.href = redirect;
			return false;
		}
		return true;
	} catch (e) {
		console.error('requireAuth error', e);
		window.location.href = redirect;
		return false;
	}
}

async function redirectIfAuthenticated(redirectTo = 'dashboard.html') {
	const ready = await waitForSupabase();
	if (!ready) return false;
	const session = await checkAuth();
	if (session) { window.location.href = redirectTo; return true; }
	return false;
}

// Expose functions globally for pages
window.requireAuth = requireAuth;
window.redirectIfAuthenticated = redirectIfAuthenticated;
