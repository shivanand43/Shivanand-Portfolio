import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function localApiServer() {
  return {
    name: 'local-api-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) {
          return next();
        }

        // Parse query params and route path
        const [pathname, queryString] = req.url.split('?');
        const endpoint = pathname.replace('/api/', '');

        // Match handler file
        let handlerModule;
        try {
          if (endpoint === 'admin-login') {
            handlerModule = await import('./api/admin-login.js');
          } else if (endpoint === 'messages') {
            handlerModule = await import('./api/messages.js');
          } else if (endpoint === 'chats') {
            handlerModule = await import('./api/chats.js');
          } else if (endpoint === 'ratings') {
            handlerModule = await import('./api/ratings.js');
          } else if (endpoint === 'export-excel') {
            handlerModule = await import('./api/export-excel.js');
          } else {
            return next();
          }
        } catch (err) {
          console.error(`Failed to load handler for ${req.url}:`, err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ ok: false, error: err.message }));
        }

        // Parse JSON body for POST requests
        let body = {};
        if (req.method === 'POST') {
          const buffers = [];
          for await (const chunk of req) {
            buffers.push(chunk);
          }
          const raw = Buffer.concat(buffers).toString();
          if (raw) {
            try {
              body = JSON.parse(raw);
            } catch {
              body = {};
            }
          }
        }

        // Parse query params into an object
        const query = {};
        if (queryString) {
          const params = new URLSearchParams(queryString);
          for (const [k, v] of params.entries()) {
            query[k] = v;
          }
        }

        req.body = body;
        req.query = query;

        // Mock Next.js/Vercel serverless helper methods on res
        res.status = function (statusCode) {
          res.statusCode = statusCode;
          return res;
        };

        res.json = function (jsonObj) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(jsonObj));
          return res;
        };

        res.send = function (data) {
          res.end(data);
          return res;
        };

        try {
          await handlerModule.default(req, res);
        } catch (handlerErr) {
          console.error(`API execution error on ${req.url}:`, handlerErr);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, message: handlerErr.message }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Expose env vars to process.env during local dev
  Object.assign(process.env, env);

  return {
    plugins: [react(), localApiServer()],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
    server: {
      port: 5173,
      open: true,
    },
  };
});