# (Monad MCP Plugin)

A custom MCP plugin to fetch MON balances using wallet addresses or private keys on Monad Testnet.

---

## 🚀 Quick Setup

### 1. Clone & Install

```bash
git clone https://github.com/everest1508/moncp-server.git
cd moncp-server
npm install
```

---

### 2. Add Your Private Key


```env
{
  "mcpServers": {
    "Node.js MCP Server": {
      "command": "/home/ritesh/.nvm/versions/node/v22.14.0/bin/node",
      "args": ["/home/ritesh/projects/mcp-server-node/mcp-server.js"],
      "env": {
        "PRIVATE_KEY": "add private key here"
      }
    }
  }
}

```

---

---

### 3. Use It in Cursor 🧩

- Restart Cursor
- Use `getBalance`, `getBalanceFromPrivateKey`, or `add`
- Done ✅

---
