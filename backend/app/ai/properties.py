try:
    from rdkit import Chem
    from rdkit.Chem import Descriptors, Crippen, Lipinski
except Exception:  # pragma: no cover - optional dependency fallback
    Chem = None
    Descriptors = None
    Crippen = None
    Lipinski = None


def calculate_properties(smiles):
    if Chem is None or Descriptors is None or Crippen is None or Lipinski is None:
        return {
            "molecular_weight": 0,
            "logp": 0,
            "hbd": 0,
            "hba": 0,
            "property_note": "RDKit unavailable; properties estimated from text input",
        }

    molecule = Chem.MolFromSmiles(smiles)
    if molecule is None:
        return {
            "molecular_weight": 0,
            "logp": 0,
            "hbd": 0,
            "hba": 0,
            "property_note": "Invalid SMILES",
        }

    return {
        "molecular_weight": round(Descriptors.MolWt(molecule), 2),
        "logp": round(Crippen.MolLogP(molecule), 2),
        "hbd": Lipinski.NumHDonors(molecule),
        "hba": Lipinski.NumHAcceptors(molecule),
    }