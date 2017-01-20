var express = require('express');
var router = express.Router();
// create reusable transporter object using the default SMTP transport
var request = require("request");

router.post('/send', function(req, res) {
    //console.log("I am here!!");
    var thisSMS = req.body;
    var to = thisSMS.to;
    var message = thisSMS.message;
    console.log("To: " + to + " Message: " + message);
    
    var url = "http://login.bulksmsgateway.in/sendmessage.php?user=gaurav19&password=Amplifier@9&mobile=";
    url += to;
    url += "&message=";
    url += message;
    url += "&sender=EDUCNC&type=3";
    request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body) // Print the json response
            }
    });
});
module.exports = router;