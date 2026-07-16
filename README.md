# PatentPilot

PatentPilot is an AI-assisted Freedom-to-Operate (FTO) workspace for researchers who want a lightweight way to screen a molecule against public patent information before investing in synthesis or optimization.

## Architecture

- Frontend: Next.js app router with Tailwind CSS
- Backend: FastAPI service for analysis and persistence
- AI workflow: heuristic similarity scoring, patent relevance ranking, and structured report generation
- Storage: Supabase table named `analyses` (optional; the app falls back gracefully if it is unavailable)

## Retrieval strategy

The current implementation uses a lightweight hybrid approach:

1. Structural similarity heuristics from the SMILES input
2. Keyword matching against a curated public patent-style knowledge base
3. Context scoring from target and disease inputs
4. Report generation that summarizes the likely overlap and novelty concerns

## AI workflow

1. Submit a SMILES string, target, and optional disease
2. The backend scores the molecule for similarity and generates a novelty/risk profile
3. The app retrieves the most relevant patent-like records and creates a structured report
4. Results are stored in Supabase when configured and surfaced in the dashboard/history/report views

## Technologies used

- Next.js
- FastAPI
- Python
- Supabase
- Tailwind CSS
- jsPDF

## Assumptions and trade-offs

- This version intentionally uses a lightweight in-app retrieval layer rather than a full patent database API integration.
- The system is designed to be extendable: the patent retrieval layer can be swapped for Google Patents, SureChEMBL, PubChem, or a vector database-backed search stack.
- The AI analysis is rule-based and explainable, rather than relying on a full external LLM call.

## Running locally

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
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

Create a .env file in the backend folder with:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
```

## Future improvements

- Integrate a real patent API such as Google Patents or SureChEMBL
- Add embeddings and semantic retrieval for better matching
- Add authentication and per-user history
- Add richer claim-level analysis and risk scoring
