def generate_report(
    smiles,
    target,
    disease,
    novelty_score,
    risk_level,
    similarity_score,
    similarity_result
):

    recommendation = ""


    if risk_level == "High":
        recommendation = (
            "High patent risk detected. "
            "Detailed patent review recommended."
        )

    elif risk_level == "Medium":
        recommendation = (
            "Moderate patent risk. "
            "Additional similarity analysis recommended."
        )

    else:
        recommendation = (
            "Low patent risk detected. "
            "Compound appears potentially novel."
        )


    report = f"""
    PatentPilot AI Analysis Report

    Compound Information
    --------------------
    SMILES: {smiles}
    Target: {target or 'N/A'}
    Disease: {disease or 'N/A'}


    Novelty Assessment
    ------------------
    Novelty Score: {novelty_score}%


    Similarity Assessment
    ---------------------
    Similarity Score: {similarity_score}%
    Result: {similarity_result}


    Patent Risk
    -----------
    Risk Level: {risk_level}


    AI Recommendation
    -----------------
    {recommendation}
    """


    return report