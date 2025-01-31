import server from './server.js';
import { connectDB } from './services/database.js';

const { PORT } = process.env;

const serverStart = async () => {
  try {
    await connectDB();

    server.listen(parseInt(PORT) || 4567, '0.0.0.0', () => {
      console.log(`⚡️[server]: Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

serverStart();
