import { createServer } from 'node:http';
import { access, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number.parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || '127.0.0.1';
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp'
};

function sendJson(response, status, payload, method) {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(method === 'HEAD' ? undefined : body);
}

async function findFile(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  const requested = decoded === '/' ? '/index.html' : decoded;
  const candidate = path.resolve(root, `.${requested}`);
  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) return null;

  const candidates = [candidate];
  if (!path.extname(candidate)) {
    candidates.push(`${candidate}.html`, path.join(candidate, 'index.html'));
  }

  for (const file of candidates) {
    try {
      const info = await stat(file);
      if (info.isFile()) return file;
    } catch {
      // Continue checking extensionless and directory index candidates.
    }
  }
  return null;
}

const server = createServer(async (request, response) => {
  const method = request.method || 'GET';
  if (method !== 'GET' && method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method not allowed');
    return;
  }

  let pathname;
  try {
    pathname = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`).pathname;
  } catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  if (pathname === '/api/health') {
    sendJson(response, 200, { ok: true, service: 'Kapila Traders website', runtime: process.version }, method);
    return;
  }

  const file = await findFile(pathname);
  if (!file) {
    let notFound;
    try {
      notFound = await readFile(path.join(root, '404.html'));
    } catch {
      notFound = Buffer.from('Not found');
    }
    response.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Content-Type-Options': 'nosniff'
    });
    response.end(method === 'HEAD' ? undefined : notFound);
    return;
  }

  try {
    await access(file);
    const body = await readFile(file);
    const contentType = types[path.extname(file).toLowerCase()] || 'application/octet-stream';
    response.writeHead(200, {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    });
    response.end(method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(500);
    response.end('Unable to read the requested file');
  }
});

server.listen(port, host, () => {
  console.log(`Kapila Traders is running at http://${host}:${port}`);
  console.log(`Node API health check: http://${host}:${port}/api/health`);
});
