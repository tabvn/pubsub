# pubsub
Create your own PubSub Client &amp; Server Websocket

## Js Client

const pubSub = new PubSubClient()

// connect
pubSub.connect(err => {
 
 
 //Subscribe to the topic name
  pubSub.subscribe('topic-abc', (message) => {
    // got topic message
  })
 
  //Publish a message to topic
  
  pubSub.publish('topic-abc', {hi: "there"})
})




## Video Tutorials
https://www.youtube.com/watch?v=iNr8VsVh_-Q
