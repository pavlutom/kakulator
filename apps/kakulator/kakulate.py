import json
from pathlib import Path
import random


from .exceptions import KakulationError


def kakulate(query):
    if isinstance(query, str):
        json_path = (
            Path(__file__).resolve().parent / "resources" / "kakulation_results.json"
        )
        with open(json_path) as results_json:
            results = json.loads(results_json.read())
            kakulated_result = results[random.randint(0, len(results) - 1)]
        return kakulated_result
    if isinstance(query, int):
        return random.randint(0, 10000)

    raise KakulationError(f"Unable to kakulate object of type '{type(query)}'.")
