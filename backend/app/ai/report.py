def generate_report(
    smiles,
    target,
    disease,
    novelty_score,
    risk_level,
    similarity_score,
    similarity_result,
    patents=None,
):
    recommendation = ""
    if risk_level == "High":
        recommendation = "High patent risk detected. Detailed patent review is recommended before advancement."
    elif risk_level == "Medium":
        recommendation = "Moderate patent risk. Additional manual review should be completed for the top-ranked patents."
    else:
        recommendation = "Low patent risk detected. The molecule appears potentially novel with limited overlap."

    patent_lines = []
    patents = patents or []
    for patent in patents:
        patent_lines.append(
            f"- {patent['title']} ({patent['patent_number']}) — relevance {patent['relevance_score']}%"
        )

    if not patent_lines:
        patent_lines.append("- No high-confidence patent matches were identified from the local retrieval set.")

    report = f"""
PatentPilot AI Analysis Report

Executive Summary
-----------------
The submitted molecule was scanned against a lightweight public patent retrieval set with a hybrid relevance strategy combining mechanistic keywords, target/disease context, and structural heuristics. The current assessment suggests a {risk_level.lower()} patent risk profile with a novelty score of {novelty_score}%.

Key Similar Patents
-------------------
{chr(10).join(patent_lines)}

Potential Novelty Concerns
-------------------------
The similarity score of {similarity_score}% indicates that the molecule may share a meaningful scaffold or functional motif with existing disclosures. If the target or disease context aligns closely with known claims, this could raise novelty concerns and justify expert review.

Patents Requiring Manual Review
-------------------------------
Patents with relevance scores above 70% should be reviewed manually for claim overlap, assay context, and formulation language. The most likely concerns relate to the therapeutic use and chemical motif rather than the exact molecular string alone.

Overall Recommendation
----------------------
{recommendation}

The recommendation is based on the combined novelty estimate, structural similarity, and the presence of top-ranked patent matches that share relevant therapeutic context.
"""

    return report