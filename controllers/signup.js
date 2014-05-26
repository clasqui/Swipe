var BaseController = require('./Base');
var User = new (require('../models/UserModel'))();
var nodemailer = require('nodemailer');

module.exports = BaseController.extend({

	name: 'Signup',

	run: function(req, res, next){

		var post = req.body;
		User.setDB(req.db);
		
		if(post.su_email == undefined){
			res.redirect('/?err=no_email')
		} else if(post.su_password == undefined){
			res.redirect('/?err=no_password');
		} else {
			User.signUp(post.su_email, post.su_password, function(err, records){
				if(err){
					res.redirect('/?msg=alreadyTaken');
				} else if (records.length !== 1) {
					res.redirect('/?err=notInserted');
				} else {
					// create reusable transport method (opens pool of SMTP connections)
					/*
					var smtpTransport = nodemailer.createTransport("SMTP",{
    					service: "Gmail",
    					auth: {
        					user: "hulehule20@gmail.com",
        					pass: "Marc112009GMAIL"
    					}
					});
					*/

					// setup e-mail data with unicode symbols
					var mailOptions = {
    					from: "Swipe <hello@swipe.com>", // sender address
    					to: post.su_email, // list of receivers
    					subject: "Welcome to Swipe", // Subject line
    					text: "Welcome to swipe, you can now login!", // plaintext body
    					html: "<h2>Welcome to swipe</h2><p>you can now <a href='localhost:3000/'>login</a></p>" // html body
					}

					/*
					// send mail with defined transport object
					smtpTransport.sendMail(mailOptions, function(error, response){
    					if(error){
        					console.log(error);
        					res.send('Successfully registered');
    					}else{
    						res.send('Successfully registered'),
        					console.log("Message sent: " + response.message);
    					}

    					// if you don't want to use this transport object anymore, uncomment following line
    					smtpTransport.close(); // shut down the connection pool, no more messages
    				});
    				*/

    				var mail = nodemailer.mail;
    				mail(mailOptions, function(error, response){
    					if(error){
        					console.log(error);
        					res.redirect('/?msg=registered');
    					}else{
    						res.redirect('/?msg=registered');
        					console.log("Message sent: " + response.message);
    					}

    				});

				}
			});
		}


	}

});