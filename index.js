import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const app = express();
app.use(express.static('assets'));

app.use(bodyParser.urlencoded({extended: true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", async function(req, res) {
    try {
        const result = await axios.get("https://api.adviceslip.com/advice");
        res.render("index", { id: result.data.slip.id, advice: result.data.slip.advice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Sir, Your server is ready on port 3000 in your honour.")
})