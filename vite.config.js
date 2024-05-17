import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		port: 8080 // Hier den gewünschten Port angeben
	  },
	plugins: [sveltekit()]
	
});
