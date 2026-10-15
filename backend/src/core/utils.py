"""Общие утилиты: генерация slug."""

# Транслитерация кириллицы в латиницу по ГОСТ-подобной схеме,
# достаточной для читаемых URL вида `novyy-hudi`.
_CYRILLIC_MAP: dict[str, str] = {
    "а": "a",
    "б": "b",
    "в": "v",
    "г": "g",
    "д": "d",
    "е": "e",
    "ё": "e",
    "ж": "zh",
    "з": "z",
    "и": "i",
    "й": "y",
    "к": "k",
    "л": "l",
    "м": "m",
    "н": "n",
    "о": "o",
    "п": "p",
    "р": "r",
    "с": "s",
    "т": "t",
    "у": "u",
    "ф": "f",
    "х": "h",
    "ц": "ts",
    "ч": "ch",
    "ш": "sh",
    "щ": "sch",
    "ъ": "",
    "ы": "y",
    "ь": "",
    "э": "e",
    "ю": "yu",
    "я": "ya",
    # Ukrainian
    "і": "i",
    "ї": "yi",
    "є": "ye",
    "ґ": "g",
}


def slugify(value: str) -> str:
    """Приводит произвольную строку к slug-виду.

    Пробелы и пунктуация заменяются дефисами, повторные дефисы
    схлопываются, кириллица транслитерируется.
    """
    result: list[str] = []

    for char in value.strip().lower():
        replacement: str = _CYRILLIC_MAP.get(char, char)
        result.append(replacement)

    joined: str = "".join(result)

    cleaned: list[str] = []
    prev_dash = False

    for char in joined:
        if char.isascii() and char.isalnum():
            cleaned.append(char)
            prev_dash = False
        elif not prev_dash and cleaned:
            cleaned.append("-")
            prev_dash = True

    return "".join(cleaned).strip("-")
