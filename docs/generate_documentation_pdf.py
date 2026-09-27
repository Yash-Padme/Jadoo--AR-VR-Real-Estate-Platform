#!/usr/bin/env python3
"""Generate project documentation PDF from markdown source.

Usage:
  python3 docs/generate_documentation_pdf.py
"""

from __future__ import annotations

from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    PageBreak,
    Preformatted,
    ListFlowable,
    ListItem,
)

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "Jadoo-AR-VR-Real-Estate-Platform-Documentation.md"
OUTPUT = ROOT / "Jadoo-AR-VR-Real-Estate-Platform-Documentation.pdf"
GENERATED_ON = "September 27, 2026"


def page_number(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 9)
    canvas.setFillColor(colors.grey)
    canvas.drawCentredString(A4[0] / 2.0, 10 * mm, f"Page {doc.page}")
    canvas.restoreState()


def make_styles():
    styles = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "TitlePage",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=26,
            leading=30,
            alignment=1,
            textColor=colors.HexColor("#0f172a"),
            spaceAfter=14,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=13,
            leading=18,
            alignment=1,
            textColor=colors.HexColor("#334155"),
            spaceAfter=10,
        ),
        "h1": ParagraphStyle(
            "H1",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=17,
            leading=22,
            textColor=colors.HexColor("#0b1324"),
            spaceBefore=14,
            spaceAfter=8,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=colors.HexColor("#111827"),
            spaceBefore=10,
            spaceAfter=6,
        ),
        "h3": ParagraphStyle(
            "H3",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=16,
            textColor=colors.HexColor("#1f2937"),
            spaceBefore=8,
            spaceAfter=4,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=10.5,
            leading=15,
            textColor=colors.HexColor("#111827"),
            spaceAfter=5,
        ),
        "toc": ParagraphStyle(
            "TOC",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            leftIndent=0,
            spaceAfter=2,
        ),
        "code": ParagraphStyle(
            "Code",
            parent=styles["Code"],
            fontName="Courier",
            fontSize=8.6,
            leading=11,
            backColor=colors.HexColor("#f8fafc"),
            borderColor=colors.HexColor("#e2e8f0"),
            borderPadding=6,
            borderWidth=0.5,
            borderRadius=2,
            spaceAfter=8,
        ),
    }


def parse_headings(text: str):
    headings = []
    for line in text.splitlines():
        m = re.match(r"^(#{1,3})\s+(.*)$", line.strip())
        if not m:
            continue
        level = len(m.group(1))
        title = m.group(2).strip()
        if title.lower() == "table of contents":
            continue
        headings.append((level, title))
    return headings


def add_markdown_body(story, markdown_text: str, styles):
    lines = markdown_text.splitlines()
    in_code = False
    code_lines = []
    bullet_buffer = []

    def flush_bullets():
        nonlocal bullet_buffer
        if not bullet_buffer:
            return
        items = [
            ListItem(Paragraph(item, styles["body"]), leftIndent=8)
            for item in bullet_buffer
        ]
        story.append(ListFlowable(items, bulletType="bullet", start="•", leftIndent=14))
        story.append(Spacer(1, 3))
        bullet_buffer = []

    for raw in lines:
        line = raw.rstrip("\n")

        if line.strip().startswith("```"):
            if in_code:
                story.append(Preformatted("\n".join(code_lines), styles["code"]))
                code_lines = []
                in_code = False
            else:
                flush_bullets()
                in_code = True
            continue

        if in_code:
            code_lines.append(line)
            continue

        if not line.strip():
            flush_bullets()
            story.append(Spacer(1, 4))
            continue

        m = re.match(r"^(#{1,3})\s+(.*)$", line.strip())
        if m:
            flush_bullets()
            level = len(m.group(1))
            txt = m.group(2).strip()
            if txt.lower() in {"title page", "table of contents"}:
                continue
            style = styles["h1"] if level == 1 else styles["h2"] if level == 2 else styles["h3"]
            story.append(Paragraph(txt, style))
            continue

        if line.strip().startswith("- ") or line.strip().startswith("* "):
            bullet_buffer.append(line.strip()[2:].strip())
            continue

        flush_bullets()

        if line.strip().startswith("|") and line.strip().endswith("|"):
            story.append(Preformatted(line, styles["code"]))
            continue

        if re.match(r"^\d+\.\s+", line.strip()):
            story.append(Paragraph(line.strip(), styles["body"]))
            continue

        if line.strip() == "---":
            story.append(Spacer(1, 4))
            continue

        story.append(Paragraph(line, styles["body"]))

    if in_code and code_lines:
        story.append(Preformatted("\n".join(code_lines), styles["code"]))
    flush_bullets()


def main():
    if not SOURCE.exists():
        raise FileNotFoundError(f"Source markdown not found: {SOURCE}")

    text = SOURCE.read_text(encoding="utf-8")
    styles = make_styles()

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title="Jadoo AR/VR Real Estate Platform Documentation",
        author="Project Documentation Generator",
        subject="Implementation-grounded technical documentation",
    )

    story = []

    # Title page
    story.append(Spacer(1, 60))
    story.append(Paragraph("Jadoo AR/VR Real Estate Platform", styles["title"]))
    story.append(Paragraph("Complete Project Documentation", styles["subtitle"]))
    story.append(Spacer(1, 16))
    story.append(
        Paragraph(
            "Repository: <b>Yash-Padme/Jadoo--AR-VR-Real-Estate-Platform</b>",
            styles["subtitle"],
        )
    )
    story.append(Paragraph(f"Generated on: <b>{GENERATED_ON}</b>", styles["subtitle"]))
    story.append(Spacer(1, 24))
    story.append(
        Paragraph(
            "This document is derived from source files and workflow definitions present in the repository.",
            styles["subtitle"],
        )
    )
    story.append(PageBreak())

    # TOC page
    story.append(Paragraph("Table of Contents", styles["h1"]))
    for level, title in parse_headings(text):
        indent = (level - 1) * 12
        dot_padding = "." * max(6, 100 - len(title))
        entry = f"<para leftIndent={indent}>{title} {dot_padding}</para>"
        story.append(Paragraph(entry, styles["toc"]))
    story.append(PageBreak())

    add_markdown_body(story, text, styles)

    doc.build(story, onFirstPage=page_number, onLaterPages=page_number)
    print(f"Generated PDF: {OUTPUT}")


if __name__ == "__main__":
    main()
