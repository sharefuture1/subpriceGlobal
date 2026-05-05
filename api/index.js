// Thin wrapper for Vercel Serverless Functions
// This file re-exports the Express app so Vercel can use it
import app from '../backend/server.js';

export default app;
