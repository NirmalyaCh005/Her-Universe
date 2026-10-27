import { Request, Response } from 'express';
import prisma from '../database/prisma';
import { MessageSchema } from '../validation/schemas';

export const getBirthdayInfo = async (_req: Request, res: Response) => {
  try {
    const birthdayDate = new Date('2026-10-28T00:00:00Z');
    const now = new Date();
    
    // Calculate difference
    const diffTime = birthdayDate.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const isBirthdayToday = daysRemaining === 0 || (
      now.getUTCMonth() === 9 && now.getUTCDate() === 28
    );

    res.json({
      success: true,
      data: {
        birthdayDate: '2026-10-28',
        isBirthdayToday,
        daysRemaining,
        serverTime: now.toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const getMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await prisma.birthdayMessage.findMany();
    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
};

export const upsertMessage = async (req: Request, res: Response) => {
  try {
    const parsed = MessageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.format() });
    }

    const { messageKey, content } = parsed.data;
    const message = await prisma.birthdayMessage.upsert({
      where: { messageKey },
      update: { content },
      create: { messageKey, content },
    });

    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update message' });
  }
};
