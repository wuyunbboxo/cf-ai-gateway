const TARGET = "https://render2-tdyr.onrender.com";


export default {

  // 普通API转发
  async fetch(request, env, ctx) {

    const url = new URL(request.url);


    return fetch(
      TARGET + url.pathname + url.search,
      {
        method: request.method,
        headers: request.headers,

        body:
          request.method === "GET"
          ? undefined
          : request.body
      }
    );

  },


  // 定时保活
  async scheduled(event, env, ctx) {

    try {

      const response = await fetch(TARGET);

      console.log(
        "Render2 keep alive:",
        response.status
      );


    } catch (e) {

      console.log(
        "Keep alive failed:",
        e.message
      );

    }

  }

};
