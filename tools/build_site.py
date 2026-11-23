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
for folder in ("helix", "helix_old", "slackologics"):
    shutil.copytree(ROOT / folder, SITE / folder, dirs_exist_ok=True)
# Version the new prototype assets while preserving the archived HTML.
prototype = SITE / "helix" / "index.html"
html = prototype.read_text(encoding="utf-8")
for name in ("prototype.css", "prototype.js"):
    version = hashlib.sha256((ROOT / "helix" / name).read_bytes()).hexdigest()[:12]
    html = re.sub(re.escape(name) + r'(?:\?v=[a-z0-9]+)?', name + "?v=" + version, html)
prototype.write_text(html, encoding="utf-8")
story_page = SITE / "slackologics" / "index.html"
story_html = story_page.read_text(encoding="utf-8")
version = hashlib.sha256((ROOT / "slackologics" / "story.css").read_bytes()).hexdigest()[:12]
story_html = story_html.replace('href="story.css"', 'href="story.css?v=' + version + '"')
story_page.write_text(story_html, encoding="utf-8")
print("Built _site with content-versioned assets")
