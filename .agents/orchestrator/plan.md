# Audit Plan: 360° Website Audit

We will conduct a comprehensive 360° audit of the website located at `C:\Users\godsw\.gemini\antigravity\worktrees\001\discuss-workflow-design-specs` based on:
1. Color System (`skills/color-system/SKILL.md`)
2. Layout Composition (`global_workflows/workflow-impeccable-layout.md`)
3. UX Critique & Technical Audit (`workflow-impeccable-critique.md`, `workflow-impeccable-audit.md`, `workflow-impeccable-optimize.md`)

## Steps

1. **Decompose & Dispatch Explorers**:
   - Spawn **Explorer 1** (`teamwork_preview_explorer`) to audit the Color System and Visual Theme.
   - Spawn **Explorer 2** (`teamwork_preview_explorer`) to audit the Layout Composition (LIFT System, Temporal Flow, and Spacing).
   - Spawn **Explorer 3** (`teamwork_preview_explorer`) to audit the UX Critique, Accessibility, and Technical Performance (GSAP, ScrollTrigger, bundle size, assets).
2. **Collect and Synthesize**:
   - Aggregate the findings from the three Explorer subagents.
   - Identify consensus, disagreements, gaps, and priority issues (P0 to P3).
3. **Dispatch Worker**:
   - Spawn a **Worker** (`teamwork_preview_worker`) to compile all findings into the final, prioritized master report: `master_audit_report.md` at `C:\Users\godsw\.gemini\antigravity\brain\5fa59791-3e3a-4d17-bf9f-031b28eecea5\master_audit_report.md`.
4. **Review & Verify**:
   - Spawn **Reviewers** or verify that the master report meets all acceptance criteria.
5. **Report to Sentinel**:
   - Notify the Sentinel of task completion with a summary of the report.
