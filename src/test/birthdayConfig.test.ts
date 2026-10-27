import { describe, it, expect } from 'vitest';
import { birthdayConfig } from '../config/birthdayConfig';

describe('Birthday Configuration Integrity', () => {
  it('should have girlfriend and author names configured', () => {
    expect(birthdayConfig.girlfriendName).toBeDefined();
    expect(birthdayConfig.girlfriendName.length).toBeGreaterThan(0);
    expect(birthdayConfig.myName).toBeDefined();
    expect(birthdayConfig.myName.length).toBeGreaterThan(0);
  });

  it('should have a valid birthday date for October 28', () => {
    expect(birthdayConfig.birthdayDate).toMatch(/^\d{4}-10-28$/);
  });

  it('should have valid quiz questions with at least 2 options and a reaction', () => {
    expect(birthdayConfig.quizQuestions.length).toBeGreaterThanOrEqual(3);
    birthdayConfig.quizQuestions.forEach((q) => {
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.sweetReaction.length).toBeGreaterThan(0);
    });
  });

  it('should have compliments with emojis and messages', () => {
    expect(birthdayConfig.compliments.length).toBeGreaterThanOrEqual(4);
    birthdayConfig.compliments.forEach((c) => {
      expect(c.emoji).toBeDefined();
      expect(c.message.length).toBeGreaterThan(10);
    });
  });

  it('should have 5 hidden hearts for the bedroom game', () => {
    expect(birthdayConfig.hiddenHearts).toHaveLength(5);
    birthdayConfig.hiddenHearts.forEach((h) => {
      expect(h.position.x).toBeGreaterThanOrEqual(0);
      expect(h.position.x).toBeLessThanOrEqual(100);
      expect(h.position.y).toBeGreaterThanOrEqual(0);
      expect(h.position.y).toBeLessThanOrEqual(100);
    });
  });

  it('should contain the 3 required Open-When letter scenarios', () => {
    expect(birthdayConfig.openWhenLetters).toHaveLength(3);
    const ids = birthdayConfig.openWhenLetters.map((l) => l.id);
    expect(ids).toContain('smile');
    expect(ids).toContain('miss-me');
    expect(ids).toContain('reminder');
  });

  it('should have Cadbury Fuse chocolate surprise text', () => {
    expect(birthdayConfig.chocolateSurprise.title).toContain('Chocolate');
    expect(birthdayConfig.chocolateSurprise.sweetNote).toBeDefined();
  });
});
