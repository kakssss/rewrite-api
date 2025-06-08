const express = require('express');
console.log("🚨 Starting Server.."); // ← دي للتأكيد
const bodyParser = require('body-parser');
const rewriteHandler = require('./api/rewrite');

const app = express();
app.use(bodyParser.json());

app.post('/api/rewrite', rewriteHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
