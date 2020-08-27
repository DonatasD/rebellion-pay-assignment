import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

export default app;
