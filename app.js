require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true})); //To activate or use body parser
app.use(express.static("public")); //access the public folder that contains css so server can read css.



app.get("/", function(req, res){
    res.render("index");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.get("/services", function(req, res){
    res.render("services");
});

app.get("/projects", function(req, res){
    res.render("projects");
});

app.get("/blog", function(req, res){
    res.render("blog");
});

app.get("/thank-you", function(req, res){
    res.render("thank-you");
});

app.get("/contact", function(req, res){
    res.render("contact");
});

app.get("/error", function(req, res){
    res.render("error");
});

app.post("/submit_contact", function (req, res) {
    const { name, email, phone, message } = req.body;

    // Create a Nodemailer transporter using Gmail
    const transporter = nodemailer.createTransport(
        smtpTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.GMAIL_PASS
            },
        })
    );

    // Email options
    const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: process.env.TO_EMAIL,
        subject: "New Contact Form Submission",
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
        `,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.redirect("/error"); // Redirect to the error page if there's an issue
        } else {
            console.log("Email sent: " + info.response);
            res.redirect("/thank-you"); // Redirect to the thank-you page on successful email submission
        }
    });
});



app.listen(3000, function(){
    console.log("Server started on port 3000");
});


