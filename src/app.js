import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import appRoutes from './routes/index.js';
// import passport from './config/passport.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(passport.initialize())

app.use(appRoutes)

export default app;
