import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
})

const Mongo_URL = `mongodb+srv://jmpatel2113:${process.env.MONGO_DB_USER_CLUSTER_PASSWORD}@usercluster.m7hod.mongodb.net/?retryWrites=true&w=majority&appName=UserCluster`

mongoose.Promise = Promise;
mongoose.connect(Mongo_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());