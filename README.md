# PatentPilot

PatentPilot is an AI-assisted Freedom-to-Operate (FTO) workspace built to help researchers and innovation teams quickly assess whether a molecule or scaffold may raise patent overlap concerns before significant investment in development. The platform combines a modern web interface with a lightweight analysis pipeline that surfaces likely patent relevance, novelty signals, and a structured review summary.

## Overview

PatentPilot is designed for fast, explainable early-stage screening. Instead of relying on a single black-box model, it combines:

- a simple user workflow for entering a molecule and optional context
- a backend analysis pipeline for similarity and novelty scoring
- a retrieval layer for identifying likely patent-related matches
- a polished frontend for reviewing results and tracking analyses

## Overall architecture

The application is split into three core layers:

- Frontend: A Next.js application with React and Tailwind CSS that provides the dashboard, analysis experience, and report views.
- Backend: A FastAPI service that exposes endpoints for health checks, analysis requests, and stored results.
- AI and retrieval layer: A Python-based analysis stack that scores structural similarity, estimates novelty/risk, ranks patent-like matches, and generates a report.

Optional persistence is handled through Supabase. If the environment is not configured, the app continues to function in a graceful fallback mode and returns results without storing them.

## Retrieval strategy

The retrieval approach is intentionally lightweight and practical for local development and rapid prototyping.

1. Structural signals are derived from the submitted SMILES string.
2. Similarity is estimated using either heuristic scoring or RDKit-based fingerprint comparison when available.
3. Patent relevance is ranked using a hybrid mix of:
   - keyword overlap with a curated patent-style knowledge base
   - target and disease context
   - optional live Google Patents lookup when available
4. The top-ranked matches are surfaced in the UI and summarized in a generated report.

This makes the system useful for early-stage triage while remaining transparent and easy to extend.

## AI workflow

The analysis flow follows a simple pipeline:

1. The user submits a SMILES string, along with an optional target and disease/indication.
2. The backend validates the request and prepares the input for scoring.
3. A similarity model estimates structural overlap and novelty potential.
4. A retrieval layer ranks likely patent-related records based on keywords and context.
5. A report is generated that summarizes the findings and highlights likely review areas.
6. Results are returned to the frontend and can be persisted in Supabase.

## Technologies used

- Next.js 16 and React 19 for the frontend
- FastAPI for the backend API
- Python for the analysis pipeline
- RDKit for molecular structure handling and similarity scoring
- Tailwind CSS for UI styling
- Supabase for optional persistence
- jsPDF for report-related export workflows
- dotenv for environment management

## Assumptions made

This version is intentionally designed as an explainable, lightweight prototype rather than a legal-grade patent intelligence platform.

Assumptions include:

- The app is meant for early-stage screening and exploration, not final legal decision-making.
- Patent data is approximated using a curated local knowledge base and optional public lookup rather than a licensed patent database.
- The scoring system prioritizes transparency and speed over full-scale claim analysis.

## Trade-offs

The current implementation favors simplicity and feasibility over full production depth.

Trade-offs include:

- Lower retrieval precision than a commercial patent intelligence platform
- Heuristic scoring instead of full-domain-specific legal analysis
- Faster setup and local development, but less exhaustive coverage
- A modular architecture that is easy to expand, but not yet optimized for enterprise-scale retrieval

## Future improvements

There are several strong next steps for evolving PatentPilot into a more complete product:

- Integrate real patent APIs such as Google Patents, SureChEMBL, or Lens
- Add semantic retrieval with embeddings and vector search
- Improve the report system with claim-level summaries and better evidence linking
- Add true authentication and per-user workspaces
- Expand the analysis engine with richer molecular and therapeutic context
- Add export, notebook-style review workflows, and collaboration features

## Running locally

### Prerequisites

- Node.js 18+ recommended
- Python 3.10+ recommended

### Backend

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
.\venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open:

- http://localhost:3000
- API health check: http://127.0.0.1:8000/health

## Environment variables

Create a .env file inside the backend folder with the following values if you want Supabase persistence enabled:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
```

If these values are missing, the application will continue to run in a non-persistent mode.
