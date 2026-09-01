# Census Confidence Hub (Census 2027)

A GenAI-powered public awareness, scam prevention, and decision-support web application for **Census 2027 (India)**.

Built on a **Trust-First Architecture**: Official verified government data is the single source of truth. Google Gemini is used exclusively for explanation, simplification, and multilingual translation — never for fact generation.

---

## 🚀 Quick Start (One Command)

### Prerequisites
- Node.js (v18+)
- Google Gemini API Key

### Setup Instructions
1. **Clone & Install**:
   ```bash
   git clone https://github.com/sanchitpathare01-blip/Census-2027.git
   cd Census-2027
   npm install
   ```

2. **Configure API Key**:
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

3. **Launch Project (Frontend + API Proxy)**:
   ```bash
   npm run dev:all
   ```
   - **Frontend**: http://localhost:5173
   - **Backend API Proxy**: http://localhost:3001

---

## 🏛️ System Architecture

```
User Query + Selected Language (10 Indian Languages)
                     │
                     ▼
             [Intent Detection]
                     │
                     ▼
    [Phase 2 Verified Census Data Layer]
  (33 Houselisting Questions | 36 State Schedules | 6 Scam Patterns | Privacy Facts)
                     │
                     ▼
           [Trusted Context Pipeline]
                     │
                     ▼
       [Google Gemini 2.0 Flash API] ──► (Server-side Proxy: server/api.ts)
                     │
                     ▼
   [Deterministic Evidence Engine (0-100%)]
(Calculates trust score from evidence, NOT AI self-assessment)
                     │
                     ▼
       [UI Answer + Verified Source Citations]
```

---

## Key Features

1. **Stage 1 — Safety & Scam Detector**: Instant text analyzer for suspicious phone calls/messages. Compares claims against 6 verified scam patterns (e.g. OTP phishing, payment demands) and provides 1930 Cyber Crime reporting channels.
2. **Stage 2 — Questionnaire & Privacy Explorer**: Interactive category explorer for all **33 gazetted Phase 1 Houselisting questions**, with sensitive data badges and Census Act 1948 legal protections.
3. **Stage 3 — Schedule & Self-Enumeration Lookup**: Interactive schedule for all **36 States & UTs** with direct links to the official `se.census.gov.in` portal and a 4-step preparedness checklist.
4. **Flagship AI Assistant (`AskCensusHub`)**: Supports queries in **10 Indian languages** (English, Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, Kannada, Malayalam, Punjabi) with sample demo prompt chips.

---

## 🛡️ Security & Privacy Guarantees

- **API Key Protection**: The Gemini API key resides server-side in `server/api.ts` and is **never** bundled into the client bundle.
- **Zero Fact Fabrication**: Phase 2 Population Enumeration questions are strictly marked *"Pending Official Publication"* until gazetted by the government.
- **No Data Persistence**: No personal user data or search history is saved.

---

## 🧪 Running Automated Test Suite

```bash
# Run Phase 3 AI Engine & Phase 4 UI Binding Tests
npx tsx src/ai/__tests__/engines.test.ts
npx tsx src/ai/__tests__/demo-readiness.test.ts

# Run Integration Readiness Test
npx tsx src/ai/__tests__/final-demo.test.ts

# Verify Production Build
npm run build
```

---

## 🎥 3-Minute Hackathon Demo Script for Judges

1. **0:00 – 0:30 (Hero & Problem)**: Introduce the fear of scams and confusion surrounding Census 2027.
2. **0:30 – 1:15 (Scam Detector)**: Paste *"Officer called asking for OTP"* in Stage 1 to show instant High-Risk detection & 1930 reporting.
3. **1:15 – 2:00 (Question Explorer)**: Show the 33 official Houselisting questions in Stage 2 and explain our strict "No Fake Questions" guarantee.
4. **2:00 – 2:30 (Schedule Lookup)**: Select a state in Stage 3 to view national windows and `se.census.gov.in` portal instructions.
5. **2:30 – 3:00 (AI Engine & Multilingual)**: Click a demo prompt chip in `AskCensusHub`, show the **Deterministic Confidence Score (77%)** with cited official sources, and switch language to Hindi/Marathi.
