#!/usr/bin/env python3
"""
Translate all German string values in a JSON file to English,
preserving the original structure.
"""

import json
import sys
from pathlib import Path
from typing import Any, Union

# -------------------------------------------------
# Install dependencies (run once):
# pip install googletrans==4.0.0rc1
# -------------------------------------------------
from googletrans import Translator  # type: ignore


def translate_text(text: str, src: str = "de", dest: str = "en") -> str:
    """
    Translate a single piece of text from German to English.
    This wrapper makes it easy to replace the backend later.
    """
    # Skip empty strings or non‑alphabetic content
    if not text.strip():
        return text

    try:
        result = translator.translate(text, src=src, dest=dest)
        return result.text
    except Exception as e:
        # In production you’d want proper logging / retries
        print(f"Translation failed for '{text}': {e}", file=sys.stderr)
        return text


def walk_and_translate(obj: Any, field: str = None, do_all: bool = False) -> Any:
    """
    Recursively walk through the JSON structure.
    - Dictionaries: translate each value.
    - Strings: translate if they contain German characters/words.
    - Other types (lists, numbers, bool, null): leave untouched.
    """
    if isinstance(obj, dict):
        return {k: walk_and_translate(v, k) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [walk_and_translate(i) for i in obj]
    elif isinstance(obj, str) and (do_all or field in ["Thought", "Option", "ExamineText", "ThoughtText", "Name"]):
        # Heuristic: translate any non‑empty string.
        # You could add language‑detection here if needed.
        return translate_text(obj)
    else:
        return obj


def main(input_path: Union[str, Path], output_path: Union[str, Path]) -> None:
    with open(input_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    translated = walk_and_translate(data)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(translated, f, ensure_ascii=False, indent=2)

    print(f"Translated JSON written to {output_path}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python translate_json.py <input.json> <output.json>")
        sys.exit(1)

    input_file = Path(sys.argv[1])
    output_file = Path(sys.argv[2])

    translator = Translator()
    main(input_file, output_file)
