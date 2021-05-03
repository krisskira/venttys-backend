import fs from 'fs';
import envs from "./process-env";

export interface Response {
    type?: string,
    data?: Buffer
}

export const saveImage = (base64Qr: string, _asciiQR: any, _attempts: number, urlCode: string | undefined): void => {

    const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let response: Response = {};

    if (matches?.length !== 3) {
        throw new Error(`Invalid input string`);
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');

    fs.writeFile(
        `qr_codes/${envs.commerceNumber}.png`,
        response.data,
        'binary',
        (err: any) => { if (err != null) throw err }
    )
    console.log('***-> [IMAGE] saving qr...');
  }

export default saveImage;