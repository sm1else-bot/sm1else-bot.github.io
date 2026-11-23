# Helix exhibition — first-viewport prototype

Scope: only the opening viewport and its saved-artifact selector are implemented.
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
Interaction: keyboard-accessible Source / Investigation / Decision tabs change
the actual artifact and its caption. A short image transition supports the change.
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

All displayed captures concern 15603 W Hardy Rd, Houston (CoStar property 236138).
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
