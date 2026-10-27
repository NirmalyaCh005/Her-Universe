import { Request, Response } from 'express';
import prisma from '../database/prisma';
import { ScoreSchema } from '../validation/schemas';

export const getScores = async (req: Request, res: Response) => {
  try {
    const { gameType } = req.query;

    const where = typeof gameType === 'string' && gameType ? { gameType } : {};
    const scores = await prisma.gameScore.findMany({
      where,
      orderBy: { score: 'desc' },
      take: 20,
    });

    res.json({ success: true, data: scores });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch scores' });
  }
};

export const submitScore = async (req: Request, res: Response) => {
  try {
    const parsed = ScoreSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.format() });
    }

    const { gameType, score } = parsed.data;
    const newScore = await prisma.gameScore.create({
      data: {
        gameType,
        score,
      },
    });

    res.status(201).json({ success: true, data: newScore });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to record score' });
  }
};
