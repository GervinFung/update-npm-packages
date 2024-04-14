import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

export default defineConfig(() => {
	const server = {
		port: 5000,
		open: false,
		strictPort: true,
	} as const;

	const root = process.cwd();

	return {
		plugins: [vue()],
		clearScreen: false,
		root: `${root}/src`,
		publicDir: `${root}/public`,
		server,
		preview: server,
		build: {
			emptyOutDir: true,
			outDir: `${root}/build`,
		},
	};
});
