import { Map } from 'immutable'
import _ from 'lodash'
import uuid from 'uuid/v1'

export default class PubSub {

  constructor (ctx) {
    this.wss = ctx.wss

    this.clients = new Map()

    this.load = this.load.bind(this)
    this.handleReceivedClientMessage = this.handleReceivedClientMessage.bind(this)

    this.load()
  }

  load () {

    const wss = this.wss

    wss.on('connection', (ws) => {

      const id = this.autoId()

      const client = {
        id: id,
        ws: ws,
        userId: null,
      }

      // add new client to the map
      this.addClient(client)

      this.send(id, {action: 'publish', payload: {topic: 'abc', message: {title: "hey there"}}})

      // listen when receive message from client
      ws.on('message', (message) => this.handleReceivedClientMessage(id, message))



      ws.on('close', () => {

        console.log('Client is disconnected')
      })

    })

  }

  handleReceivedClientMessage(clientId, message){

    const client = this.getClient(clientId)

    if(typeof message === 'string'){


      message = this.stringToJson(message)

      console.log('Message from client: ', message.action, clientId)

      const action = _.get(message, 'action', '')
      switch (action){

        case 'me':

          //Client is asking for his info

          this.send(clientId, {action: 'me', payload: {id: clientId, userId: client.userId}})

          break

        default:

          break
      }




    }else{
      // maybe data message we handle later.
    }



  }

  /**
   * Convert string of message to JSON
   * @param message
   * @returns {*}
   */
  stringToJson(message){

    try {
      message = JSON.parse(message)
    }catch (e) {
      console.log(e)
    }

    return message
  }
  /**
   * Add new client connection to the map
   * @param client
   */
  addClient (client) {

    if (!client.id) {
      client.id = this.autoId()
    }

    this.clients = this.clients.set(client.id, client)
  }

  /**
   * Get a client connection
   * @param id
   * @returns {V | undefined}
   */
  getClient (id) {

    return this.clients.get(id)
  }

  /**
   * Generate an ID
   * @returns {*}
   */
  autoId () {
    return uuid()
  }

  /**
   * Send to client message
   * @param message
   */
  send (clientId, message) {

    const client = this.getClient(clientId)
    if (!client) {
      return
    }
    const ws = client.ws
    try {
      message = JSON.stringify(message)
    }
    catch (err) {
      console.log('An error convert object message to string', err)
    }

    ws.send(message)
  }

}