const http = require('http');
const fs= require('fs');
var requests = require("requests");

const homeFile = fs.readFileSync("home.html","utf-8");

const replaceVal= (tempVal,orgVal) =>{
    let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}",orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%country%}",orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
    
    return temperature;
}

const server =http.createServer((req,res)=>{
    if(req.url == "/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=Nashik&appid=f9d9d2d83d87e2448bed2b7fd4028bba")
        .on("data",(chunk)=>{
            const objData = JSON.parse(chunk);
            const arrData = [objData]
            //console.log(arrData[0].main.temp);
            const realTimeData = arrData.map((val) =>
                replaceVal(homeFile, val)).join("");
            res.write(realTimeData);
            //console.log(realTimeData);
        })
        .on("end",(err) => {
            if(err) return console.log("Connection closed due to errors");
            res.end();
        });
    }
});

const port = process.env.PORT|| 8000;
server.listen(port,"127.0.0.1");