import events from "./events";
import * as venom from 'venom-bot';
import envs from '../../helpers/process-env';
import saveImage from '../../helpers/save-image';
const sessionName = `${envs.commerceName}:${envs.commerceNumber}`;

export default function WhatsappStart() {
  console.log('***-> [START] Process: ', sessionName);
  venom.create(
    sessionName,  // Session Name
    saveImage,    // Save QRCode image
    undefined,    // 
    { logQR: false }
  )
    .then((client) => {
      events(client);
      process.on('SIGINT', function () {
        client.close();
      });
    })
    .catch((erro) => { console.log(erro); });
}
