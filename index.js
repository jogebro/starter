const fs = require('fs');
const http = require('http');
const url = require('url');

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

const server = http.createServer((req, res)=>{
    const pathUrl = req.url
    
    if (pathUrl === "/overview" || pathUrl === "/") {
        res.end("Esta es la pagina principal")
    } else if (pathUrl === "/product"){
        res.end("Esta es la pagina de productos")
    } else {
        res.writeHead(400, {
            "content-type":"text/html"
        })
        res.end("<h1>Page not Found!</h1>")
    }
})

port = 8000
ip = "127.0.0.1"
server.listen(port, ip, ()=>{
    console.log(`Escuchando desde el puerto ${port}`);
})