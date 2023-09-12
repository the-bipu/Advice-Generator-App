import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async function(req, res){
    try {
        const result = await axios.get("https://api.adviceslip.com/advice");
        res.render("index.ejs", {id: result.data.slip.id, advice: result.data.slip.advice});
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Sir, Your server is ready on port 3000 in your honour.")
})