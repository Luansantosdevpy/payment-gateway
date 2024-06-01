import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import { Server } from 'http';
import { createLogger } from './utils/logger';
import routes from './routes/routes';

const logger = createLogger('App');

export default class App {
  public express: express.Application = express();

  private server!: Server;

  public initialize = async (): Promise<void> => {
    await this.middlewares();
    await this.routes();
  };

  public start = (port: number, appName: string): void => {
    this.server = this.express.listen(port, '0.0.0.0', () => {
      logger.info(`${appName} listening on port ${port}!`);
    });
  };

  public stop = (): void => {
    this.server.close();
  };

  private middlewares = async (): Promise<void> => {
    this.express.use(express.json());
    this.express.use(
      cors({
        origin: '*',
        methods: 'POST, GET, PUT, OPTIONS, PATCH, DELETE',
        exposedHeaders: 'X-file-name',
      }),
    );
    this.express.use(cors());
  };

  private routes = async (): Promise<void> => {
    this.express.use(await routes());
  };
}