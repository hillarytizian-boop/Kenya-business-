const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

app.use(express.static('html-site'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'html-site', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Business Hub Kenya running on port ${port}`);
});
