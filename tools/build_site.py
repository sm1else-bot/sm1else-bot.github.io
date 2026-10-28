"""Assemble the public site with content-versioned CSS and JavaScript URLs."""
from pathlib import Path
import hashlib
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "_site"
SITE.mkdir(exist_ok=True)
html = (ROOT / "index.html").read_text(encoding="utf-8-sig")
for name in ("styles.css", "projects.js", "app.js"):
    source = ROOT / name
    version = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
    html = re.sub(re.escape(name) + r'(?:\?v=[a-z0-9]+)?', name + "?v=" + version, html)
    shutil.copyfile(source, SITE / name)
(SITE / "index.html").write_text(html, encoding="utf-8")
shutil.copyfile(ROOT / "favicon.svg", SITE / "favicon.svg")
shutil.copytree(ROOT / "assets", SITE / "assets", dirs_exist_ok=True)
shutil.copytree(ROOT / "trackback", SITE / "trackback", dirs_exist_ok=True)
print("Built _site with content-versioned assets")
