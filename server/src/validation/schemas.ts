import { z } from 'zod';

export const ScoreSchema = z.object({
  gameType: z.string().min(1, 'Game type is required').max(50),
  score: z.number().int().min(0, 'Score cannot be negative').max(100000),
});

export const ProgressSchema = z.object({
  completed: z.boolean().default(true),
});

export const MessageSchema = z.object({
  messageKey: z.string().min(1).max(50),
  content: z.string().min(1).max(2000),
});

export type ScoreInput = z.infer<typeof ScoreSchema>;
export type ProgressInput = z.infer<typeof ProgressSchema>;
export type MessageInput = z.infer<typeof MessageSchema>;
