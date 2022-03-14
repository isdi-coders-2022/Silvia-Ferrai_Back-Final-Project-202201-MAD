import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import * as dotenv from 'dotenv';
dotenv.config();

export const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

// app.use('/login', loginRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, resp, next) => {
    console.log(err.message);
    resp.send({ error: err.message });
});

export const server = app.listen(port, () => {
    console.log(`Server listening in http://localhost:${port}`);
});
