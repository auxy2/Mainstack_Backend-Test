import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
// import cors from 'cors';
// import compression from 'compression';
// import paginator from 'mongoose-paginate-v2';
import morgan from 'morgan';
// import bodyParser from 'body-parser';
// import helmet from 'helmet';
// import { corsOptions } from './base/cors.js';
import cookieParser from 'cookie-parser';
import notFound from './middlewares/notfound.js';

dotenv.config();
// paginator.paginate.options = { lean: true, leanWithId: false };

const router = express.Router();
import routes from "./route/index.js";

const app = express();

router.get('/', (req, res) => {
    res.status(200).send({
      success: 1,
      message:
        'Hello from MainStack Backend Developer Assessment. Check the API specification for further guidance and next steps. get the postman collection for full documentation',
    });
  });


app.use(express.json());

// app.use(compression());
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.raw({ type: 'application/json' }));

const server = http.createServer(app);

// app.use(cors(corsOptions));
app.use(morgan('tiny'));
// app.use(helmet());

app.use('/api', routes);
app.use(notFound);

export default server;
