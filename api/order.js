export default async function handler(req, res) {
  try {
    const { link, quantity } = req.body;

    const response = await fetch("https://smm.id/api/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        key: process.env.SMM_API_KEY,
        action: "add",
        service: process.env.SMM_SERVICE_ID,
        link: link,
        quantity: quantity
      })
    });

    const data = await response.json();

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
