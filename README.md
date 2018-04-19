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



## Video Tutorials
Full Playlis Videos: step by step https://www.youtube.com/playlist?list=PLFaW_8zE4amNkFbpUVS3V0t_HrJSQdASD
