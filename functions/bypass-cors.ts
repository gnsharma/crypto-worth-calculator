import fetch from "node-fetch";
import { Handler } from "@netlify/functions";

const handler: Handler = async () => {
  const response = await fetch(`https://api.wazirx.com/api/v2/tickers`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(response),
  };
};

export { handler };
