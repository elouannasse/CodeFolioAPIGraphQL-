import mongoose from 'mongoose';
import { env } from './environment';
import { logger } from './logger';

export class Database {
  public async connect(): Promise<void> {
    try {
      mongoose.set('strictQuery', false);
      
      await mongoose.connect(env.mongoUri);
      
      logger.info(` MongoDB Connected: ${mongoose.connection.host}`);
      
      mongoose.connection.on('error', (error) => {
        logger.error('MongoDB connection error:', error);
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
      });

    } catch (error) {
      logger.error(' MongoDB Connection Failed:', error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      logger.info('MongoDB disconnected');
    } catch (error) {
      logger.error('Error disconnecting from MongoDB:', error);
    }
  }
}

export const database = new Database();