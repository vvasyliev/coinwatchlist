import path from 'path';
import express, { Express } from 'express';

const PORT: number = 8080;
const app: Express = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(PORT, () => {
  console.info(`Server is running at locahlost:${PORT}`);
});
