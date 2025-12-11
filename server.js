const express = require('express');
const app = express();
const fetch = require('node-fetch');
const nodeBase64 = require('nodejs-base64-converter');
const FormData = require('form-data');
const form = new FormData();
app.get('/:page', (req, res) => {
  res.send({message:'Hello from App Engine!',data:req.params.page});
});
/*
app.post('/', async(req, res) => {
    //res.send({data:req.body});

POST /token HTTP/1.1

Host: api.communico.co

Authorization: Basic HtdjYy3Se2E3Ddf845j4TFh44ktE

Content-Type: application/x-www-form-urlencoded;charset=UTF-8



Body

grant_type=client_credentials
*/
//const URL = 'https://api.communico.co/v3/token';
//const body = 'grant_type=client_credentials';
/*
fetch(URL, {
    "headers": {
        //'Authorization': 'Basic ' + nodeBase64.encode('tzHFpOy9EDWrIHjKL93F:P0ydOw2s578DZ03UZFWe')
        'Authorization': 'Basic HtdjYy3Se2E3Ddf845j4TFh44ktE'
      },
      "muteHttpExceptions": true,
      "method": 'POST',
      "body": "{'grant_type':'client_credentials'}"
}).then(res => res.text())
  .then(body => console.log(JSON.parse(body)));

  form.append('grant_type', 'client_credentials')

    var options = {
      headers: {
        //'Authorization': 'Basic ' + Utilities.base64Encode('tzHFpOy9EDWrIHjKL93F:P0ydOw2s578DZ03UZFWe')
        'Authorization': 'Basic ' + nodeBase64.encode('tzHFpOy9EDWrIHjKL93F:P0ydOw2s578DZ03UZFWe')
    },
      muteHttpExceptions: true,
      method: 'POST',
      body: form
    } 
    Logger.log(options);
    const getToken = await fetch('https://api.communico.co/v3/token', options);
    const data = await getToken.json();
    const token = data.access_token;
    res.send(token);
    //res.send(getToken);
    //var response = JSON.parse(getToken.getContentText());
    //var token = response.access_token;

    //var auth = getAuthorization();
    //res.send(auth);
    /*var today = new Date();
    var apiDate = Utilities.formatDate(today, 'America/New_York', 'yyyy-MM-dd');
    var eventList = UrlFetchApp.fetch('https://api.communico.co/v3/attend/events?start=0&limit=40&privateEvents=true&status=published&startDate=' + apiDate + '&searchTags=StaffTraining', {
      headers: {
        'Authorization': 'Bearer ' + auth
      },
      muteHttpExceptions: true
    });
  
    var html = '<html><head>';
    html += '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans:400">';
    html += '<style>';
    html += 'h3 {font-family:"Montserrat", sans-serif; padding: 10px, 0;color: #1c4750;}';
    html += 'p {font-family:"Open Sans", sans-serif;}';
    html += 'p.title {font-size:16px;}';
    html += 'p.date {font-size:12px; color: gray;border-bottom:1px solid grey; margin-top:-6px; padding-bottom:6px}';
    html += 'a {color: #1c4750; text-decoration: none;}';
    html += '</style></head><body>';
    html += "<h3>Upcoming Training</h3>";
    var listOutput = JSON.parse(eventList);
    var events = listOutput.data.entries;
    var date = new Date();
    var list = [];
    for (var e = 0; e < events.length; e++) {
      var event = events[e];
      var modified = event.modified;
      Logger.log(modified);
      if (modified == 'canceled') {
      } else {
          //c++;
          Logger.log(event.title);
          var eventId = event.eventId;
          var title = event.title;
          var subtitle = event.subTitle;
          var eventStart = event.eventStart;
          var date = new Date(Date.parse(eventStart));
          var location = event.locationName;
          var room = event.roomName;
          html += '<p class=title><a href="https://sclsnj.libnet.info/event/' + eventId + '" target="_blank">' + title;
          if (subtitle) {
            html += ': ' + subtitle;
          }
          html += "</a></p>";
          html += "<p class=date>" + Utilities.formatDate(date, 'America/New_York', 'EEEE, MMMM d, yyyy h:mm aaa') + " | " + location;
          if (room) {
            html += " - " + room + "</p>";
          } else {
            html += "</p>";
          }
      }
    }
    html += "</body></html>";  
    var output = HtmlService.createHtmlOutput(html);
    output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

    res.send(output);*/

 // });
  
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

function getAuthorization() {
    var body = 'grant_type=client_credentials';
    var options = {
      headers: {
        'Authorization': 'Basic ' + Utilities.base64Encode('tzHFpOy9EDWrIHjKL93F:P0ydOw2s578DZ03UZFWe')
      },
      muteHttpExceptions: true,
      method: 'POST',
      payload: body
    } 
    Logger.log(options);
    var getToken = UrlFetchApp.fetch('https://api.communico.co/v3/token', options);
    var response = JSON.parse(getToken.getContentText());
    var token = response.access_token;
    return token;
  }