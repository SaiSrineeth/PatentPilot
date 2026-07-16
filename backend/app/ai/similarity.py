from rdkit import Chem
from rdkit.Chem import AllChem
from rdkit.DataStructs import TanimotoSimilarity


# Some sample molecules (temporary database)
known_compounds = [
    "CCO",
    "CCN",
    "CCC",
    "CC(=O)O"
]


def calculate_similarity(smiles):

    molecule = Chem.MolFromSmiles(smiles)

    if molecule is None:
        return {
            "similarity_score": 0,
            "similarity_result": "Invalid SMILES"
        }


    fingerprint = AllChem.GetMorganFingerprintAsBitVect(
        molecule,
        radius=2,
        nBits=2048
    )


    highest_similarity = 0


    for compound in known_compounds:

        known_molecule = Chem.MolFromSmiles(compound)

        known_fp = AllChem.GetMorganFingerprintAsBitVect(
            known_molecule,
            radius=2,
            nBits=2048
        )


        similarity = TanimotoSimilarity(
            fingerprint,
            known_fp
        )


        highest_similarity = max(
            highest_similarity,
            similarity
        )


    score = round(
        highest_similarity * 100
    )


    if score > 70:
        result = "High structural similarity found"

    elif score > 40:
        result = "Moderate structural similarity found"

    else:
        result = "Low structural similarity found"


    return {
        "similarity_score": score,
        "similarity_result": result
    }