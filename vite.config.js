import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { syncEssays } from './scripts/sync-essays.mjs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sync-essays-on-change',
      apply: 'serve',
      configureServer(server) {
        const essaysDir = path.resolve(server.config.root, 'src', 'essays')
        const isEssayFile = (file) => {
          const abs = path.resolve(file)
          return abs === essaysDir || abs.startsWith(essaysDir + path.sep)
        }

        let timer = null
        let running = false
        let rerun = false

        const run = async () => {
          if (running) {
            rerun = true
            return
          }
          running = true
          let synced = false

          try {
            await syncEssays()
            synced = true
          } catch (err) {
            server.config.logger.error(`[essays] sync failed: ${err?.message || err}`)
          }

          running = false

          if (rerun) {
            rerun = false
            run()
            return
          }

          if (synced) server.ws.send({ type: 'full-reload' })
        }

        const schedule = () => {
          if (timer) clearTimeout(timer)
          timer = setTimeout(run, 50)
        }

        schedule()

        server.watcher.add(path.join(essaysDir, '**/*.md'))
        server.watcher.on('add', (file) => isEssayFile(file) && schedule())
        server.watcher.on('change', (file) => isEssayFile(file) && schedule())
        server.watcher.on('unlink', (file) => isEssayFile(file) && schedule())
      },
    },
  ],
  base: '/',
  assetsInclude: ['**/*.md'],
  define: {
    global: 'globalThis',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
