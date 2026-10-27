# 🌸 Her Little Universe 💗

> **An Immersive 3D Interactive Birthday Website for October 28**  
> A romantic digital gift blending a dreamy pastel-pink fantasy world, interactive 3D objects, playful mini-games, and a personalized romantic scrapbook.

---

## 🌟 Key Features

1. **Magical Hero Entrance**
   - Procedural 3D Teddy Bear cradling a pulsing pink heart with breathing and bobbing animations.
   - Dreamy pastel-pink skies, floating clouds, stars, and sparkles.
   - Gift opening interaction with custom pink confetti bursts.

2. **3D Birthday Celebration**
   - 3-tier pastel pink birthday cake with piped frosting pearls and fresh strawberries.
   - Interactive animated candle with realistic flickering flames.
   - **"Make a Wish ✨"**: blows out the candle flame, releases wisps of smoke, triggers celebration confetti, and reveals a personalized birthday wish with a hidden secret note.

3. **Sealed Love Letter Experience**
   - Wax-sealed interactive envelope with a glowing heart seal.
   - Tapping breaks the seal and slides open an elegant parchment paper letter.
   - Features romantic paragraphs and a handwritten signoff with easy personalization.
   - "Fold & Put Back into Envelope" interaction.

4. **Interactive Mini-Games Arcade**
   - **Catch My Hearts 💗**: 30-second reflex game with falling hearts and points tracking. Milestones at 10 and 20 points reveal sweet surprises!
   - **Find the Hidden Hearts 🔍**: Illustrated pink bedroom fantasy scene with 5 hidden interactive objects (bedside lamp, teddy, jewelry box, bookshelf, starry window) revealing secret love notes. Includes hint helpers.
   - **Our Little Dream Quiz 💭**: Romantic multiple-choice memory quiz with animated transitions, immediate sweet reactions, and a 100% Soulmate Certificate.
   - **Unlock the Secret Gift 🗝️**: 3-key discovery puzzle with matching celestial gems, hugs, and keys to unlock a special birthday surprise. Includes a skip button so rewards are never locked out.

5. **Cadbury Fuse Chocolate Surprise 🍫**
   - Signature section dedicated to her favorite treat: *"A Little Chocolate for My Sweet Girl"*.
   - Royal purple and gold accents with a 3D chocolate bar, peanut clusters, and gold foil.
   - Interactive wrapper peeling interaction with celebration sound and sweet celebratory notes.
   - Respectfully treats Cadbury Fuse as a third-party brand with proper disclosures.

6. **Our Little Scrapbook Gallery 📷**
   - Polaroid-inspired photo cards with subtle angles, washi tape graphics, and romantic captions.
   - Comes with 4 beautiful pastel vector illustrations by default (zero broken links).
   - Tap-to-enlarge lightbox modal with keyboard navigation (ArrowLeft, ArrowRight, Esc) and next/previous controls.

7. **Reasons You Are Special 💫**
   - 3D flippable cards with pastel emojis, highlights, and heartfelt compliments that rotate on tap.

8. **Open-When Letters 💌**
   - 3 comforting envelopes:
     1. *Open When You Need a Smile* 😊
     2. *Open When You Miss Me* 🫂
     3. *Open When You Need a Reminder of How Special You Are* 👑

9. **The Final Birthday Reveal 🌌**
   - Dreamy starry night sky with a glowing central heart and spotlight.
   - "Happy Birthday, My Favourite Person. 💗"
   - Replay button that smoothly returns to the introductory universe experience.

10. **Audio & Sound Synthesis 🎵**
    - Built-in Web Audio API synthesizer for dreamy music box melodies, pops, chimes, and celebration chords. Zero external audio file dependencies required!
    - Floating music player dock with volume slider and support for custom background MP3 files.

11. **Express & SQLite Backend 🛡️**
    - Prisma ORM with SQLite database for persisting game scores (`GameScore`), activity progress (`GameProgress`), and custom messages (`BirthdayMessage`).
    - Zod input validation and resilient frontend `localStorage` fallback so the website works 100% offline or on static hosting platforms like Vercel.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), Lucide React, Canvas Confetti.
- **Backend**: Node.js, Express, TypeScript (`tsx`), SQLite, Prisma ORM, Zod, CORS.
- **Testing**: Vitest with `@testing-library/react` and `jsdom`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended, tested on v22)
- npm (v9 or higher)

### 1. Installation

Clone or open the project folder, then run:

```bash
npm install
```

### 2. Initialize Database (SQLite with Prisma)

Generate the Prisma client and create the local SQLite database:

```bash
npm run prisma:generate
npm run prisma:push
```

### 3. Run Development Servers

To run both frontend and backend concurrently:

```bash
npm run dev:all
```

Or run them individually in separate terminals:

```bash
# Terminal 1: Vite Frontend (http://localhost:5173)
npm run dev

# Terminal 2: Express Backend (http://localhost:5000)
npm run server
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎨 How to Personalize in Under 10 Minutes

All text, dates, names, letters, quiz questions, compliments, and photos are configured in a single file:

👉 [src/config/birthdayConfig.ts](file:///e:/my%20projects/HEr%20littl%20universe/src/config/birthdayConfig.ts)

### 1. Update Names & Birthday Date
```typescript
export const birthdayConfig: BirthdayConfig = {
  girlfriendName: "SARAH", // Replace with her real name or nickname
  myName: "ALEX",          // Replace with your name
  birthdayDate: "2026-10-28", // Her birthday date (YYYY-MM-DD)
  ...
}
```

### 2. Personalize the Birthday Love Letter
Edit `birthdayConfig.loveLetter`:
- `greeting`: Opening salutation
- `paragraphs`: Array of paragraphs for the letter
- `signoff`: Closing phrase (e.g. "Forever yours,")
- `senderName`: Your name

### 3. Customize the Mini-Game Quiz
Edit `birthdayConfig.quizQuestions` to add your favorite inside jokes, memories, and dream dates!

### 4. Adding Real Photographs
1. Place your photos (e.g. `pic1.jpg`, `pic2.jpg`) into the `public/photos/` directory.
2. In `src/config/birthdayConfig.ts`, update `galleryPhotos`:
```typescript
galleryPhotos: [
  {
    id: 1,
    url: "/photos/pic1.jpg",
    title: "Our Trip to the Beach",
    dateText: "Summer 2025",
    caption: "One of my absolute favorite memories with you.",
    rotation: -3
  },
  ...
]
```

### 5. Replacing the Cadbury Fuse Image (Optional)
If you have a physical photograph of her chocolate gift:
1. Place `fuse.jpg` into `public/photos/fuse.jpg`.
2. The 3D procedural chocolate bar and wrapper will render automatically, and fallback images seamlessly use local SVG graphics.

### 6. Adding Custom Background Music (Optional)
By default, the website uses a built-in generative music-box synthesizer that works offline with zero files. If you want to play a specific romantic song:
1. Place your MP3 file into `public/music.mp3`.
2. In `src/config/birthdayConfig.ts`, set:
```typescript
music: {
  enabled: true,
  customAudioUrl: "/music.mp3",
  volume: 0.6
}
```

---

## 🧪 Running Tests

Run the test suite with Vitest:

```bash
npm test
```

Verifies:
- Configuration completeness and integrity
- Mini-game score calculation and non-negative constraints
- Zod schema validation
- Activity progress tracking

---

## 📦 Building for Production

To build the optimized production client:

```bash
npm run build
```

This generates production-ready static assets in the `dist/` directory.

---

## 🌐 Deployment Instructions

### Deploying Frontend to Vercel

1. Push your repository to GitHub.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Set:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.
6. The frontend works 100% autonomously on Vercel with localStorage backup even if you do not host a separate backend!

### Deploying Backend (Railway / Render / VPS)

1. Deploy the `server/` directory to [Railway](https://railway.app) or [Render](https://render.com).
2. Set Environment Variables:
   - `PORT=5000`
   - `DATABASE_URL="file:./dev.db"`
   - `CORS_ORIGIN="https://your-vercel-domain.vercel.app"`
3. Start command:
   ```bash
   npx prisma db push --schema=server/prisma/schema.prisma && npx tsx server/src/server.ts
   ```

---

## 🔒 Third-Party Trademark Notice

Cadbury and Fuse are registered trademarks of Mondelēz International. This website is a personal gift created for private birthday celebration purposes only and is not affiliated with, sponsored by, or endorsed by Cadbury.

---

## 💖 Made with Love for October 28
