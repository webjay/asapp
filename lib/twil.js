var twilio = require('twilio');
 
var client = new twilio.RestClient('AC1619b6b37807d56fe54a84c1470f8d43', '537d14246384d1cd2775063d5249eba9');

var our_number = '+12254127277';


module.exports = {
  
  sendSms: function (to, msg) {
    if (!to) {
      return;
    }
    msg += "\n";
    msg += 'http://asapapp.herokuapp.com/';
    client.sms.messages.create({
      to: to,
      from: our_number,
      body: msg
    }, function (err, message) {
      if (err) {
        return console.error(err);
      }
      console.log(message);
    });
  }

}