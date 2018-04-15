import http from 'http'
import express from 'express'
import cors from 'cors'
import WebSocketServer from 'uws'
import PubSub from './pubsub'

// Default Server Post
const PORT = 3001

// Create an App
const app = express()
// Create Server
app.server = http.createServer(app)

app.use(cors({
  exposedHeaders: '*',
}))

const wss = new WebSocketServer.Server({
  server: app.server,
})

//Initial PubSub Server
const pubSubServer = new PubSub({wss: wss})
app.pubsub = pubSubServer

// Start Server.
app.server.listen(PORT, () => {
  console.log(`App is running on port ${app.server.address().port}`)
})