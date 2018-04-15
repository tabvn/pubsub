import { EventEmitter } from 'fbemitter'

const websocketUrl = 'ws://localhost:3001'

export default class PubSubClient {

  constructor () {

    // status of client connection
    this.emitter = new EventEmitter()
    this._connected = false
    this._ws = null
    this._queue = []
    this._id = null

    this._listeners = []

  }

  /**
   * Subscribe client to a topic
   * @param topic
   * @param cb
   */
  subscribe (topic, cb) {

    const listener = this.emitter.addListener(`subscribe_topic_${topic}`, cb)
    // add listener to array
    this._listeners.push(listener)

  }

  publish (topic, message) {

    this.send({
      action: 'publish',
      payload: {
        topic: topic,
        message: message,
      },
    })

  }

  /**
   * Return client conneciton ID
   */
  id () {
    return this._id
  }

  /**
   * Convert string to JSON
   * @param message
   * @returns {*}
   */
  stringToJson (message) {

    try {
      message = JSON.parse(message)
    }
    catch (e) {
      console.log(e)
    }

    return message
  }

  /**
   * Send a message to the server
   * @param message
   */
  send (message) {

    message = JSON.stringify(message)

    if (this._connected === true) {
      this._ws.send(message)
    } else {
      // let keep it in queue
      this._queue.push({
        type: 'message',
        payload: message,
      })
    }

  }

  /**
   * Run Queue after connecting successful
   */
  runQueue () {
    if (this._queue.length) {
      this._queue.forEach((q, index) => {
        switch (q.type) {

          case 'message':
            this.send(q.payload)

            break

          default:

            break
        }

        // remove queue

        delete this._queue[index]

      })
    }
  }

  /**
   * Begin connect to the server
   * @param cb
   */
  connect (cb = () => {}) {

    const ws = new WebSocket(websocketUrl)
    this._ws = ws

    ws.onopen = () => {

      // change status of connected
      this._connected = true
      // run queue
      this.runQueue()
      console.log('Connected to the server')
      // this send to the server and asking for my connection info: {id: ....}
      this.send({action: 'me'})

    }
    // listen a message from the server
    ws.onmessage = (message) => {

      const jsonMessage = this.stringToJson(message.data)

      const action = jsonMessage.action
      const payload = jsonMessage.payload

      switch (action) {

        case 'me':

          this._id = payload.id

          cb(null)

          break

        case 'publish':

          this.emitter.emit(`subscribe_topic_${payload.topic}`, payload.message)
          // let emit this to subscribers
          break

        default:

          break
      }

      console.log('Got server message: ', jsonMessage)

    }
    ws.onerror = (err) => {

      console.log('unable connect to the server', err)
      cb(err)
    }

  }

  /**
   * Disconnect client
   */
  disconnect () {

    if (this._listeners.length) {
      this._listeners.forEach((listener) => {

        listener.remove()
      })
    }
  }
}

const subscribeCallback = (message) => {

  console.log('Subscribed message', message)
}
window.onload = () => {

  console.log('Loaded')

  const pubSub = new PubSubClient()

  pubSub.connect((err) => {
    if (err) {
      console.log(err)

      return
    }

    console.log('My Info:', pubSub.id())

    // let subscribe a topic

    pubSub.subscribe('abc', subscribeCallback)

  })
}