# pubsub
Create your own PubSub Client &amp; Server Websocket

## Js Client

```javascript

    const pubSub = new PubSubClient('ws://localhost:3001', {
      connect: true,
      reconnect: true,
    })

    const topicName = 'abc'

    pubSub.subscribe(topicName, (message) => {
      console.log(`Got message from topic ${topicName}`, message)
    })

    //publish a message to topic
    pubSub.publish(topicName,
      {title: 'Hello subscribers in the topic abc', body: 'How are you ?'})

    // Broadcast send message to subscribers but not me
    pubSub.broadcast(topicName, {body: 'this is broadcast message'})

```

## Ideas

* May limit publisher and time to send message if look like spammer 
* Maybe server need wait a time (short time) if detect mutiple publish messages same to one client and send  a batch of messages instead of send a single message.
* Add Crypto client & Server Key sharing to decrypt between client & server when connected. More security for websocket communication. The message from client to server and server to client is encrypted.


## Video Tutorials
Full Playlis Videos: step by step https://www.youtube.com/playlist?list=PLFaW_8zE4amNkFbpUVS3V0t_HrJSQdASD
