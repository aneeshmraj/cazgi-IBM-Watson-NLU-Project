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
   let naturalLanguageUnderstanding = getNLUInstance()    
    const analyzeparams = {
        'url': req.query.url,
        'features': {
            'emotion' : {                
            }
        } 
    }
    naturalLanguageUnderstanding.analyze(analyzeparams).then(analysisResults =>
         {    
            console.log(JSON.stringify(analysisResults, null, 2))
            const emotionresponse = analysisResults.result.emotion.document.emotion    
            console.log(emotionresponse)                 
            return res.send(emotionresponse); 
         }).catch(err => 
         {
            console.log(err)
            return res.send("Error"); 
    })
});

app.get("/url/sentiment", (req,res) => {
   let naturalLanguageUnderstanding = getNLUInstance()    
    const analyzeparams = {
        'url': req.query.url,
        'features': {
            'sentiment' : {                
            }
        } 
    }
    naturalLanguageUnderstanding.analyze(analyzeparams).then(analysisResults =>
         {    
            console.log(JSON.stringify(analysisResults, null, 2))
            const sentimentresponse = analysisResults.result.sentiment.document.label    
            console.log(sentimentresponse)                 
            return res.send(sentimentresponse); 
         }).catch(err => 
         {
            console.log(err)
            return res.send("Error"); 
    })
});

app.get("/text/emotion", (req,res) => {
    let naturalLanguageUnderstanding = getNLUInstance()    
    const analyzeparams = {
        'text': req.query.text,
        'features': {
            'emotion' : {                
            }
        } 
    }
    naturalLanguageUnderstanding.analyze(analyzeparams).then(analysisResults =>
         {    
            console.log(JSON.stringify(analysisResults, null, 2))
            const emotionresponse = analysisResults.result.emotion.document.emotion    
            console.log(emotionresponse)                 
            return res.send(emotionresponse); 
         }).catch(err => 
         {
            console.log(err)
            return res.send("Error"); 
    })
});

app.get("/text/sentiment", (req,res) => {
    let naturalLanguageUnderstanding = getNLUInstance()    
    const analyzeparams = {
        'text': req.query.text,
        'features': {
            'sentiment' : {                
            }
        } 
    }
    naturalLanguageUnderstanding.analyze(analyzeparams).then(analysisResults =>
         {    
            console.log(JSON.stringify(analysisResults, null, 2))
            const sentimentresponse = analysisResults.result.sentiment.document.label    
            console.log(sentimentresponse)                 
            return res.send(sentimentresponse); 
         }).catch(err => 
         {
            console.log(err)
            return res.send("Error"); 
    })
    
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

