var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var log = require('../log');

var emailAddress = process.env.GMAIL_EMAIL;

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: emailAddress,
        pass: process.env.GMAIL_PASS 
    }
});

router.post('/contact', function(req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var body = req.body.message;
	
    var mailOptions = {
        from: "Adam's Web Bot" + emailAddress, // sender address
        to: emailAddress, // list of receivers
        subject: subject,
        text: body,
        html: '<p>' + email + '</p>' + '<p>' + body + '</p>' // html body
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            log.log(error);
            res.status(500).send("There was a server error.  Just email me adamcmiel@gmail.com");
        }else{
            log.info(info.response);
            res.redirect('/');
        }
    });
});

module.exports = router;

