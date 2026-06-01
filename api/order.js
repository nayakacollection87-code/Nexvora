export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method Not Allowed"
    });
  }

  try {
    // Parse body dengan aman
    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    if (!body) {
      return res.status(400).json({
        success: false,
        error: "Request body kosong"
      });
    }

    const { link, quantity } = body;

    if (!link || !quantity) {
      return res.status(400).json({
        success: false,
        error: "link dan quantity wajib diisi"
      });
    }

    const response = await fetch("https://smm.id/api/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        key: process.env.SMM_API_KEY,
        action: "add",
        service: process.env.SMM_SERVICE_ID,
        link: String(link),
        quantity: String(quantity)
      })
    });

    const data = await response.json();

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
