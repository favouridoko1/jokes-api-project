const { createServer } = require("http");
const port = 5000;

let db = require("./db/jokes");

console.log(db);

const requestHandler = (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    getJokes(req, res);
  } else if (req.url === "/jokes/:1" && req.method === "PUT") {
    updateJokes(req, res);
  } else if (req.url === "/jokes/:1" && req.method === "POST") {
    postJokes(req, res)
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: true, message: "Not found" }));
  }
};

function getJokes(res, res) {
  res.writeHead(200);
  res.end(JSON.stringify({ data: db, message: "data fetched successfully" }));
}

function updateJokes(req, res) {
    const body = [];

  const id = +req.url.split("/")[2];


    req.on('data', (chunk)=> {
        body.push(chunk);
    })

    res.on('end', ()=> {
        const convertedBuffer = Buffer.concat(body).toString()
        const jsonRes = JSON.parse(convertedBuffer)

        const updateDB = db.map(item => {
            if(item.id === id) {
                return {
                    ...item,

                    ...jsonRes,
                }
            } return item
        })

        db = updateDB
        
    })

  res.writeHead(200);
  res.end(JSON.stringify(db));
}

const server = createServer(requestHandler);
server.listen(port, () => console.log(`Server listening on port ${port}`));
