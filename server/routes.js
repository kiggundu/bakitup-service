import backupRouter from './api/controllers/backup/router';

export default function routes(app) {
  app.use('/api/v1/backup', backupRouter);
}
