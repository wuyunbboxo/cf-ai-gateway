export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    const target = "https://render2-tdyr.onrender.com";

    return fetch(target + url.pathname + url.search, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });

  }
};
