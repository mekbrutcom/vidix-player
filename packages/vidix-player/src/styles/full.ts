/**
 * Full player CSS.
 *
 * Ported verbatim from scaffold-design/vidix-player-full.js:18-1305. Contains the
 * complete styling: controls, share dialog/bottom-sheet, server select popover,
 * loading activity, error states, and the dark theme overrides.
 */

/* eslint-disable */
// biome-ignore format: verbatim port of hand-tuned CSS */
export const FULL_STYLE = `
:host {

    --vidix-red: #FF383C;
    --vidix-orange: #FF8D28;
    --vidix-yellow: #FFCC00;
    --vidix-green: #34C759;
    --vidix-mint: #00C8B3;
    --vidix-teal: #00C3D0;
    --vidix-cyan: #00C0E8;
    --vidix-blue: #0088FF;
    --vidix-indigo: #6155F5;
    --vidix-purple: #CB30E0;
    --vidix-pink: #FF2D55;
    --vidix-brown: #AC7F5E;

    --vidix-gray-4: #D1D1D6;
    --vidix-gray-5: #E5E5EA;
    --vidix-gray-6: #F2F2F7;

    --vidix-label: #000000;
    --vidix-label-secondary: rgba(60, 60, 67, 0.85);

    --vidix-background: #FFFFFF;

    --vidix-fill: rgba(120, 120, 128, 0.2);
    --vidix-fill-secondary: rgba(120, 120, 128, 0.16);
    --vidix-fill-tertiary: rgba(118, 118, 128, 0.12);
    --vidix-fill-quaternary: rgba(116, 116, 128, 0.08);

    --vidix-placeholder: rgba(60, 60, 67, 0.3);
    --vidix-separator: rgba(60, 60, 67, 0.29);
    --vidix-link: #06c;

    --vidix-full-sheet: #fff;
    --vidix-overlay-default: oklab(0% 0 0 / 0.200);

    --vidix-btn-bg: var(--vidix-gray-5);
    --vidix-btn-bg-hover: var(--vidix-gray-5);

}

:host([data-theme="dark"]) {

    --vidix-red: #FF4245;
    --vidix-orange: #FF9230;
    --vidix-yellow: #FFD600;
    --vidix-green: #30D158;
    --vidix-mint: #00DAC3;
    --vidix-teal: #00D2E0;
    --vidix-cyan: #3CD3FE;
    --vidix-blue: #0091FF;
    --vidix-indigo: #6D7CFF;
    --vidix-purple: #DB34F2;
    --vidix-pink: #FF375F;
    --vidix-brown: #B78A66;

    --vidix-gray-4: #3A3A3C;
    --vidix-gray-5: #2C2C2E;
    --vidix-gray-6: #1C1C1E;

    --vidix-label: #FFFFFF;
    --vidix-label-secondary: rgba(235, 235, 245, 0.856);

    --vidix-background: #000000;

    --vidix-fill: rgba(120, 120, 128, 0.36);
    --vidix-fill-secondary: rgba(120, 120, 128, 0.32);
    --vidix-fill-tertiary: rgba(118, 118, 128, 0.24);
    --vidix-fill-quaternary: rgba(118, 118, 128, 0.18);

    --vidix-placeholder: rgba(235, 235, 245, 0.3);
    --vidix-separator: rgba(84, 84, 88, 0.6);
    --vidix-link: #0071e3;

    --vidix-full-sheet: #252525;

    --vidix-overlay-default: oklab(0% 0 0 / 0.200);

    --vidix-btn-bg: linear-gradient(180deg, var(--vidix-gray-5) 0%, var(--vidix-gray-6) 100%);
    --vidix-btn-bg-hover: linear-gradient(180deg, var(--vidix-gray-4) 0%, var(--vidix-gray-5) 100%);

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
    border-image-source: none;
    border-image-slice: 100%;
    border-image-width: 1;
    border-image-outset: 0;
    border-image-repeat: stretch;
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
}

.vidix-player-wrapper iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-width: 0px;
    border-style: none;
    border-color: transparent;
    border-image: none;
    position: relative;
    z-index: 1;
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
    transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.08s ease, border-color 0.15s ease;
}

.vidix-share-page:hover,
.vidix-control-server:hover,
.vidix-control-download:hover {
    background: var(--vidix-btn-bg-hover);
}

.vidix-share-page:focus-visible,
.vidix-control-server:focus-visible,
.vidix-control-download:focus-visible {
    outline: 1px solid var(--vidix-blue);
    outline-offset: 0px;
}

.vidix-player-control[data-accent-vidix="default"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="default"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="default"] .vidix-control-download:focus-visible,
.vidix-player-control[data-accent-vidix="vidix"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="vidix"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="vidix"] .vidix-control-download:focus-visible {
    outline-color: var(--vidix-link);
}

.vidix-player-control[data-accent-vidix="red"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="red"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="red"] .vidix-control-download:focus-visible {
    outline-color: var(--vidix-red);
}

.vidix-player-control[data-accent-vidix="orange"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="orange"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="orange"] .vidix-control-download:focus-visible {
    outline-color: var(--vidix-orange);
}

.vidix-player-control[data-accent-vidix="yellow"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="yellow"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="yellow"] .vidix-control-download:focus-visible {
    outline-color: var(--vidix-yellow);
}

.vidix-player-control[data-accent-vidix="green"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="green"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="green"] .vidix-control-download:focus-visible {
    outline-color: var(--vidix-green);
}

.vidix-player-control[data-accent-vidix="mint"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="mint"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="mint"] .vidix-control-download:focus-visible {
    outline-color: var(--vidix-mint);
}

.vidix-player-control[data-accent-vidix="teal"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="teal"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="teal"] .vidix-control-download:focus-visible {
    outline-color: var(--vidix-teal);
}

.vidix-player-control[data-accent-vidix="cyan"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="cyan"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="cyan"] .vidix-control-download:focus-visible {
    outline-color: var(--vidix-cyan);
}

.vidix-player-control[data-accent-vidix="blue"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="blue"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="blue"] .vidix-control-download:focus-visible {
    outline-color: var(--vidix-blue);
}

.vidix-player-control[data-accent-vidix="indigo"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="indigo"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="indigo"] .vidix-control-download:focus-visible {
    outline-color: var(--vidix-indigo);
}

.vidix-player-control[data-accent-vidix="purple"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="purple"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="purple"] .vidix-control-download:focus-visible {
    outline-color: var(--vidix-purple);
}

.vidix-player-control[data-accent-vidix="pink"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="pink"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="pink"] .vidix-control-download:focus-visible {
    outline-color: var(--vidix-pink);
}

.vidix-player-control[data-accent-vidix="brown"] .vidix-share-page:focus-visible,
.vidix-player-control[data-accent-vidix="brown"] .vidix-control-server:focus-visible,
.vidix-player-control[data-accent-vidix="brown"] .vidix-control-download:focus-visible {
    outline-color: var(--vidix-brown);
}

.vidix-share-page {
    min-width: 2.25rem;
    border-radius: 10rem;
    padding: 0;
    gap: 0.25rem;
}

.vidix-share-page span {
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

.vidix-control-server>svg {
    width: 0.5rem;
    height: 0.5rem;
}

.vidix-text-server {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5rem;
}

.vidix-text-server svg {
    width: 1.25rem;
    height: 1.25rem;
}

.vidix-share-page svg {
    width: 1.25rem;
    height: 1.25rem;
}

.vidix-control-download svg {
    width: 0.95rem;
    height: 0.95rem;
    filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.35));
    flex-shrink: 0;
}

.vidix-player-wrapper {
    background: var(--vidix-fill-quaternary);
    container-type: size;
}

.vidix-player-wrapper.is-loading {
    position: relative;
    overflow: hidden;
}

.vidix-player-wrapper.is-loading>iframe {
    visibility: hidden;
}

.vidix-blurup {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
    pointer-events: none;
    filter: blur(20px);
}

.vidix-blurup.is-ready {
    opacity: 1;
}

.vidix-loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--vidix-label);
    z-index: 0;
    pointer-events: none;
}

.vidix-activity {
    width: min(18cqw, 18cqh);
    height: min(18cqw, 18cqh);
}

:host([data-accent-vidix="default"]) .vidix-activity,
:host([data-accent-vidix="vidix"]) .vidix-activity {
    color: var(--vidix-link);
}

:host([data-accent-vidix="red"]) .vidix-activity {
    color: var(--vidix-red);
}

:host([data-accent-vidix="orange"]) .vidix-activity {
    color: var(--vidix-orange);
}

:host([data-accent-vidix="yellow"]) .vidix-activity {
    color: var(--vidix-yellow);
}

:host([data-accent-vidix="green"]) .vidix-activity {
    color: var(--vidix-green);
}

:host([data-accent-vidix="mint"]) .vidix-activity {
    color: var(--vidix-mint);
}

:host([data-accent-vidix="teal"]) .vidix-activity {
    color: var(--vidix-teal);
}

:host([data-accent-vidix="cyan"]) .vidix-activity {
    color: var(--vidix-cyan);
}

:host([data-accent-vidix="blue"]) .vidix-activity {
    color: var(--vidix-blue);
}

:host([data-accent-vidix="indigo"]) .vidix-activity {
    color: var(--vidix-indigo);
}

:host([data-accent-vidix="purple"]) .vidix-activity {
    color: var(--vidix-purple);
}

:host([data-accent-vidix="pink"]) .vidix-activity {
    color: var(--vidix-pink);
}

:host([data-accent-vidix="brown"]) .vidix-activity {
    color: var(--vidix-brown);
}

.vidix-player-error {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    text-align: center;
    padding: 1rem;
    font-size: 0.9rem;
    color: var(--vidix-label);
    background: var(--vidix-fill-quaternary);
}

.vidix-player-error>svg {
    width: min(20cqw, 20cqh);
    height: min(20cqw, 20cqh);
    color: var(--vidix-red);
}

.vidix-player-error>p {
    margin: 0;
    font-size: 0.875rem;
}

@keyframes vidixActivityIndicatorFade {
    from {
        opacity: 1;
    }

to {
    opacity: 0;
}
}

.vidix-skeleton {
    position: relative;
    overflow: hidden;
    pointer-events: none;
}

.vidix-skeleton>* {
    visibility: hidden;
}

.vidix-skeleton>.v-sr-only {
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

.vidix-select-wrapper {
    position: relative;
    display: inline-flex;
}

.vidix-control-server {
    perspective: 600px;
}

.vidix-control-server>svg:last-child {
    transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
    transform-origin: center;
    will-change: transform;
}

.vidix-control-server.is-open>svg:last-child {
    transform: rotateX(180deg);
}

.vidix-select-content {
    position: absolute;
    left: 0;
    min-width: 10rem;
    box-sizing: border-box;
    background: var(--vidix-full-sheet);
    border: 1px solid var(--vidix-separator);
    border-radius: 1.5rem;
    padding: 0.375rem;
    box-shadow:
    0 8px 20px var(--vidix-overlay-default),
    0 16px 48px var(--vidix-overlay-default),
    0 0 0 1px var(--vidix-separator);
    z-index: 30;
    opacity: 0;
    overflow: hidden;
    transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}

.vidix-select-scroll {
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.vidix-select-scroll::-webkit-scrollbar {
    display: none;
}

.vidix-select-content:not(.is-open) .vidix-select-scroll {
    overflow: hidden;
}

.vidix-select-scroll:focus-visible {
    outline: 2px solid var(--vidix-blue);
    outline-offset: -2px;

    border-radius: 1.125rem;
}

.vidix-select-content.fade-top::before,
.vidix-select-content.fade-bottom::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 2rem;
    pointer-events: none;
    z-index: 2;
}

.vidix-select-content.fade-top::before {
    top: 0;
    background: linear-gradient(to bottom, var(--vidix-full-sheet), oklab(from var(--vidix-full-sheet) l a b / 0));
}

.vidix-select-content.fade-bottom::after {
    bottom: 0;
    background: linear-gradient(to top, var(--vidix-full-sheet), oklab(from var(--vidix-full-sheet) l a b / 0));
}

.vidix-select-content:not(.is-open) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    min-width: 0;
    pointer-events: none;
}

.vidix-select-content[data-side="top"] {
    bottom: calc(100% + 6px);
    top: auto;
    transform: translateY(6px) scale(0.96);
}

.vidix-select-content[data-side="top"].is-open {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.vidix-select-content[data-side="bottom"] {
    top: calc(100% + 6px);
    bottom: auto;
    transform: translateY(-6px) scale(0.96);
}

.vidix-select-content[data-side="bottom"].is-open {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.vidix-select-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.65rem;
    border-radius: 10rem;
    font-size: inherit;
    color: var(--vidix-label);
    cursor: pointer;
    user-select: none;
    transition: background-color 0.12s ease, color 0.12s ease;
}

.vidix-select-item:hover {
    background-color: var(--vidix-fill-quaternary);
    color: var(--vidix-label);
}

.vidix-select-item.is-active {
    background-color: var(--vidix-fill-tertiary);
    color: var(--vidix-label);
    font-weight: 500;
}

.vidix-player-control[data-accent-vidix="default"] .vidix-select-item.is-active,
.vidix-player-control[data-accent-vidix="vidix"] .vidix-select-item.is-active {
    background-color: var(--vidix-link);
    color: #fff;
}

.vidix-player-control[data-accent-vidix="default"] .vidix-select-item:hover:not(.is-active),
.vidix-player-control[data-accent-vidix="vidix"] .vidix-select-item:hover:not(.is-active) {
    background-color: color-mix(in srgb, var(--vidix-link) 20%, transparent);
}

.vidix-player-control[data-accent-vidix="red"] .vidix-select-item.is-active {
    background-color: var(--vidix-red);
    color: #fff;
}

.vidix-player-control[data-accent-vidix="red"] .vidix-select-item:hover:not(.is-active) {
    background-color: color-mix(in srgb, var(--vidix-red) 20%, transparent);
}

.vidix-player-control[data-accent-vidix="orange"] .vidix-select-item.is-active {
    background-color: var(--vidix-orange);
    color: #000;
}

.vidix-player-control[data-accent-vidix="orange"] .vidix-select-item:hover:not(.is-active) {
    background-color: color-mix(in srgb, var(--vidix-orange) 20%, transparent);
}

.vidix-player-control[data-accent-vidix="yellow"] .vidix-select-item.is-active {
    background-color: var(--vidix-yellow);
    color: #000;
}

.vidix-player-control[data-accent-vidix="yellow"] .vidix-select-item:hover:not(.is-active) {
    background-color: color-mix(in srgb, var(--vidix-yellow) 20%, transparent);
}

.vidix-player-control[data-accent-vidix="green"] .vidix-select-item.is-active {
    background-color: var(--vidix-green);
    color: #000;
}

.vidix-player-control[data-accent-vidix="green"] .vidix-select-item:hover:not(.is-active) {
    background-color: color-mix(in srgb, var(--vidix-green) 20%, transparent);
}

.vidix-player-control[data-accent-vidix="mint"] .vidix-select-item.is-active {
    background-color: var(--vidix-mint);
    color: #000;
}

.vidix-player-control[data-accent-vidix="mint"] .vidix-select-item:hover:not(.is-active) {
    background-color: color-mix(in srgb, var(--vidix-mint) 20%, transparent);
}

.vidix-player-control[data-accent-vidix="teal"] .vidix-select-item.is-active {
    background-color: var(--vidix-teal);
    color: #000;
}

.vidix-player-control[data-accent-vidix="teal"] .vidix-select-item:hover:not(.is-active) {
    background-color: color-mix(in srgb, var(--vidix-teal) 20%, transparent);
}

.vidix-player-control[data-accent-vidix="cyan"] .vidix-select-item.is-active {
    background-color: var(--vidix-cyan);
    color: #000;
}

.vidix-player-control[data-accent-vidix="cyan"] .vidix-select-item:hover:not(.is-active) {
    background-color: color-mix(in srgb, var(--vidix-cyan) 20%, transparent);
}

.vidix-player-control[data-accent-vidix="blue"] .vidix-select-item.is-active {
    background-color: var(--vidix-blue);
    color: #fff;
}

.vidix-player-control[data-accent-vidix="blue"] .vidix-select-item:hover:not(.is-active) {
    background-color: color-mix(in srgb, var(--vidix-blue) 20%, transparent);
}

.vidix-player-control[data-accent-vidix="indigo"] .vidix-select-item.is-active {
    background-color: var(--vidix-indigo);
    color: #fff;
}

.vidix-player-control[data-accent-vidix="indigo"] .vidix-select-item:hover:not(.is-active) {
    background-color: color-mix(in srgb, var(--vidix-indigo) 20%, transparent);
}

.vidix-player-control[data-accent-vidix="purple"] .vidix-select-item.is-active {
    background-color: var(--vidix-purple);
    color: #fff;
}

.vidix-player-control[data-accent-vidix="purple"] .vidix-select-item:hover:not(.is-active) {
    background-color: color-mix(in srgb, var(--vidix-purple) 20%, transparent);
}

.vidix-player-control[data-accent-vidix="pink"] .vidix-select-item.is-active {
    background-color: var(--vidix-pink);
    color: #fff;
}

.vidix-player-control[data-accent-vidix="pink"] .vidix-select-item:hover:not(.is-active) {
    background-color: color-mix(in srgb, var(--vidix-pink) 20%, transparent);
}

.vidix-player-control[data-accent-vidix="brown"] .vidix-select-item.is-active {
    background-color: var(--vidix-brown);
    color: #fff;
}

.vidix-player-control[data-accent-vidix="brown"] .vidix-select-item:hover:not(.is-active) {
    background-color: color-mix(in srgb, var(--vidix-brown) 20%, transparent);
}

.vidix-select-check {
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.12s ease, transform 0.12s ease;
}

.vidix-select-item.is-active .vidix-select-check {
    opacity: 1;
    transform: scale(1);
}

.vidix-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 9998;
    animation: vidixFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.vidix-modal-positioner {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: flex-end;

    justify-content: center;
    pointer-events: none;
}

.vidix-modal-content {
    position: relative;
    pointer-events: auto;
    background: var(--vidix-full-sheet);
    color: var(--vidix-label);
    box-sizing: border-box;
    width: 100%;
    max-height: 85vh;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 0.25rem 1.25rem 0.5rem;
    padding-bottom: max(1rem, env(safe-area-inset-bottom, 1rem));
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.35), 0 -1px 0 var(--vidix-separator);
    animation: vidixSlideUp 0.28s cubic-bezier(0.32, 0.72, 0, 1);
}

.vidix-modal-drag-handle {
    width: 36px;
    height: 5px;
    border-radius: 9999px;
    background: var(--vidix-placeholder);
    margin: 0.375rem auto 0.375rem;
    flex-shrink: 0;
}

.vidix-modal-header {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-right: 2.5rem;
    gap: 0.875rem;
}

.vidix-modal-header-meta {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0.875rem;
    min-width: 0;
    flex: 1;
}

.vidix-modal-thumb {
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    overflow: hidden;
    background: var(--vidix-fill);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--vidix-label-secondary);
}

.vidix-modal-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.vidix-modal-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
    flex: 1;
}

.vidix-modal-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--vidix-label);
    letter-spacing: -0.01em;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.vidix-modal-desc {
    margin: 0;
    font-size: 0.875rem;
    color: var(--vidix-label-secondary);
    line-height: 1.25;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.vidix-modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: var(--vidix-fill);
    border: none;
    cursor: pointer;
    color: var(--vidix-label-secondary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.15s ease, color 0.15s ease, transform 0.12s ease;
    flex-shrink: 0;
    z-index: 10;
}

.vidix-modal-close:hover {
    background: var(--vidix-fill-secondary);
    color: var(--vidix-label);
}

.vidix-modal-close:focus-visible,
.vidix-share-app-item:focus-visible,
.vidix-share-action-item:focus-visible {
    outline: 1px solid var(--vidix-blue);
    outline-offset: 0px;
}

:host([data-accent-vidix="default"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="default"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="default"]) .vidix-share-action-item:focus-visible,
:host([data-accent-vidix="vidix"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="vidix"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="vidix"]) .vidix-share-action-item:focus-visible {
    outline-color: var(--vidix-link);
}

:host([data-accent-vidix="red"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="red"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="red"]) .vidix-share-action-item:focus-visible {
    outline-color: var(--vidix-red);
}

:host([data-accent-vidix="orange"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="orange"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="orange"]) .vidix-share-action-item:focus-visible {
    outline-color: var(--vidix-orange);
}

:host([data-accent-vidix="yellow"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="yellow"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="yellow"]) .vidix-share-action-item:focus-visible {
    outline-color: var(--vidix-yellow);
}

:host([data-accent-vidix="green"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="green"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="green"]) .vidix-share-action-item:focus-visible {
    outline-color: var(--vidix-green);
}

:host([data-accent-vidix="mint"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="mint"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="mint"]) .vidix-share-action-item:focus-visible {
    outline-color: var(--vidix-mint);
}

:host([data-accent-vidix="teal"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="teal"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="teal"]) .vidix-share-action-item:focus-visible {
    outline-color: var(--vidix-teal);
}

:host([data-accent-vidix="cyan"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="cyan"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="cyan"]) .vidix-share-action-item:focus-visible {
    outline-color: var(--vidix-cyan);
}

:host([data-accent-vidix="blue"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="blue"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="blue"]) .vidix-share-action-item:focus-visible {
    outline-color: var(--vidix-blue);
}

:host([data-accent-vidix="indigo"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="indigo"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="indigo"]) .vidix-share-action-item:focus-visible {
    outline-color: var(--vidix-indigo);
}

:host([data-accent-vidix="purple"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="purple"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="purple"]) .vidix-share-action-item:focus-visible {
    outline-color: var(--vidix-purple);
}

:host([data-accent-vidix="pink"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="pink"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="pink"]) .vidix-share-action-item:focus-visible {
    outline-color: var(--vidix-pink);
}

:host([data-accent-vidix="brown"]) .vidix-modal-close:focus-visible,
:host([data-accent-vidix="brown"]) .vidix-share-app-item:focus-visible,
:host([data-accent-vidix="brown"]) .vidix-share-action-item:focus-visible {
    outline-color: var(--vidix-brown);
}

.vidix-share-grid-apps {
    display: flex;
    flex-direction: row;
    gap: 1.125rem;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
}

.vidix-share-grid-apps::-webkit-scrollbar {
    display: none;
}

.vidix-share-app-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;
    text-decoration: none;
    color: var(--vidix-label);
    flex-shrink: 0;
    width: 4rem;
    cursor: pointer;
    transition: transform 0.15s ease;
}

.vidix-share-app-icon {
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transition: box-shadow 0.15s ease, transform 0.15s ease;
}

.vidix-share-app-item:hover .vidix-share-app-icon {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
}

.vidix-app-whatsapp {
    background: #25d366;
}

.vidix-app-telegram {
    background: #229ed9;
}

.vidix-app-x {
    background: #000000;
}

.vidix-app-facebook {
    background: #1877f2;
}

.vidix-share-app-label {
    font-size: 12px;
    font-weight: 400;
    color: var(--vidix-label);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.vidix-modal-separator {
    height: 1px;
    background: var(--vidix-separator);
    border: none;
    margin: 0.25rem 0;
    width: 100%;
}

.vidix-share-grid-actions {
    display: flex;
    flex-direction: row;
    gap: 1.125rem;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
}

.vidix-share-grid-actions::-webkit-scrollbar {
    display: none;
}

.vidix-share-action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;
    background: transparent;
    border: none;
    color: var(--vidix-label);
    flex-shrink: 0;
    width: 68px;
    cursor: pointer;
    padding: 0;
    font-family: inherit;
    text-decoration: none;
    transition: transform 0.15s ease;
}

.vidix-share-action-btn {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: var(--vidix-fill);
    color: var(--vidix-label);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
}

.vidix-share-action-item:hover .vidix-share-action-btn {
    background: var(--vidix-fill-secondary);
}

.vidix-share-action-label {
    font-size: 12px;
    font-weight: 400;
    color: var(--vidix-label);
    text-align: center;
    line-height: 1.2;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@media (min-width: 768px) {
    .vidix-player-wrapper {
        border-radius: 0.75rem;
    }

.vidix-player-error>svg {
    width: min(15cqw, 15cqh);
    height: min(15cqw, 15cqh);
}

.vidix-share-page {
    padding: 0 0.75rem;
    display: inline-flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}

.vidix-share-page span {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
}

.vidix-modal-positioner {
    align-items: center;

    padding: 1rem;
}

.vidix-modal-content {
    max-width: 420px;
    border-radius: 2rem;
    padding: 1.25rem 1.5rem 1.5rem;
    border: 1px solid var(--vidix-separator);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45), 0 0 0 1px var(--vidix-separator);
    animation: vidixScaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.vidix-modal-drag-handle {
    display: none;
}

.vidix-modal-title {
    font-size: 1.25rem;
}

.vidix-modal-desc {
    font-size: 15px;
}

.vidix-share-grid-apps,
.vidix-share-grid-actions {
    gap: 1.5rem;
}

.vidix-activity {
    width: min(12cqw, 12cqh);
    height: min(12cqw, 12cqh);
}

.vidix-player-error>p {
    font-size: 1rem;
}
}

@media (min-width: 1024px) {
    .vidix-player-wrapper {
        border-radius: 1rem;
    }

.vidix-control-server,
.vidix-share-page,
.vidix-control-download {
    height: 2.5rem;
}

.vidix-share-page svg {
    width: 1.5rem;
    height: 1.5rem;
}

.vidix-control-download svg {
    width: 1.05rem;
    height: 1.05rem;
}
}

@keyframes vidixFadeIn {
    from {
        opacity: 0;
    }

to {
    opacity: 1;
}
}

@keyframes vidixSlideUp {
    from {
        transform: translateY(100%);
    }

to {
    transform: translateY(0);
}
}

@keyframes vidixScaleUp {
    from {
        opacity: 0;
        transform: scale(0.96);
    }

to {
    opacity: 1;
    transform: scale(1);
}
}
`;
