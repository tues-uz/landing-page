#!/usr/bin/env python3
"""Strip Lex.uz UI noise from fetched markdown; write plain Uzbek body for static hosting."""
import re
import sys


def main() -> None:
    src = sys.argv[1]
    dst = sys.argv[2]
    with open(src, "r", encoding="utf-8") as f:
        text = f.read()

    ui_line = "Hujjatga taklif yuborish Audioni tinglash Hujjat elementidan havola olish"
    lines = [ln for ln in text.splitlines() if ui_line not in ln]

    text = "\n".join(lines)

    text = re.sub(r"\[OKOZ:\s*\n.*?\]", "", text, flags=re.DOTALL)
    text = re.sub(r"\[OKOZ:[^\]]*\]", "", text)
    text = re.sub(r"\[TSZ:\s*\n.*?\]", "", text, flags=re.DOTALL)

    text = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", text)

    for m in (
        "OʻZBEKISTON RESPUBLIKASI VAZIRLAR MAHKAMASINING",
        "O'ZBEKISTON RESPUBLIKASI VAZIRLAR MAHKAMASINING",
    ):
        pos = text.find(m)
        if pos != -1:
            text = text[pos:]
            break

    header = (
        "## Oʻzbekiston Respublikasi Vazirlar Mahkamasi qarori\n\n"
        "### 578-son, 13.09.2025\n\n"
        "Manba: https://lex.uz/uz/docs/-7726569\n\n"
    )

    out = header + text.strip() + "\n"
    out = re.sub(r"\n{3,}", "\n\n", out)

    with open(dst, "w", encoding="utf-8") as f:
        f.write(out)
    print(len(out), "chars ->", dst)


if __name__ == "__main__":
    main()
