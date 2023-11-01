const express = require("express");
const rp = require("request-promise");
const app = express();

const url = "https://www.oref.org.il/WarningMessages/History/AlertsHistory.json";
const targetNumber = 1;

app.get("/", async (req, res) => {
  try {
    const json = await rp(url, { json: true });
    const numberCount = json.filter(item => Object.values(item).includes(targetNumber)).length;

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Alert Counter</title>
        <style>
            body {
                background: url('https://i.pinimg.com/564x/71/42/76/714276fbc76d7a1f5b00f73eb3e9b63c.jpg') center/cover no-repeat fixed;
                font-family: Arial, sans-serif;
                color: #fff;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                text-align: center;
                padding: 20px;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 10px;
            }
            .alert {
                background: rgba(255, 255, 255, 0.6);
                padding: 10px;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Alert Counter</h1>
            <div class="alert">
                <p>The number of alerts in the past day: ${numberCount}</p>
                <p>Developed by Yonatan & Pikod Horef</p>
            </div>
        </div>
    </body>
    </html>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send("Error fetching or processing JSON data.");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
