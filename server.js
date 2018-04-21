const express = require('express');
const app = express();
const path = require('path');

// Link to running solution: https://fractalfox-headermicroservice.glitch.me/
// Link in this index.html points to the running solution, fyi
app.all('/', (req, res) => {
  res.status(200);
  let lang = req.rawHeaders;
  console.log("Serving index.html");
  let a = lang[13].toString().split(')');
  a = a[0].toString().split('(');
  let b = a[0].toString().concat(a[1]);
  b = "(" + b + ")";
  console.log(lang[17].toString().split(',').shift());
  //console.log(nat[3].split(',')[0]);
  res.set({'content-type': 'text/html'});
  res.write("<h1>Working</h1>");
  res.write("<h3><a target='_self' href='https://fractalfox-headermicroservice.glitch.me/getInfo/'>Get My Info</a></h3>");
  res.end();
});
app.all('/getInfo/', (req, res) => {
  console.log("Serving Info: " + new Date());
  console.log(req.headers['accept-language'].split(',').shift());
  let ipAddr = (req.headers['x-forwarded-for']).split(',');
  ipAddr = ipAddr.shift();

  try{
    let a = req.headers['user-agent'].split(')').shift();
    a = "(" + a.toString().split('(').pop() + ")";
    let jObj = {
      ip: ipAddr,
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
    let full = res.headers.toString();
    let jObj = {
      error: "Unable to parse user content",
      fullHeader: full
    }
    res.status(200);
    res.set({'content-type':'application/json'});
    res.json(jObj);
    res.end();
  }
}
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
