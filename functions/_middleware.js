// Simple site-wide password gate for Cloudflare Pages, using HTTP Basic Auth.
//
// No password is stored in this file or in git. Set your own credentials in
// Cloudflare: Pages project -> Settings -> Environment variables -> add
// SITE_USER and SITE_PASSWORD, then redeploy. Until those are set, the site
// stays locked for everyone (fails closed, never fails open).

export async function onRequest({ request, next, env }) {
  const expectedUser = env.SITE_USER;
  const expectedPassword = env.SITE_PASSWORD;

  if (expectedUser && expectedPassword) {
    const authHeader = request.headers.get("Authorization");

    if (authHeader && authHeader.startsWith("Basic ")) {
      const decoded = atob(authHeader.slice(6));
      const separatorIndex = decoded.indexOf(":");
      const user = decoded.slice(0, separatorIndex);
      const password = decoded.slice(separatorIndex + 1);

      if (user === expectedUser && password === expectedPassword) {
        return next();
      }
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Safeseal Document Solutions - Preview"',
    },
  });
}
