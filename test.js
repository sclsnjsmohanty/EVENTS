const express = require('express');
const axios = require('axios');
const app = express();
//const fetch = require('node-fetch');
const nodeBase64 = require('nodejs-base64-converter');
const FormData = require('form-data');
const form = new FormData();
const date = require('date-and-time');
const moment = require("moment");

app.get('/:s', async(req, res) => {
        const eventType = req.params.s;
        const body = 'grant_type=client_credentials';
        form.append('grant_type', 'client_credentials') 
        const today = new Date();
        const apiDate = moment().format("yyyy-MM-DD");
        const data = await generateAccessTokenAxios();
        const auth = data.access_token;
    
        var options_event = {
            headers: {
              //'Authorization': 'Basic ' + Utilities.base64Encode('tzHFpOy9EDWrIHjKL93F:P0ydOw2s578DZ03UZFWe')
               'Authorization': 'Bearer ' + auth
             },
            muteHttpExceptions: true
          }

        const encoded = encodeURI(eventType);
      /* if (eventType == 'NJMakersDay') {*/
        const response = await fetch(
           'https://api.communico.co/v3/attend/events?start=0&limit=10&startDate='+apiDate+'&searchTags=%23'+eventType,
            {
                method: 'GET',
                headers: {
                    //'Authorization': 'Basic ' + Utilities.base64Encode('tzHFpOy9EDWrIHjKL93F:P0ydOw2s578DZ03UZFWe')
                     'Authorization': 'Bearer ' + auth
                   },
                  muteHttpExceptions: true
            }
        );
        /*} else {
            const response = await fetch(
                'https://api.communico.co/v3/attend/events?start=0&limit=10&startDate='+apiDate+'&searchTags='+encoded,
                {
                    method: 'GET',
                    headers: {
                        //'Authorization': 'Basic ' + Utilities.base64Encode('tzHFpOy9EDWrIHjKL93F:P0ydOw2s578DZ03UZFWe')
                         'Authorization': 'Bearer ' + auth
                       },
                      muteHttpExceptions: true
                }
            );           
        }*/

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const eventData = await response.json();
        let html = '<html><head>';
        html += '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans:400">';
        html += '<style>';
        html += 'h3 {font-family:"Montserrat", sans-serif; padding: 10px, 0;color: #1c4750;}';
        html += 'p {font-family:"Open Sans", sans-serif;}';
        html += 'p.title {font-size:16px;}';
        html += 'p.date {font-size:12px; color: gray;border-bottom:1px solid grey; margin-top:-6px; padding-bottom:6px}';
        html += 'a {color: #1c4750; text-decoration: none;}';
        html += '</style></head><body>';
        if (eventType == 'NJMakersDay') {
            html += "<h3>"+"Makers Month "+"/ "+"NJ Makers Day"+"</h3>";

        } else {
            html += "<h3>"+eventType+"</h3>";

        }


        const events = eventData.data.entries;
        for (var e = 0; e < events.length; e++) {
            var event = events[e];
            var modified = event.modified;
            //Logger.log(modified);
            if (modified == 'canceled') {
            } else {
                //c++;
                //Logger.log(event.title);
                const eventId = event.eventId;
                const title = event.title;
                const subtitle = event.subTitle;
                const eventStart = event.eventStart;
                const eventDate = new Date(Date.parse(eventStart));
                const location = event.locationName;
                const room = event.roomName;
                //res.send(title);
              html += '<p class=title><a href="https://sclsnj.libnet.info/event/' + eventId + '" target="_blank">' + title;
                if (subtitle) {
                  html += ': ' + subtitle;
                }
                html += "</a></p>";
                //html += "<p class=date>" + Utilities.formatDate(date, 'America/New_York', 'EEEE, MMMM d, yyyy h:mm aaa') + " | " + location;
                html += "<p class=date>" +  date.format(eventDate,'dddd, MMMM DD, YYYY hh:mm A') + " | " + location;
        if (room) {
                  html += " - " + room + "</p>";
                } else {
                  html += "</p>";
                }
            }
          }
          html += "</body></html>";
          //res.send('Hello from App Engine!'+JSON.stringify(eventData));
          res.send(html);

    }
);  
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
async function  generateAccessTokenAxios(){
    form.append('grant_type', 'client_credentials');
  
    const options = {
        headers: {
          //'Authorization': 'Basic ' + Utilities.base64Encode('tzHFpOy9EDWrIHjKL93F:P0ydOw2s578DZ03UZFWe')
          'Authorization': 'Basic ' + nodeBase64.encode('tzHFpOy9EDWrIHjKL93F:P0ydOw2s578DZ03UZFWe')
      },
        muteHttpExceptions: true,
        method: 'POST',
        body:form
      }
  
    try {
      const getToken = await axios({
       url:'https://api.communico.co/v3/token',
       method:"post",
       data:"grant_type=client_credentials",
       auth: {
         username:"tzHFpOy9EDWrIHjKL93F",
         password:"P0ydOw2s578DZ03UZFWe"
      }
    });
      const data =  getToken.data;
      return  data;
  
    } catch (error) {
      console.log(error);
    }
  
  }