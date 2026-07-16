from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.ai.analyzer import analyze_patent

from app.database.database import supabase

app = FastAPI(
    title="PatentPilot API",
    description="AI-assisted Patent Discovery and Review Workspace",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    smiles: str
    target: str | None = None
    disease: str | None = None


@app.get("/")
def root():
    return {"message": "PatentPilot Backend is Running!"}


@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/test-db")
def test_db():
    response = (
        supabase
        .table("analyses")
        .select("*")
        .limit(5)
        .execute()
    )

    return {
        "success": True,
        "data": response.data
    }

@app.post("/analyze")
def analyze(data: AnalysisRequest):

    ai_result = analyze_patent(
        data.smiles,
        data.target,
        data.disease
    )


    response = (
        supabase
        .table("analyses")
        .insert({
            "smiles": data.smiles,
            "target": data.target,
            "disease": data.disease,
            "status": "Submitted",

            "novelty_score": ai_result["novelty_score"],
            "risk_level": ai_result["risk_level"],
            "ai_summary": ai_result["ai_summary"],
            "similarity_score": ai_result["similarity_score"],
            "similarity_result": ai_result["similarity_result"],
            "ai_report": ai_result["report"]
        })
        .execute()
    )


    return {
        "success": True,
        "message": "AI Patent Analysis Completed!",
        "analysis": ai_result,
        "data": response.data
    }

@app.get("/analyses")
def get_analyses():

    response = (
        supabase
        .table("analyses")
        .select("*")
        .order("created_at", desc=True)
        .execute()
    )

    return {
        "success": True,
        "data": response.data
    }