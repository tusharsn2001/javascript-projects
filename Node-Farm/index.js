const http = require("http");
const url = require("url");
const fs = require("fs");


const replaceTemplate = (temp,product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName)
    output = output.replace(/{%IMAGE%}/g,product.image)
    output = output.replace(/{%PRICE%}/g,product.price)
    output = output.replace(/{%COUNTRY%}/g,product.from)
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients)
    output = output.replace(/{%QUANTITY%}/g,product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g,product.description)
    output = output.replace(/{%ID%}/g,product.id)
    if(!product.organic)  output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic')
    return output;
}


const data = fs.readFileSync("data.json", "utf-8")
const overview = fs.readFileSync("overview.html", "utf-8")
const templateCard = fs.readFileSync("template-card.html", "utf-8")
const product = fs.readFileSync("product.html", "utf-8")
const dataObj = JSON.parse(data)


// SERVER
const server = http.createServer((req, res) => {
//const pathname = req.url;

const {query , pathname} = url.parse(req.url,true);

  //Overview page
  if (pathname === "/" || pathname == "/overview") {
    res.writeHead(200,{'Content-type' : 'text/html'})
  
    const cardsHtml = dataObj.map(ele => replaceTemplate(templateCard,ele)).join('')
    //console.log(cardsHtml)
    const output = overview.replace('{%PRODUCT_CARDS%}',cardsHtml)
    res.end(output);

  } 
  //Product page
  else if (pathname == "/product") {
    res.writeHead(200,{'Content-type' : 'text/html'})
    const productArr = dataObj[query.id]
    const output = replaceTemplate(product,productArr);
    res.end(output)
  }
  //APi
  else if (pathname == "/api") {
    res.writeHead(200,{'Content-type' : 'application/json'})
    res.end(data);
  
  // NOt found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
