export default {
  async fetch(request, env) {

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    };


    // CORS预检
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      });
    }


    // 你的API Key
    const API_KEY = "123456";


    // 检查API Key
    const auth = request.headers.get("Authorization");

    if (auth !== "Bearer " + API_KEY) {

      return new Response(
        JSON.stringify({
          error: "Invalid API Key"
        }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        }
      );

    }



    // Render2地址
    const BACKEND =
      "https://render2-tdyr.onrender.com";



    // 拼接请求地址
    const target =
      BACKEND +
      new URL(request.url).pathname;



    try {

      const response = await fetch(
        target,
        {
          method: request.method,

          headers: request.headers,

          body:
            request.method === "GET"
            ? undefined
            : request.body
        }
      );



      return new Response(
        response.body,
        {
          status: response.status,

          headers: {
            ...corsHeaders,

            "Content-Type":
              response.headers.get(
                "Content-Type"
              ) || "application/json"
          }
        }
      );


    } catch (e) {


      return new Response(
        JSON.stringify({
          error: "Backend unavailable",
          message: e.message
        }),
        {
          status: 502,
          headers: {
            ...corsHeaders,
            "Content-Type":"application/json"
          }
        }
      );


    }

  }
};
