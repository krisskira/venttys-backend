import envs from '../../../helpers/process-env';
// TODO: define the message type
const onMessage = async (client: any, message: any) => {

  console.log('***-> Repondiendo: ', message.body !== 'hola');

  if (message.body !== 'hola') { return; };

  client
    .sendText(message.from, `Bienvenido a ${envs.commerceName}`)
    .then((result: any) => {
      console.log('***-> [MESSAGE RESULT] Result: SUCCESS'); //return object success
    })
    .catch((erro: Error) => {
      console.log('***-> [MESSAGE RESULT] Result:', erro); //return object success
    });
}

export default onMessage;