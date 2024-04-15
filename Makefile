start-development-frontend:
	pnpm vite

start-development:
	pnpm tauri dev

build-production-frontend:
	pnpm vue-tsc --noEmit && pnpm vite build

build-production:
	pnpm tauri build

postinstall:
	pnpm prettier-config-generate

generate-type-defintions:
	pnpm vite-node script/type-def.ts
