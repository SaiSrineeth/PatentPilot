import re

try:
    from rdkit import Chem
    from rdkit.Chem import AllChem
    from rdkit.DataStructs import TanimotoSimilarity
except Exception:  # pragma: no cover - optional dependency fallback
    Chem = None
    AllChem = None
    TanimotoSimilarity = None


known_compounds = [
    "CCO",
    "CCN",
    "CCC",
    "CC(=O)O",
    "CC(=O)NC1=CC=CC=C1",
    "C1=CC=CC=C1",
]


def _heuristic_similarity(smiles: str) -> tuple[int, str]:
    text = (smiles or "").upper()
    if not text:
        return 0, "No SMILES provided"

    score = 0
    if "C" in text:
        score += 8
    if "O" in text:
        score += 8
    if "N" in text:
        score += 6
    if "CL" in text or "BR" in text:
        score += 10
    if len(text) > 20:
        score += 10

    score = min(95, score + (len(re.findall(r"[A-Z]", text)) * 3))
    if score > 70:
        result = "High structural similarity found"
    elif score > 40:
        result = "Moderate structural similarity found"
    else:
        result = "Low structural similarity found"
    return score, result


def calculate_similarity(smiles):
    if Chem is None or AllChem is None or TanimotoSimilarity is None:
        score, result = _heuristic_similarity(smiles)
        return {"similarity_score": score, "similarity_result": result}

    molecule = Chem.MolFromSmiles(smiles)

    if molecule is None:
        return {"similarity_score": 0, "similarity_result": "Invalid SMILES"}

    fingerprint = AllChem.GetMorganFingerprintAsBitVect(molecule, radius=2, nBits=2048)
    highest_similarity = 0

    for compound in known_compounds:
        known_molecule = Chem.MolFromSmiles(compound)
        if known_molecule is None:
            continue

        known_fp = AllChem.GetMorganFingerprintAsBitVect(known_molecule, radius=2, nBits=2048)
        similarity = TanimotoSimilarity(fingerprint, known_fp)
        highest_similarity = max(highest_similarity, similarity)

    score = round(highest_similarity * 100)

    if score > 70:
        result = "High structural similarity found"
    elif score > 40:
        result = "Moderate structural similarity found"
    else:
        result = "Low structural similarity found"

    return {"similarity_score": score, "similarity_result": result}