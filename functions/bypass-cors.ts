import  fetch from "node-fetch";

exports.handler = async () => {
  const response = await fetch(`https://api.wazirx.com/api/v2/tickers`).then((response) => response.json()).catch((error) => console.error(error));
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};
