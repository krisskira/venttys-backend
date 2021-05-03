import onMessage from "./onMessages";
import onStateChange from "./onStateChange";

export default (client: any) => {
    client.onMessage((message: any) => {
        console.log('***-> [OnMessage] Message: ', message.body);
        console.log('***-> [OnMessage] From: ', message.from);
        onMessage(client, message);
    })
    // client.onStateChange((state: any) => onStateChange(client, state));
}