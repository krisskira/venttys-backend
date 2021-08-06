// import pongController from '@controllers/pong.controller';
// import { iApplicationContext } from '@infrastructure/interfaces/application.interface';
import express from 'express';
import { pongController } from '../../../application/controllers';
import { iApplicationContext } from '../../interfaces/application.interface';
import { iRequest } from '../interface';
export const pingRouter = express.Router();

const PATH = '/ping';

const pongRoute: iRequest = async (req, resp) => {
    const context = <iApplicationContext | undefined>req.app.get('context')

    context?.logger?.log({
        type: 'DEBUG',
        tag: '***-> Pong Context',
        msg: JSON.stringify({
            context: {
                token:  context?.token
            }
        }),
    })

    const args = req.body;
    const response = await pongController(args, context);
    return resp.status(200).json({ response });
}

pingRouter.get(PATH, pongRoute);