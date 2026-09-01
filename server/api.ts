/**
 * server/api.ts — Minimal Express server that proxies Gemini requests.
 *
 * The GEMINI_API_KEY lives here on the server and is NEVER exposed to the
 * browser bundle. The frontend calls POST /api/ask with { query, language }.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { askGemini } from '../src/ai/gemini-service.js';
import { initializeAppData } from '../src/utils/data-loader.js';
import type { AskRequestBody, AskResponseBody } from '../src/ai/types.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: true }));
app.use(express.json());

// Load and validate Phase 2 data once at startup
const appData = initializeAppData();

app.post('/api/ask', async (req, res) => {
  const body = req.body as AskRequestBody;

  if (!body.query || typeof body.query !== 'string' || body.query.trim().length === 0) {
    const errorResponse: AskResponseBody = { success: false, error: 'Query is required.' };
    res.status(400).json(errorResponse);
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_key_here') {
    const errorResponse: AskResponseBody = { success: false, error: 'Gemini API key is not configured on the server.' };
    res.status(500).json(errorResponse);
    return;
  }

  const language = body.language || 'en';

  try {
    const result = await askGemini(body.query, language, appData, apiKey);
    const successResponse: AskResponseBody = { success: true, data: result };
    res.json(successResponse);
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown server error';
    const errorResponse: AskResponseBody = { success: false, error: msg };
    res.status(500).json(errorResponse);
  }
});

app.listen(PORT, () => {
  console.log(`🛡️  Census Confidence Hub API server running on http://localhost:${PORT}`);
  console.log(`   Phase 1 questions loaded: ${appData.phase1Questions.length}`);
  console.log(`   Phase 2 questions loaded: ${appData.phase2Questions.length}`);
  console.log(`   Questionnaire status: Phase 1 = ${appData.questionnaireStatus.phase1}, Phase 2 = ${appData.questionnaireStatus.phase2}`);
});
