import {service} from './service';
import express from 'express';

const router = express.Router();

router
    .route('/client/statistics')
    .get((req, res) => {
      const content = service.getStatistics();
      res.send(content);
    });
router
    .route('/client/csv')
    .get((req, res) => {
      const csv = service.getImageCSV();
      res.attachment('cloudinary.csv');
      res.send(csv);
    });

export default router;
