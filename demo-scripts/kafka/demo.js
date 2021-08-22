var { Producer, KafkaConsumer } = require("node-rdkafka");
require("dotenv").config();

const { EXTERNAL_PUBSUB_SERVER = "localhost:9093" } = process.env;

const topic = "venttys_graphql_api";
const publishSecondsTime = 3;

const kafkaProducer = Producer.createWriteStream(
  {
    "client.id": "demo:producer",
    "metadata.broker.list": EXTERNAL_PUBSUB_SERVER,
  },
  {},
  { topic }
);

const kafkaConsumer = KafkaConsumer.createReadStream(
  {
    "group.id": "kafka",
    "client.id": "demo:consumer",
    "metadata.broker.list": EXTERNAL_PUBSUB_SERVER,
  },
  {},
  { topics:[topic] }
);

kafkaConsumer.on("data", ({ topic, timestamp, value, ...rest }) => {
  console.log("\n***-> REST: ", JSON.parse(value.toString()), rest, "\n");
});

setInterval(() => {
  kafkaProducer.write(Buffer.from(JSON.stringify({ ping: "pong" })));
}, publishSecondsTime * 1000);
