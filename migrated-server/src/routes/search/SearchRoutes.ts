import { Router } from 'express';
import SearchController from '@controllers/search/SearchController';

const router = Router();

router.get('/:query', SearchController.search);

export default router;