// index.js
const http = require("http");
const WebSocket = require("ws");
const crypto = require("crypto");
const { DUMMY_DS_ARTICLES } = require("./dsArticles.data");

// ---------------------- WebSocket Service ----------------------
class PreviewWebSocketService {
  constructor() {
    this.wss = null;
  }

  initialize(httpServer, path = "/preview") {
    this.wss = new WebSocket.Server({ server: httpServer, path });
    this.wss.on("connection", this.handleConnection.bind(this));
    console.log(`WebSocket service initialized on ${path}`);
  }

  handleConnection(ws) {
    ws.on("message", (buffer) => this.handleMessage(ws, buffer));
    ws.send(JSON.stringify({ type: "connection_established" }));
  }

  handleMessage(ws, buffer) {
    let parsed;
    try {
      parsed = JSON.parse(buffer.toString("utf8"));
    } catch {
      ws.send(JSON.stringify({ error: "Invalid JSON" }));
      return;
    }

    if (parsed.event_type === "get_articles") {
      let articles = [...DUMMY_DS_ARTICLES];

      // Optional category filter
      if (parsed.category && parsed.category.toLowerCase() !== "all") {
        const catLower = parsed.category.toLowerCase();
        articles = articles.filter(a => a.CATEGORY.toLowerCase().includes(catLower));
      }

      // Random number of articles
      const randomLength = Math.floor(Math.random() * articles.length) + 1;

      // Pick random articles
      const shuffled = [...articles].sort(() => 0.5 - Math.random());
      const randomArticles = shuffled.slice(0, randomLength);

      // Send only the array
      ws.send(JSON.stringify(randomArticles));
    }
  }
}

// ---------------------- HTTP + WebSocket ----------------------
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("WebSocket server running");
});

const wsService = new PreviewWebSocketService();
wsService.initialize(server);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
