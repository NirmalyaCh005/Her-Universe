import { ScoreRecord } from '../types';

const API_BASE = '/api';

export const apiService = {
  // Fetch birthday metadata
  async getBirthdayInfo() {
    try {
      const res = await fetch(`${API_BASE}/birthday`, { method: 'GET' });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Backend is offline or on static Vercel host
    }

    // Fallback logic
    const birthdayDate = new Date('2026-10-28T00:00:00Z');
    const now = new Date();
    const diffTime = birthdayDate.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const isBirthdayToday = daysRemaining === 0 || (
      now.getUTCMonth() === 9 && now.getUTCDate() === 28
    );

    return {
      birthdayDate: '2026-10-28',
      isBirthdayToday,
      daysRemaining,
      serverTime: now.toISOString(),
    };
  },

  // Fetch activity progress with localStorage fallback
  async getProgress(): Promise<Record<string, boolean>> {
    const local = localStorage.getItem('universe_progress');
    const localMap: Record<string, boolean> = local ? JSON.parse(local) : {};

    try {
      const res = await fetch(`${API_BASE}/progress`, { method: 'GET' });
      if (res.ok) {
        const json = await res.json();
        const merged = { ...localMap, ...json.data };
        localStorage.setItem('universe_progress', JSON.stringify(merged));
        return merged;
      }
    } catch {
      // offline fallback
    }

    return localMap;
  },

  // Update progress
  async updateProgress(activityId: string, completed = true): Promise<void> {
    const local = localStorage.getItem('universe_progress');
    const localMap: Record<string, boolean> = local ? JSON.parse(local) : {};
    localMap[activityId] = completed;
    localStorage.setItem('universe_progress', JSON.stringify(localMap));

    try {
      await fetch(`${API_BASE}/progress/${activityId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });
    } catch {
      // offline fallback succeeded locally
    }
  },

  // Fetch high scores with localStorage fallback
  async getScores(gameType?: string): Promise<ScoreRecord[]> {
    const local = localStorage.getItem('universe_scores');
    let localScores: ScoreRecord[] = local ? JSON.parse(local) : [];

    if (gameType) {
      localScores = localScores.filter(s => s.gameType === gameType);
    }

    try {
      const url = gameType ? `${API_BASE}/scores?gameType=${gameType}` : `${API_BASE}/scores`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // offline fallback
    }

    return localScores;
  },

  // Record a new game score
  async recordScore(gameType: string, score: number): Promise<void> {
    const local = localStorage.getItem('universe_scores');
    const localScores: ScoreRecord[] = local ? JSON.parse(local) : [];
    const newRecord: ScoreRecord = {
      gameType,
      score,
      completedAt: new Date().toISOString(),
    };
    localScores.unshift(newRecord);
    localStorage.setItem('universe_scores', JSON.stringify(localScores.slice(0, 50)));

    try {
      await fetch(`${API_BASE}/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameType, score }),
      });
    } catch {
      // offline fallback succeeded locally
    }
  },
};
