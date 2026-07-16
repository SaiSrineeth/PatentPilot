from app.ai.properties import calculate_properties
from app.ai.report import generate_report
from app.ai.patent_search import search_patents
from app.ai.similarity import calculate_similarity


def analyze_patent(smiles, target, disease):
    if not smiles:
        raise ValueError("SMILES is required")

    similarity = calculate_similarity(smiles)
    properties = calculate_properties(smiles)
    patent_info = search_patents(smiles, target, disease)

    length_score = max(40, min(95, len(smiles) * 3 + similarity["similarity_score"] // 2))
    novelty_score = int(round(length_score - (similarity["similarity_score"] * 0.25)))
    novelty_score = max(35, min(95, novelty_score))

    if novelty_score >= 75:
        risk_level = "Low"
    elif novelty_score >= 55:
        risk_level = "Medium"
    else:
        risk_level = "High"

    summary = (
        f"The compound {smiles} was evaluated for {target or 'the specified target'} in the context of "
        f"{disease or 'the proposed indication'}. The current assessment suggests a {risk_level.lower()} patent risk "
        f"profile with a novelty score of {novelty_score}%."
    )

    report = generate_report(
        smiles,
        target,
        disease,
        novelty_score,
        risk_level,
        similarity["similarity_score"],
        similarity["similarity_result"],
        patent_info.get("patents", []),
    )

    return {
        "novelty_score": novelty_score,
        "risk_level": risk_level,
        "ai_summary": summary,
        "similarity_score": similarity["similarity_score"],
        "similarity_result": similarity["similarity_result"],
        "patent_count": patent_info["patent_count"],
        "patent_risk": patent_info["patent_risk"],
        "properties": properties,
        "patents": patent_info.get("patents", []),
        "report": report,
    }