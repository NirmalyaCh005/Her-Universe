import { Request, Response } from 'express';
import prisma from '../database/prisma';
import { ProgressSchema } from '../validation/schemas';

export const getAllProgress = async (_req: Request, res: Response) => {
  try {
    const progressList = await prisma.gameProgress.findMany();
    const progressMap = progressList.reduce<Record<string, boolean>>((acc, item) => {
      acc[item.activityId] = item.completed;
      return acc;
    }, {});

    res.json({ success: true, data: progressMap });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch progress' });
  }
};

export const updateProgress = async (req: Request, res: Response) => {
  try {
    const { activityId } = req.params;
    if (!activityId || activityId.length > 50) {
      return res.status(400).json({ success: false, error: 'Invalid activityId' });
    }

    const parsed = ProgressSchema.safeParse(req.body);
    const completed = parsed.success ? parsed.data.completed : true;

    const progress = await prisma.gameProgress.upsert({
      where: { activityId },
      update: { completed },
      create: { activityId, completed },
    });

    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update progress' });
  }
};
