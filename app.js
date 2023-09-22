import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "script-src": ["'self'", "cdnjs.cloudflare.com"],
    },
  },
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', express.static('index.html'));

export default app;

