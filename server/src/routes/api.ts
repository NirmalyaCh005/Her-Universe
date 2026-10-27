import { Router } from 'express';
import { getBirthdayInfo, getMessages, upsertMessage } from '../controllers/birthdayController';
import { getAllProgress, updateProgress } from '../controllers/progressController';
import { getScores, submitScore } from '../controllers/scoreController';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Her Little Universe API',
    timestamp: new Date().toISOString(),
  });
});

// Birthday info & messages
router.get('/birthday', getBirthdayInfo);
router.get('/messages', getMessages);
router.put('/messages', upsertMessage);

// Game Progress
router.get('/progress', getAllProgress);
router.put('/progress/:activityId', updateProgress);

// Game Scores
router.get('/scores', getScores);
router.post('/scores', submitScore);

export default router;
