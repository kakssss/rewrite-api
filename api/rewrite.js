const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Missing text' });
  }

  try {
    const hfRes = await axios.post(
      'https://api-inference.huggingface.co/models/google/flan-t5-xl',
      {
        inputs: `Paraphrase the following professionally:\n\n"${text}"`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
      }
    );

    console.log("✅ HF response:", hfRes.data);

    const rewritten = hfRes.data?.[0]?.generated_text || '❌ No response from model';
    res.status(200).json({ rewritten });

  } catch (err) {
    console.error("❌ Error from HuggingFace:", err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to rewrite' });
  }
};
