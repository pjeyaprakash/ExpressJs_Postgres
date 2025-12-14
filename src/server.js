import http from "http";
import app from "./app.js";
import {env} from "./config/env.js";

const server = http.createServer(app);

server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

server.listen(env.port, () => {
    console.log(`🚀 Server running on port: ${env.port}`)
})
