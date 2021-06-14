const express = require('express');
const dotenv = require('dotenv');
const app = new express();
dotenv.config();

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
    apikey: api_key,
  }),
  serviceUrl: api_url,
});
return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let naturalLanguageUnderstanding = getNLUInstance();
    let response;
    naturalLanguageUnderstanding.analyze(req.query.url)
 .then(analysisResults => {
    response = JSON.stringify(analysisResults, null, 2);
  })
  .catch(err => {
    response = "error:"+ err;
  });
    console.log(response);
    return res.send(response);
});

app.get("/url/sentiment", (req,res) => {
   let naturalLanguageUnderstanding = getNLUInstance();
   let response;
    naturalLanguageUnderstanding.analyze(req.query.url)
  .then(analysisResults => {
    response = JSON.stringify(analysisResults, null, 2);
  })
  .catch(err => {
    response = "error:"+ err;
  });
  console.log(response);
    return res.send(response);
});

app.get("/text/emotion", (req,res) => {
    let naturalLanguageUnderstanding = getNLUInstance();
    let response;
    naturalLanguageUnderstanding.analyze(req.query.text)
 .then(analysisResults => {
    response = JSON.stringify(analysisResults, null, 2);
  })
  .catch(err => {
    response = "error:"+ err;
  });
  console.log(response);
    return res.send(response);
    
});

app.get("/text/sentiment", (req,res) => {
    let naturalLanguageUnderstanding = getNLUInstance();
    let response;
    naturalLanguageUnderstanding.analyze(req.query.text)
 .then(analysisResults => {
    response = JSON.stringify(analysisResults, null, 2);
  })
  .catch(err => {
    response = "error:"+ err;
  });
  console.log(response);
   return res.send(response);
    
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

