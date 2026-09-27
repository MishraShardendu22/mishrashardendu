# Shared Design System & Brand Specification

This document details the unified visual system and design tokens for the federated product ecosystem, ensuring independent surfaces look and feel like a single cohesive product family.

> [!NOTE]
> This repository implements the shared design specification independently. No shared package or dependency is imported; this file is for documentation purposes only. It is safe to edit locally if this repository's needs diverge intentionally in the future.

---

## 1. Design Token System

### 1.1 Planetary Warm Dark Palette
*   **Background (Global Void Canvas)**: `#0e0c0a` (warm planetary near-black)
*   **Surface Primary (Cards, Headers, Sidebars)**: `#161311` (obsidian warm surface)
*   **Surface Elevated (Inputs, Secondary Areas)**: `#1e1a16` (deep warm fill)
*   **Surface Popover / Hover**: `#27221c`
*   **Borders (Subtle / Hairline)**: `#2f2923`
*   **Borders (Elevated / Strong)**: `#413930`
*   **Text (Primary / Starlight Cream)**: `#f3ebdd`
*   **Text (Secondary)**: `#b9ae9d`
*   **Text (Muted)**: `#8e8374`

### 1.2 Observatory Starlight Amber Accent
*   **Accent Primary**: `#d9a55b` (starlight amber)
*   **Accent Hover/Light**: `#e6b56c`
*   **Accent Active/Dark**: `#c59146`
*   **Accent Muted/Glow**: `rgba(217, 165, 91, 0.15)`
*   **Status Emerald**: `#4caf7d`
*   **Status Terracotta/Orange**: `#e8893f`
*   **Status Danger**: `#e06060`

### 1.3 Typography Pairings
*   **Headings/Titles**: `Space Grotesk` (Geometric, sharp sans-serif)
*   **Body & User Interface**: `IBM Plex Sans` (Technical sans-serif)
*   **Code & Logs / Data**: `IBM Plex Mono` (Technical monospace)

### 1.4 Spacing & Border Radius
*   **Spacing Base**: 4px scale (`4px` xs / `8px` sm / `16px` md / `24px` lg / `48px` xl)
*   **Buttons & Inputs Radius**: `6px` to `8px`
*   **Cards, Dialogs, & Modals Radius**: `12px`

### 1.5 Motion Timing & Easing
*   **Standard Transition**: `200ms` using standard ease-in-out easing (`cubic-bezier(0.4, 0, 0.2, 1)`)
*   **Sidebar Slide Transition**: `300ms` using snappy ease-out-quint easing (`cubic-bezier(0.16, 1, 0.3, 1)`)

### 1.6 Icon Standard
*   **Icon Library**: Lucide Icons
*   **Stroke Width**: `1.5px`
