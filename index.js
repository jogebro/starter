const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemp = require('./modules/replaceTemplate.js');

/* const textInt = fs.readFileSync('./txt/input.txt','utf-8')

const textOut = `esto es lo que sabemos de los aguacates: ${textInt}.\nCreted on ${Date.now()}`
fs.writeFileSync('./txt/output.txt', textOut)

const textInt2 = fs.readFileSync('./txt/output.txt','utf-8')
console.log(textInt2);
console.log('File written');
 */

/* fs.readFile('./txt/start.txt','utf-8', (err,data1)=>{
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
        console.log(data2);
        fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
            console.log(data3);
            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8', err =>{
                console.log('Guardado correctamente ✅');
            })
        })
    })
})

console.log('Leyendo archivo...'); */

//SERVER
const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8');

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //OVERVIEW PAGE
  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHtml = dataObj.map((el) => replaceTemp(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);
  }
  //PRODUCT PAGE
  else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemp(tempProduct, product);
    res.end(output);
  }
  //API
  else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  }
  //NOT FOUND
  else {
    res.writeHead(400, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not Found!</h1>');
  }
});

port = 8000;
ip = '127.0.0.1';
server.listen(port, ip, () => {
  console.log(`Escuchando desde el puerto ${port}`);
});
