/**
 * Critical CSS: only the rules that shape first-paint geometry.
 *
 * Ported verbatim from scaffold-design/vidix-player.js:24-276. Every declaration
 * here must have an identically-sized counterpart in full.ts so the hydrated
 * render does not shift anything (CLS stays at 0).
 */

/* eslint-disable */
// biome-ignore format: verbatim port of hand-tuned CSS */
export const CRITICAL_STYLE = `
:host {
    --vidix-gray-5: #E5E5EA;
    --vidix-gray-6: #F2F2F7;

    --vidix-label: #000000;

    --vidix-fill-secondary: rgba(120, 120, 128, 0.16);
    --vidix-fill-tertiary: rgba(118, 118, 128, 0.12);
    --vidix-fill-quaternary: rgba(116, 116, 128, 0.08);

    --vidix-btn-bg: var(--vidix-gray-5);
}

:host([data-theme="dark"]) {
    --vidix-gray-5: #2C2C2E;
    --vidix-gray-6: #1C1C1E;

    --vidix-label: #FFFFFF;

    --vidix-fill-secondary: rgba(120, 120, 128, 0.32);
    --vidix-fill-tertiary: rgba(118, 118, 128, 0.24);
    --vidix-fill-quaternary: rgba(118, 118, 128, 0.18);

    --vidix-btn-bg: linear-gradient(180deg, var(--vidix-gray-5) 0%, var(--vidix-gray-6) 100%);
}

.v-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
}

:host,
:host([layout-control-position="bottom"]) {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    max-width: 100vw;
    height: auto;
    box-sizing: border-box;
}

:host([layout-control-position="top"]) .vidix-player-control {
    order: 1;
}

vidix-share-dialog {
    display: contents;
}

:host([layout-control-position="top"]) .vidix-player-wrapper {
    order: 2;
}

.vidix-player-wrapper {
    aspect-ratio: 16 / 9;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    overflow: hidden;
    border-radius: 0.5rem;
    background: var(--vidix-fill-quaternary);
}

.vidix-player-control {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    row-gap: 0.5rem;
    column-gap: 1rem;
    font-size: 1rem;
    box-sizing: border-box;
}

.vidix-control-start {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5rem;
}

.vidix-share-page,
.vidix-control-server,
.vidix-control-download {
    height: 2.25rem;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    box-sizing: border-box;
    font-family: inherit;
    font-size: inherit;
    font-weight: 400;
    line-height: 1;
    user-select: none;
    color: var(--vidix-label);
    background: var(--vidix-btn-bg);
    border: 1px solid var(--vidix-fill-tertiary);
    border-bottom: 0px;
}

.vidix-share-page {
    min-width: 2.25rem;
    border-radius: 10rem;
    padding: 0;
    gap: 0.25rem;
}

.vidix-control-server {
    gap: 1rem;
    padding: 0 0.75rem;
    border-radius: 10rem;
}

.vidix-control-download {
    gap: 0.25rem;
    padding: 0 0.75rem;
    border-radius: 10rem;
}

.vidix-text-server {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5rem;
}

/* Icon placeholder: an empty box exactly the size of the real SVG
   (the .vidix-*-svg sizes in VIDIX_STYLE) so the skeleton buttons are as
   wide as the final buttons; the contents are hidden by the shimmer. */
.vidix-share-page .vidix-ico {
    width: 1.25rem;
    height: 1.25rem;
}

.vidix-text-server .vidix-ico {
    width: 1.25rem;
    height: 1.25rem;
}

.vidix-control-server > .vidix-ico {
    width: 0.5rem;
    height: 0.5rem;
}

.vidix-control-download .vidix-ico {
    width: 0.95rem;
    height: 0.95rem;
    flex-shrink: 0;
}

/* Share button label: sr-only below 768px (button is icon-width),
   static above that — same as the full CSS. */
.vidix-share-page .vidix-share-label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.vidix-skeleton {
    position: relative;
    overflow: hidden;
    pointer-events: none;
}

.vidix-skeleton > * {
    visibility: hidden;
}

.vidix-skeleton > .v-sr-only {
    visibility: visible;
}

.vidix-skeleton::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg,
    transparent 0%,
    var(--vidix-fill-secondary, rgba(120, 120, 128, 0.16)) 50%,
    transparent 100%);
    transform: translateX(-100%);
    animation: vidixShimmer 1.2s ease-in-out infinite;
}

@keyframes vidixShimmer {
    100% {
        transform: translateX(100%);
    }
}

@media (min-width: 768px) {
    .vidix-share-page .vidix-share-label {
        position: static;
        width: auto;
        height: auto;
        padding: 0;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
    }
}

@media (min-width: 1024px) {
    .vidix-control-server,
    .vidix-share-page,
    .vidix-control-download {
        height: 2.5rem;
    }

    .vidix-share-page .vidix-ico {
        width: 1.5rem;
        height: 1.5rem;
    }

    .vidix-control-download .vidix-ico {
        width: 1.05rem;
        height: 1.05rem;
    }
}
`;
