require("dotenv").config();
const express = require("express");
const app = express();
const mailjet = require('node-mailjet').apiConnect('c9148b25b19bfe5fed34e0adcc5d3851', 'dfa5edbaf033c09bf730417aa8de04da')

const connectDB = require("./config/databaseConnection");
const userModel = require("./models/userModel");
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/user", (req, res) => {

})

app.post("/send", (req, res) => {
    const { email, name } = req.body;
    if (!name || !email) return res.json({ error: "all field is required" })
    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'alizarazi.30@gmail.com',
                    Name: 'Demo trial',
                },
                To: [
                    {
                        Email: email,
                        Name: name
                    },
                    // {
                    //     Email: 'softpk@gmail.com'
                    // }
                ],
                Subject: 'Hope u r doing well!',
                TextPart: 'Hope you are doing well',
                HTMLPart: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
            text-align: center;
        }

        p {
            color: #666;
            line-height: 1.6;
        }

        .button {
            display: inline-block;
            background-color: #ff6600;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
        }

        .button:hover {
            background-color: #cc5500;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Weekly Newsletter</h1>
        <p>Hello there,</p>
        <p>This is our weekly newsletter to keep you updated with the latest news and events at our cafe. Here's what's happening:</p>
        <ul>
            <li>New seasonal drinks added to the menu</li>
            <li>Live music every Friday night</li>
            <li>Special discount for loyalty members</li>
        </ul>
        <p>Don't miss out on the fun! Visit us this week and enjoy a cup of your favorite beverage.</p>
        <p>See you soon!</p>
        <p><a href="https://in.pinterest.com/" class="button">Visit Our Website</a></p>
        <p class="footer">You are receiving this email because you subscribed to our newsletter. <br>If you wish to unsubscribe, <a href="#">click here</a>.</p>
    </div>
</body>
</html>` ,
            },
        ],
    })
    request
        .then(result => {
            const user = new userModel({
                name: name,
                emailStatus: email
            });
            user.save().then(() => res.json("userSaved"))
                .catch((err) => res.json(err));
            // return res.status(200).json(result.body);

        })
        .catch(err => {
            return res.status(err.statusCode);
        })
});

app.listen(8080, () => {
    connectDB();
    console.log("App is up at 8080");
});

