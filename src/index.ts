import * as dotenv from 'dotenv';
import { bootstrap } from "./app";
import { Environment } from "./infrastructure/interfaces/application.interface";
import { ConsoleLogger } from "./infrastructure/logger/console.logger";

// import { ServerRestApp } from "./infrastructure/express-server";
import { GraphQLApp as ServerGraphQL } from './infrastructure/graphql-server';

dotenv.config()

const { 
    ENV: environment = 'production',
    PORT: port = "3000"
} = process.env

const logger = new ConsoleLogger(<Environment>environment)

// const app = new ServerRestApp(logger)
const app = new ServerGraphQL(logger)

bootstrap(app, <Environment>environment, port);