/**
 * gemini-client.ts — Frontend HTTP client.
 *
 * Calls the server proxy at POST /api/ask. Never touches Gemini directly.
 * Never handles or sees the API key.
 */

import type { AIResponse, AskResponseBody } from './types';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

export async function askCensusHub(
  query: string,
  language: string
): Promise<AIResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, language }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null) as AskResponseBody | null;
      throw new Error(errorBody?.error || `Server returned ${response.status}`);
    }

    const body = (await response.json()) as AskResponseBody;

    if (!body.success || !body.data) {
      throw new Error(body.error || 'Invalid response from server.');
    }

    return body.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to connect to Census Confidence Hub API.');
  }
}
