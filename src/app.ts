require('dotenv').config();
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import api from './api';
import cors from 'cors';
import MessageResponse from './interfaces/message-response';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';
import { terminalLogger } from './middlewares/terminalLogger';


const app = express();

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173,https://campaign-manager-alpha-five.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,            // if you need to send cookies/auth headers
}));
app.use(terminalLogger);
app.use(helmet());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    data: null,
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);



app.use(notFound);
app.use(errorHandler);

export default app;
