// index.js
const http = require("http");
const WebSocket = require("ws");
const crypto = require("crypto");
const { DUMMY_DS_ARTICLES, getAvailableCategories } = require("./dsArticles.data");

// ---------------------- Logger ----------------------
const Logger = {
  info: console.log,
  warn: console.warn,
  error: console.error,
  success: (msg) => console.log("\x1b[32m%s\x1b[0m", msg),
  debug: console.debug,
};

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ---------------------- PreviewWebSocketService ----------------------
class PreviewWebSocketService {
  constructor() {
    this.wss = null;
    this.clients = new Map();
    this.eventHandlers = new Map();
  }

  generateClientId() {
    return `client_${crypto.randomUUID()}`;
  }

  on(eventType, handler) {
    this.eventHandlers.set(eventType, { handler });
    Logger.info(`Registered handler for event: ${eventType}`);
  }

  initialize(httpServer, path = "/preview") {
    this.wss = new WebSocket.Server({ server: httpServer, path });
    this.wss.on("connection", this.handleConnection.bind(this));
    this.wss.on("error", (err) => Logger.error("WebSocket server error:", err));
    Logger.success(`WebSocket service initialized on ${path}`);
  }

  handleConnection(ws) {
    const clientId = this.generateClientId();
    const client = {
      id: clientId,
      ws,
      connectedAt: new Date(),
      lastActivity: new Date(),
      requestCount: 0,
    };
    this.clients.set(clientId, client);

    Logger.info(`Client connected: ${clientId} | Total clients: ${this.clients.size}`);
    ws.send(JSON.stringify({ type: "connection_established", client_id: clientId }));

    ws.on("message", (buffer) => this.handleMessage(ws, clientId, buffer));
    ws.on("close", () => this.handleClose(clientId));
    ws.on("error", (err) => Logger.error(`WebSocket error for ${clientId}:`, err));
  }

  async handleMessage(ws, clientId, buffer) {
    const client = this.clients.get(clientId);
    client.lastActivity = new Date();
    client.requestCount++;

    let parsed;
    try {
      parsed = JSON.parse(buffer.toString("utf8"));
    } catch {
      ws.send(JSON.stringify({ error: "Invalid JSON" }));
      return;
    }

    const eventType = parsed.event_type;
    if (!eventType) {
      ws.send(JSON.stringify({ error: "Missing 'event_type'" }));
      return;
    }

    const route = this.eventHandlers.get(eventType);
    if (!route) {
      ws.send(JSON.stringify({ error: `Unknown event_type: ${eventType}` }));
      return;
    }

    await route.handler(ws, parsed, clientId);
  }

  handleClose(clientId) {
    this.clients.delete(clientId);
    Logger.info(`Client disconnected: ${clientId} | Remaining clients: ${this.clients.size}`);
  }

  broadcast(message) {
    const data = JSON.stringify(message);
    this.clients.forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(data);
      }
    });
  }
}

// ---------------------- Setup WebSocket Server ----------------------
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("WebSocket server running");
});

const wsService = new PreviewWebSocketService();
wsService.initialize(server);

// ---------------------- Event Handlers ----------------------
wsService.on("ds_article_stream", async (ws, req) => {
  // Optional category filter
  let articles = [...DUMMY_DS_ARTICLES];
  if (req.category && req.category.toLowerCase() !== "all") {
    const catLower = req.category.toLowerCase();
    articles = articles.filter(a => a.CATEGORY.toLowerCase().includes(catLower));
  }

  // Optional count limit
  const count = req.count && req.count > 0 ? Math.min(req.count, articles.length) : 1;

  // // Pick random articles
  // const shuffled = articles.sort(() => Math.random() - 0.5);
  // const selected = shuffled.slice(0, count);

  // Shuffle and pick random count (1 to 10)
  const randomCount = Math.floor(Math.random() * 10) + 1;
  const shuffled = shuffleArray(articles);
  const randomArticles = shuffled.slice(0, Math.min(randomCount, shuffled.length));

  ws.send(JSON.stringify({
    success: true,
    event_type: "ds_article_stream_data",
    data: {
      articles: randomArticles,
      count: randomArticles.length
    },
  }));
});

// ---------------------- Interval broadcast (random-length arrays) ----------------------
setInterval(() => {
  const articles = [...DUMMY_DS_ARTICLES];

  // Shuffle and pick random count (1 to 10)
  const randomCount = Math.floor(Math.random() * 10) + 1;
  const shuffled = shuffleArray(articles);
  const randomArticles = shuffled.slice(0, Math.min(randomCount, shuffled.length));

  wsService.broadcast({
    success: true,
    event_type: "ds_article_stream_data",
    data: {
      articles: randomArticles,
      count: randomArticles.length
    },
  });
}, 5000); // every 5 seconds

// ---------------------- Start server ----------------------
server.listen(PORT, () => Logger.success(`Server listening on port ${PORT}`));
