import dotenv from 'dotenv';
dotenv.config();

import createApp from './app';

const PORT = process.env.PORT || 5000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`🌸 Her Little Universe API server running on http://localhost:${PORT}`);
  console.log(`✨ Health check available at http://localhost:${PORT}/api/health`);
});
