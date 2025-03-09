import middlewares from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

import { profileDb } from '../database';
import { validateProfile } from '../utils/validation';

const router = Router();

router.use('/user', middlewares.session(), (req, res) => res.json(req.user || {}));

// 获取用户资料
router.get('/profile', (_, res) => {
  try {
    const profile = profileDb.get();
    res.json(profile);
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// 更新用户资料
router.post('/profile', (req, res) => {
  const { username, email, phone } = req.body;

  // 详细格式验证
  const validationErrors = validateProfile({ username, email, phone });
  if (validationErrors) {
    return res.status(400).json({
      error: 'Validation failed',
      errors: validationErrors,
    });
  }

  try {
    profileDb.update({ username, email, phone });
    res.json({ username, email, phone });
  } catch (error) {
    console.error('Failed to update profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.use('/data', (_, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

export default router;
