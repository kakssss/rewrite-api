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
    const huggingfaceResponse = await axios.post(
      'https://api-inference.huggingface.co/models/google/flan-t5-large',
      { inputs: `Paraphrase this:\n${text}` },
      {
        headers: {
          Authorization: `Bearer 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`,
        },
      }
    );

    const rewritten = huggingfaceResponse.data?.[0]?.generated_text || '❌ No response';
    res.status(200).json({ rewritten });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to rewrite' });
  }
};
