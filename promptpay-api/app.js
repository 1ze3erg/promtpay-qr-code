const express = require("express");
const generatePayload = require("promptpay-qr");
const qrcode = require("qrcode");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/create-qr", (req, res) => {
    const { mobileNumber, amount } = req.body;
    console.log(mobileNumber);
    console.log(+amount);
    const payload = generatePayload(mobileNumber, { amount: +amount }); //First parameter : mobileNumber || IDCardNumber
    console.log(payload);

    // Convert to SVG QR Code
    const options = { type: "svg", color: { dark: "#000", light: "#fff" } };
    qrcode.toString(payload, options, (err, svg) => {
        if (err) return console.log(err);
        fs.writeFileSync("./qr.svg", svg);
        console.log(svg);
        res.send(svg);
    });
});

app.listen(8888, () => {
    console.log("server is running on port 8888...");
});
