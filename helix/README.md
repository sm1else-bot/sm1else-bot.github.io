# Helix exhibition — first-viewport prototype

Scope: only the opening viewport and its six-stage artifact selector are implemented.
The existing case study is preserved byte-for-byte under ../helix_old/.
No engineering or collaboration page has been implemented. Their compositions below
are proposals for review, not claims of working navigation.

## Three composition proposals

### A. The Evidence Table — selected prototype

Typography: Archivo, a compact, sharp grotesque. Large project-name typography is
counterweighted by small source captions and a narrow evidence index.
Layout: an asymmetric editorial grid, with a margin index, a dominant artifact
and a separate ownership column. Black rules organize the surface. Acid yellow
marks the project identifier and the selected property's source stamp.
Imagery: actual saved interface captures and an explicitly labeled crop of the
Vexcel image visible in the source-evidence screenshot. No invented UI or geometry.
Interaction: keyboard-accessible Source / Investigation / Inside / Engine / Finance Lab / Decision tabs
change the artifact and its caption. Exterior and interior findings are animated
annotations over the corresponding saved source image. The engine visual is pending;
the decision is retypeset from its saved memorandum. A short image transition supports the change.
The main title and artifact enter once. Reduced-motion preferences disable motion.
Hierarchy: project identity, visible engineering material, purpose, then authorship.
Future Engineering composition: a broad annotated architecture atlas with selectable
boundaries, real contract excerpts and failure/verification evidence.
Future Collaboration composition: a chronological handoff ledger whose selected
Slack task expands its branch, acceptance criteria and recorded result.

### B. The Cutaway

Typography: a wide industrial sans with compact editorial captions.
Layout: offset image planes, with the building as the spatial anchor and
observations and saved output exposed as successive layers.
Imagery: source imagery, actual observation records and the exact corresponding
interface output; no generic city photography.
Interaction: a draggable, keyboard-operable cut reveals these layers against the
same selected property. The main hierarchy moves from building to interpretation
to conditional decision.
Future Engineering composition: inspectable source-to-contract cutaways.
Future Collaboration composition: authors, requests and implementation handoffs
attached to each layer.

### C. The Dispatch Wall

Typography: compact bold headlines, regular sans text, and timestamp annotations.
Layout: an irregular exhibition wall of screenshots, implementation excerpts and
actual recorded tasks. Artifact scale follows importance rather than card uniformity.
Imagery: product captures, source snippets, real commit excerpts and selected Slack
records, identified by origin.
Interaction: selecting an artifact brings related evidence into focus; the visitor
can follow either chronological development or a specific engineering question.
Hierarchy: concrete artifact first, record and context second.
Future Engineering composition: failure/resolution constellations.
Future Collaboration composition: selected threads with explicit human/agent
attribution, replacing a simulated chat animation.

## Evidence reviewed

Source repository: https://github.com/sm1else-bot/helix
Reviewed main: 789992a. Source was cloned separately and left unmodified.
Earlier implementation and preservation branches were also inspected through Git.

- README.md: final application location and external-data/replay limitations.
- reports/helix-stage-2-implementation.md: implementation and acceptance repair,
  including the distinction between HTTP success and a usable Matterport tour.
- project helix/stage2/orchestrator.py: source collection, identity checks,
  reconciliation and integration of team implementations.
- project helix/stage3_engine/README.md and adapter.py: pinned team engine,
  exact listing/space identity and locally cached jurisdiction requirements.
- project helix/OPPORTUNITY_REPORT.md and opportunity_report.py: bounded model
  context, source snapshots, candidate-order validation, and semantic-support limits.
- project helix/finance_lab/engine.py: integration of team cost and cash modules.
- The preserved existing engineering archive, including the reported historical
  411-pass/10-skip check and later data-dependent profile-size failure. Those are
  historical records; these application tests were not rerun for a static prototype.
- TRIAGE+ at https://projects.jessenth.com/triageplus/: benchmark for linking
  technical assertions to implementation, history, limitations and verification.

## Ownership anchors

Jessenth's implementation:
af68d9f (intake), c87a759 / 06d95d5 (discovery and validation),
9560469 / 6138fbd (building investigation),
586793c (integration of the existing deterministic screening engine),
1a3981c (opportunity report backend),
bfce2d3 (initial Finance Lab and physical profile),
8d92d96 (multi-step Nemotron turn repair).
These distinguish integration from authorship of the underlying team engines.

The source report explicitly credits Asmit's reconciliation and Jayant's compliance
implementation. Finance Lab vendors existing team cost, neighborhood and cash
modules. The later end-to-end report UI/handoff and memorandum passes are recorded
under f7c3b3f and 34e4f3e. Slack identifies the former task as
"Owner: Jessenth (Claude on Asmit's laptop)"; attribution must preserve that
cross-device human/agent context instead of inferring sole authorship from Git.

Slack records inspected read-only, without sending messages:
- Stage 1 task and validation:
  https://hackprincetonavengers.slack.com/archives/C0CHPFE4490/p1794708036791289
- Stage 2 task and acceptance repair:
  https://hackprincetonavengers.slack.com/archives/C0CHPFE4490/p1794718078424649
- Nemotron tool-turn repair:
  https://hackprincetonavengers.slack.com/archives/C0CHPFE4490/p1794704233231789
- Task-format, ownership, status-reaction and shared-decision conventions are
  documented in the source repository's AGENTS.md.
No full Slack transcript or credentials are bundled with this prototype.

## Image provenance and boundaries

All displayed imagery and decision records concern 15603 W Hardy Rd, Houston (CoStar property 236138).
The prototype does not mix in the South Broadway modeled financial results.

- assets/hardy-aerial.webp: crop (88,217)-(674,1520) of the preserved
  screenshots/source-evidence.jpg, rotated 90 degrees counterclockwise.
  Original source credit remains in the asset. This is image material extracted
  from an existing screenshot, not a newly fetched provider image.
  The original full screenshot remains one click away.
- assets/observations.jpg and memorandum.jpg: unmodified copies of the preserved
  corresponding screenshots.
- assets/spatial.jpg: unmodified saved spatial view, retained for next-stage review.
- Source, investigation and decision captions explicitly distinguish visible
  observations, saved model output and business outcomes.
No backend, new external provider query, reconstructed geometry, synthetic metric
or live-investigation claim is introduced.

## Preview

Run python -m http.server 8775 --bind 127.0.0.1 from the project collection root.
Open http://127.0.0.1:8775/helix/.
Build the public distribution using python tools/build_site.py.

## Reviewed viewport revision

The masthead now reads jessenth.com / Selected Engineering and
built at Princeton, 13-15th Nov, 2026. The margin label is Adaptive Reuse.
The introductory text uses the owner's exact requested wording:
Got money? Don't know what to do with it? Try Helix
HELIX now has substantially looser tracking and disabled font kerning to keep
the L and I distinct.

The exterior scene reuses hardy-aerial.webp without changing the image position
when Source becomes Investigation. SVG outlines, circles and leader lines are
projected from source-image coordinates into the centered cover crop. HTML labels
remain legible at each viewport width. A ResizeObserver reprojects annotations when
the image area changes. Shapes trace in over 850ms, staggered by 130ms, with eased
label entrances. No continuous animation runs. Reduced motion reveals marks directly.

New hardy-interior.webp is the image-only crop (150,0)-(1644,1062) of spatial.jpg.
The interior's corridor, existing partition and electrical outlets are visible in
that saved frame. The saved observations record supports these categories.
No ceiling-height measurement, structural conclusion, furnishing claim or physical
rejection count has been invented. The caption retains the unresolved scan-to-suite
coverage issue.

Decision is now an HTML exhibit transcribed from memorandum.jpg:
- veterinary clinic, proceed to diligence;
- base cash to open $406,940;
- $50,000 reserve;
- $443,060 modeled headroom against the saved $900,000 cash budget;
- 10 of 26 businesses clearing all gates, with six diligence items still open.
These are recorded scenario outputs, not a fresh model execution. The original
memo screenshot remains linked from the scene.

The Engine stage is intentionally a visual slot pending the owner's animation.
Its copy describes the existing registry and three gate families without inventing
a 3D rendering or implying a running screening process.

Browser verification covered all five scenes at 1440, 1366, 1024, 768, 390 and 320px,
checking no document horizontal overflow or nested scrolling in the text panels.
Successive transition screenshots verify moving evidence marks. Source-to-exterior
image continuity, keyboard navigation, reduced motion and absence of runtime errors
were also checked.


## Annotation hierarchy refinement

Every annotation now leads with the visible finding, followed by its smaller
verification note. The exterior uses Building footprint / Suite allocation unknown.
Its former rectangular boundary is replaced by a hand-traced polygon following
the visible roof perimeter and its setbacks in the saved aerial. This is an image
annotation, not surveyed geometry or a statement of lease boundaries.
Interior labels are Existing partition / Structural status unknown;
Interior corridor / Clearance not measured; and
Visible power outlets / Electrical capacity unknown.
The distinction between identifying a partition and establishing its structural
role is retained.


## Finance Lab exhibit

Finance Lab is placed after the deterministic engine and before Decision.
hardy-finance.webp is an image-only crop (780,0)-(2795,866) of the original
helix_old/screenshots/finance.jpg. The original screenshot remains linked.

The screenshot identifies the same Hardy Road property, 5,941-SF selected space,
listing 22141592, and veterinary-clinic scenario as the saved memorandum.
Its visible numbers reconcile: $406,940 opening costs + $50,000 reserve =
$456,940 required; $900,000 starting cash minus this requirement = $443,060
headroom. No fresh financial run is implied.

Animated callouts identify the base opening cost, the required amount including
reserve, and the $152,250 base build-out benchmark. The latter explicitly retains
the worksheet's limitation: its benchmark unit size is unknown, so it is not scaled
to the selected suite. The full screenshot preserves low/base/high assumptions
and source citations.

The worksheet uses contain instead of cover so its numeric columns remain visible
on narrow screens. Annotation geometry uses the same fit mode, keeping outlines
and leader endpoints aligned with their evidence.


## Financial decomposition — current Finance Lab presentation

This revision supersedes the annotated Finance Lab screenshot presentation.
Photographs reveal evidence through annotations; numeric relationships are
visualized. Screenshots are linked as original application records.

A proportional $900,000 allocation contains ten opening-cost segments, a fixed
$50,000 reserve, and remaining headroom. Low/base/high controls update all values
and widths. Component buttons identify their source or calculation basis.
Keyboard focus also exposes that basis. Reduced-motion preferences remove width
transitions; mobile uses natural document flow, with no nested scrolling.

Verified totals: low $222,263, base $406,940, high $591,617.
Corresponding headroom: $627,737, $443,060, $258,383.
All ten component amounts sum exactly to the corresponding opening cost.

The source ledger is preserved in assets/hardy-finance-data.json, with input
and provenance details. The saved Finance Lab screenshot establishes the base
case and visible components, and its scenario card records the Stage 3 low/high
range. The original deterministic venture_costs calculation was run locally with
those recorded inputs (veterinary, 5,941 SF, $3,218 monthly rent, three build months)
to cross-check the component values and all totals. No provider call, new business
assumption, or revenue forecast was introduced. Private saved JSON was not available.
The existing build-out scaling limitation is retained.

Decision is explicitly labeled the saved base-case memorandum. Changing the
Finance Lab scenario does not rewrite that historical decision.

The engine implementation from commit 5bbbeb6 was retained unchanged: iframe,
source URL, exhibit caption, load/unload behavior and all engine CSS rules.
Verification covered all six exhibit stages, six viewport widths, keyboard controls,
reduced motion, each scenario's monetary invariants and proportional chart widths.
