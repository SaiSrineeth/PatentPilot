from app.ai.similarity import calculate_similarity
from app.ai.report import generate_report
from app.ai.properties import calculate_properties

def analyze_patent(smiles, target, disease):

    # Simple AI simulation (will be replaced later)

    length_score = len(smiles)

    novelty_score = min(
        95,
        max(40, length_score * 5)
    )


    if novelty_score >= 75:
        risk_level = "Low"
    elif novelty_score >= 50:
        risk_level = "Medium"
    else:
        risk_level = "High"


    summary = (
        f"The compound {smiles} was analyzed for "
        f"{target or 'unknown target'} related to "
        f"{disease or 'unknown disease'}. "
        f"The predicted novelty score is {novelty_score}%. "
        f"Patent similarity risk is {risk_level}."
    )

    similarity = calculate_similarity(smiles)
    properties = calculate_properties(smiles)

    report = generate_report(
    smiles,
    target,
    disease,
    novelty_score,
    risk_level,
    similarity["similarity_score"],
    similarity["similarity_result"]
    )

    return {
    "novelty_score": novelty_score,
    "risk_level": risk_level,
    "ai_summary": summary,

    "similarity_score": similarity["similarity_score"],
    "similarity_result": similarity["similarity_result"],

    "molecular_weight": properties["molecular_weight"],
    "logp": properties["logp"],
    "hbd": properties["hbd"],
    "hba": properties["hba"],

    "report": report
}