const express = require('express');
const app = express();
const path = require('path');

// Link to running solution: https://fractalfox-headermicroservice.glitch.me/
app.all('/', (req, res) => {
  res.status(200);
  let nat = req.rawHeaders;
  console.log("Serving index.html");
  let a = nat[13].toString().split(')');
  a = a[0].toString().split('(');
  let b = a[0].toString().concat(a[1]);
  b = "(" + b + ")";
  console.log(nat[17].toString().split(',').shift());
  let c = nat[3].split(',')[0];
  //console.log(nat[3].split(',')[0]);
  res.set({'content-type': 'text/html'});
  res.write("<h1>Working</h1>");
  res.write("<h3><a target='_self' href='https://fractalfox-headermicroservice.glitch.me/getInfo/'>Link</a></h3>");
  res.end();
});
app.all('/getInfo/', (req, res) => {

  // errors out on localhost.
  if(req.headers.host.split(':').shift() == 'localhost'){
    res.status(200);
    res.set({'content-type':'application/json'});
    res.json({error: 'localhost'});
    res.end();

  }else{
    try{
      let a = req.headers['user-agent'].split(')').shift();
      a = "(" + a.toString().split('(').pop() + ")";
      let jObj = {
        ip: req.headers['x-forwarded-for'].split(',').shift(),
        lang: req.headers['accept-language'].split(',').shift(),
        software: a
      };
      res.status(200);
      res.set({'content-type':'application/json'});
      res.json(jObj);
      res.end();
    }
    catch(err){
      console.log(err);
      let jObj = {
        error: "Bad headers/assumed missing header info"
      }
      res.status(200);
      res.set({'content-type':'application/json'});
      res.json(jObj);
      res.end();
    }
  }

});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});