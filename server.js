const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const history = require('connect-history-api-fallback');

app.use(history({
    verbose: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});