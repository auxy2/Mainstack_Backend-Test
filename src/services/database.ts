import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { DATABASE_URL, DATABASE_NAME } = process.env;

mongoose.set('strictQuery', false);


let dbConnection: mongoose.Connection | null;

export const connect = async (uri: string, dbName: string): Promise<mongoose.Connection> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('Connecting to database...');
      await mongoose.connect(uri, {
        dbName,
      });
      dbConnection = mongoose.connection;
      console.log('Connected to DB:', mongoose.connection.db.databaseName);
    } else {
      console.log('Already connected to database');
    }
    return dbConnection;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to database:', error?.message);
    } else {
      console.error('Unexpected error while connecting to database');
    }
    throw new Error('Database connection failed');
  }
};

export const connectDB = async (dbName: string = DATABASE_NAME): Promise<void> => {
  await connect(DATABASE_URL, dbName);
};

export const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};
