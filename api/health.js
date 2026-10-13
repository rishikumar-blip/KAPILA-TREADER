export default {
  fetch() {
    return Response.json({
      ok: true,
      service: 'Kapila Traders website',
      runtime: 'Vercel Node.js Function'
    }, {
      headers: { 'Cache-Control': 'no-store' }
    });
  }
};
