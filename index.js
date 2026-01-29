// index.js
const http = require("http");
const WebSocket = require("ws");
const crypto = require("crypto");

// ---------------------- Logger ----------------------
const Logger = {
  info: console.log,
  warn: console.warn,
  error: console.error,
  success: (msg) => console.log("\x1b[32m%s\x1b[0m", msg), // green
  debug: console.debug,
};

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

  handleConnection(ws, request) {
    const clientId = this.generateClientId();
    const client = {
      id: clientId,
      ws,
      connectedAt: new Date(),
      lastActivity: new Date(),
      requestCount: 0,
      isAnonymous: true,
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

// ---------------------- Random Articles ----------------------
const randomArticles = [
  { id: 1, title: "Breaking News: Cats Take Over the Internet" },
  { id: 2, title: "AI Writes Its First Novel" },
  { id: 3, title: "SpaceX Launches Potato Into Orbit" },
  { id: 4, title: "New Coffee Trend: Blue Latte" },
  { id: 5, title: "Time Travel Discovered in Lab Basement" },
];

function getRandomArticle() {
  const index = Math.floor(Math.random() * randomArticles.length);
  return randomArticles[index];
}

// ---------------------- Setup WebSocket Server ----------------------
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("WebSocket server running");
});

const wsService = new PreviewWebSocketService();
wsService.initialize(server);

// Register an event to send a random article
wsService.on("get_random_article", async (ws, req, clientId) => {
  const article = getRandomArticle();
  ws.send(JSON.stringify({
    data: {
      articles: [article] // ✅ wrap in array
    }
  }));
});

// Optional: continuously push random articles every 5 seconds
setInterval(() => {
  wsService.broadcast({ type: "random_article", article: getRandomArticle() });
}, 5000);

// Start HTTP server
server.listen(PORT, () => Logger.success(`Server listening on port ${PORT}`));
