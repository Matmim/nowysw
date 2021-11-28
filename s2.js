const axios = require('axios');
const fs = require('fs')
const exec = require('child_process').exec;



const time = setInterval(() => {
axios.get('https://hst-api.wialon.com/wialon/ajax.html?&svc=token/login&params=%7b%22token%22:%2236fc577051b9d0212d4a0027c486b0d94CABAE4CDA78A1B78F42DF800DDACE5B7611BDAE%22,%22fl%22:3%7d')
  .then(res => {
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  //  console.log('Status Code:', res.status);
  //  console.log('Date in Response header:', headerDate);

    const obj = res.data;

    
//console.log(obj.eid)

///////////////1111
axios.get(`https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items&params=%7b%22spec%22:%7b%22itemsType%22:%22avl_unit%22,%22propName%22:%22sys_name%22,%22propValueMask%22:%22*%22,%22sortType%22:%22sys_name%22%7d,%22force%22:1,%22flags%22:1,%22from%22:0,%22to%22:0%7d&sid=${obj.eid}`)
  .then(res => {
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  //  console.log('Status Code:', res.status);
  //  console.log('Date in Response header:', headerDate);

    const obj2 = res.data;
//console.log(obj2.items.length)
    

for (var i = 0; i < obj2.items.length; i++) {
////////2
var plik


plik = 'header: { gtfs_realtime_version: "1.0" incrementality: FULL_DATASET   timestamp: ';
const now = new Date()
const sec = Math.round(now.getTime() / 1000)

var ostatni =now.toString();
console.log("noooooo");
plik += sec;
plik +=" }";  
//console.log(i)
axios.get(`https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_item&params={"id":${obj2.items[i].id},"flags":4194305}&sid=${obj.eid}`)
  .then(res => {
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  //  console.log('Status Code:', res.status);
  //  console.log('Date in Response header:', headerDate);

    const obj3 = res.data;
//console.log(obj3)


////wyciag danych

plik +="entity: {id: ";
plik +=JSON.stringify(obj3.item.nm);

plik +=" vehicle: { position: { latitude: ";
plik +=JSON.stringify(obj3.item.pos.y);
plik +=" longitude: ";

plik +=JSON.stringify(obj3.item.pos.x);
plik +=" } timestamp: ";


plik +=JSON.stringify(obj3.item.pos.t);


plik +=" vehicle: { id: ";
plik +=JSON.stringify(obj3.item.nm);
plik +="}}}";







  })
  .catch(err => {
    console.log('Error: ', err.message);
  });






/////////2 zamkniecie for
}

//console.log(plik)

function zapis() {
    

    fs.writeFile('Output.test', plik, (err) => {

        // In case of a error throw err.
        if (err) throw err;
      })
    
    

      exec ('protoc --encode=transit_realtime.FeedMessage gtfs.proto < Output.test > gtfsvh.pb' , (e,stdout, stderr)=> {
        if (e instanceof Error){
         //   console.error(e);
         //   throw e;
        }
        //console.log('stdout', stdout);
       // console.log('stderr', stderr)
      });



}



setTimeout(zapis, 3000);








    
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });

/////////////////11111
    
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });


}, 8220);