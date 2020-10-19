const app = require("./server/app");
const config = require("./server/config");
//require("./server/db");

const port = config.PORT || 3000;
app.listen(port);

console.log(`The server is running on port: ${port} in ${config.ENV} mode`);
