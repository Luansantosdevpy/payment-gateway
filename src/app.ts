import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import { Server } from 'http';
import Logger from './utils/logger/logger';
import configureRoutes from './config/routes';

export default class App {
  public express: express.Application = express();
  private server!: Server;

  /**
   * Initializes middlewares and routes
   */
  public initialize = async (): Promise<void> => {
    try {
      await this.middlewares();
      await this.routes();
    } catch (error) {
      Logger.error('Error during app initialization', error);
      process.exit(1);
    }
  };

  /**
   * Starts the server
   * @param port - Port number to listen on
   * @param appName - Name of the application
   */
  public start = (
    port: number = parseInt(process.env.PORT || '3000', 10),
    appName: string,
  ): void => {
    this.server = this.express.listen(port, '0.0.0.0', () => {
      Logger.info(`${appName} listening on port ${port}!`);
    });
  };

  /**
   * Stops the server
   */
  public stop = (): void => {
    if (this.server) {
      this.server.close((err) => {
        if (err) {
          Logger.error('Error while stopping the server', err);
        } else {
          Logger.info('Server stopped successfully');
        }
      });
    }
    Logger.warn('Server is not running');
  };

  /**
   * Configures middlewares
   */
  private middlewares = async (): Promise<void> => {
    this.express.use(express.json());
    this.express.use(
      cors({
        origin: '*',
        methods: 'POST, GET, PUT, OPTIONS, PATCH, DELETE',
        exposedHeaders: 'X-file-name',
      }),
    );
  };

  /**
   * Configures routes and error handling middleware
   */
  private routes = async (): Promise<void> => {
    await configureRoutes(this.express);
  };
}
