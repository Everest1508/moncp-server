import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { promises as fs } from "fs"
import { createPublicClient, formatUnits, http } from "viem";
import { privateKeyToAccount } from "viem/accounts"
import { monadTestnet } from "viem/chains";

const publicClient = createPublicClient({
  chain: monadTestnet,
  transport: http(),
});


export async function getBalance(address){
  try {
    const balance = await publicClient.getBalance({ address });
    return formatUnits(balance, 18); // assuming MON has 18 decimals
  } catch (err) {
    console.error("Failed to fetch balance:", err);
    return "Error fetching balance";
  }
}

export async function getBalanceFromPrivateKey(privateKey) {
  try {
    const account = privateKeyToAccount(privateKey);

    const balance = await publicClient.getBalance({ address: account.address });
    return formatUnits(balance, 18);
  } catch (err) {
    console.error("Failed to fetch balance using private key:", err);
    return "Error fetching balance with private key";
  }
}


const server = new McpServer({
  name: "Moncp Server",
  version: "1.0.0",
})

server.tool("add", "Add two numbers", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }],
}))

server.tool("getApiKey", "Get the API key", {}, async ({}) => ({
  content: [{ type: "text", text: process.env.PRIVATE_KEY }],
}))


server.tool("getBalance", "Get balance of an address", { address: z.string() }, async ({ address }) => ({
    content: [{ type: "text", text: await getBalance(address) + " MON" }],
}));


server.tool("getBalanceFromPrivateKey", "Get balance of the wallet using private key", {}, async ({}) => ({
    content: [{ type: "text", text: await getBalanceFromPrivateKey(process.env.PRIVATE_KEY) + " MON" }],
})); 


const transport = new StdioServerTransport()
await server.connect(transport)
