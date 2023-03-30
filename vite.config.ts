import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/vite-crud/',
	plugins: [react()],
	resolve: {
		alias: {
			types: '/src/types',
			hooks: '/src/hooks',
			constants: '/src/constants',
			components: '/src/components',
			api: '/src/api',
			store: '/src/store'
		}
	}
});
