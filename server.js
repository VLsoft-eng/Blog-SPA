const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

function staticAssets(app) {
    app.use(express.static(path.join(__dirname, 'public')));
}

function serveFile(filePath) {
    return (req, res) => {
        res.sendFile(filePath);
    };
}

staticAssets(app);
app.get('*', serveFile(path.join(__dirname, 'public', 'index.html')));
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
