import json
from pathlib import Path
import random
import re


from .exceptions import KakulationError


def kakulate(query):
    if isinstance(query, str):
        if re.match(r"^[ 0-9/*+-]*$", query):
            return _kakulate_int(random.randint(1, 10))
        return _kakulate_string(query)
    if isinstance(query, int):
        return _kakulate_int(query)

    raise KakulationError(f"Unable to kakulate object of type '{type(query)}'.")


def _kakulate_string(query):
    json_path = (
        Path(__file__).resolve().parent / "resources" / "kakulation_results.json"
    )
    with open(json_path) as results_json:
        results = json.loads(results_json.read())
        kakulated_result = results[random.randint(0, len(results) - 1)]
    return kakulated_result


def _kakulate_int(query):
    return random.randint(-1000000, 1000000)
