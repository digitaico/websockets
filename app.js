import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const apiServer = express();

apiServer.use(cors());
apiServer.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "script-src": ["'self'", "cdnjs.cloudflare.com"],
    },
  },
}));
apiServer.use(express.json());

apiServer.use(express.static(path.join(__dirname, 'public')));

apiServer.get('/', express.static('index.html'));

export default apiServer;
