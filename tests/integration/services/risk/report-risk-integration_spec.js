var frisby = require('frisby');

frisby.create('POST /report-risk - Create a risk with a valid contract')
   .post('http://localhost:8080/report-risk', {
      "address": "Chafariz da Rendenção",
      "risk": "Mal Iluminado",
      "date": "10/10/2015",
      "period":"Manhã",
      "location": {
        "longitude": 200,
        "latitude": 300
      }
   })
   .expectStatus(201)
.toss();

frisby.create('POST /report-risk - Must fail when risk has an invalid contract')
   .post('http://localhost:8080/report-risk', {
      "address": "Chafariz da Rendenção",
      "risk": "Mal Iluminado",
      "date": "10/10/2015",
      "period":"Manhã",
      "loction": {
        "longitude": 200,
        "latitude": 300
      }
   })
   .expectStatus(400)
.toss();
