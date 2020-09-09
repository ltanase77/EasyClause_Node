const app = require("./server/app");
const config = require("./server/config");
//require("./server/db");

const port = config.port || 3000;
const server = app.listen(port);

console.log(`The server is running on port: ${port} in ${config.env} mode`);
