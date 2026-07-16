from rdkit import Chem
from rdkit.Chem import Descriptors
from rdkit.Chem import Crippen
from rdkit.Chem import Lipinski


def calculate_properties(smiles):

    molecule = Chem.MolFromSmiles(smiles)

    if molecule is None:
        return {
            "molecular_weight": 0,
            "logp": 0,
            "hbd": 0,
            "hba": 0
        }


    return {

        "molecular_weight": round(
            Descriptors.MolWt(molecule),
            2
        ),

        "logp": round(
            Crippen.MolLogP(molecule),
            2
        ),

        "hbd": Lipinski.NumHDonors(
            molecule
        ),

        "hba": Lipinski.NumHAcceptors(
            molecule
        )
    }