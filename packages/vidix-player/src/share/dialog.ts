/**
 * `<vidix-share-dialog>`: bottom-sheet on mobile, centered dialog on desktop.
 *
 * Ported from scaffold-design/vidix-player-full.js:2771-3069. Lives in the
 * player's shadow tree (so the shadow styles apply), but manages its own markup
 * imperatively: `open`/`copied` setters trigger targeted re-renders.
 *
 * Registration is wrapped in `defineVidixShareDialog()` (no module side effects),
 * called by the full bundle entry.
 */

import type { VidixPlayerElement } from "../types.js";
import { HTMLElementBase } from "../utils/element.js";
import { escapeHtml } from "../utils/html.js";
import { isValidImageUrl } from "../utils/image.js";
import { translate } from "../utils/locale.js";
import { log } from "../utils/log.js";
import { trustedHTML } from "../utils/trusted-types.js";

const ICON_CHECK =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

const ICON_COPY =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.9473 31.5137" width="24" height="28" fill="currentColor" aria-hidden="true"><path d="M17.7539 1.12305L24.4629 7.91992C25.3125 8.78906 25.5859 9.64844 25.5859 10.9863L25.5859 21.5039C25.5859 24.0234 24.3262 25.3027 21.8262 25.3027L19.4824 25.3027L19.4824 23.5742L21.7383 23.5742C23.1348 23.5742 23.8574 22.832 23.8574 21.4746L23.8574 10.4785L17.6465 10.4785C16.2891 10.4785 15.6152 9.84375 15.6152 8.44727L15.6152 1.72852L9.96094 1.72852C8.55469 1.72852 7.83203 2.5 7.83203 3.83789L7.83203 6.17187L6.10352 6.17187L6.10352 3.79883C6.10352 1.2793 7.38281 0 9.87305 0L14.8535 0C16.0254 0 16.9336 0.292969 17.7539 1.12305ZM17.1875 8.21289C17.1875 8.71094 17.3926 8.90625 17.8809 8.90625L23.3691 8.90625L17.1875 2.64648Z" fill="currentColor"/><path d="M0 27.6758C0 30.2051 1.25977 31.4746 3.75977 31.4746L15.7227 31.4746C18.2227 31.4746 19.4824 30.1953 19.4824 27.6758L19.4824 17.5977C19.4824 16.1426 19.3066 15.5078 18.3984 14.5898L11.1621 7.25586C10.3027 6.37695 9.59961 6.17188 8.30078 6.17188L3.75977 6.17188C1.2793 6.17188 0 7.46094 0 9.9707ZM1.72852 27.6465L1.72852 10.0098C1.72852 8.67188 2.45117 7.90039 3.85742 7.90039L8.28125 7.90039L8.28125 15.3906C8.28125 16.8848 9.0332 17.5977 10.4883 17.5977L17.7539 17.5977L17.7539 27.6465C17.7539 29.0039 17.0312 29.7461 15.625 29.7461L3.84766 29.7461C2.45117 29.7461 1.72852 29.0039 1.72852 27.6465ZM10.6836 15.9668C10.127 15.9668 9.91211 15.752 9.91211 15.1953L9.91211 8.36914L17.4121 15.9668Z" fill="currentColor"/></svg>';

const ELEMENT_NAME = "vidix-share-dialog";

export class VidixShareDialog extends HTMLElementBase {
  private _open = false;
  private _copied = false;
  private _triggerBtn: HTMLElement | null = null;
  private _triggerHandler: ((e: MouseEvent) => void) | null = null;
  private _onKeyDown = (e: KeyboardEvent): void => {
    if (this._open && e.key === "Escape") {
      this.close();
    }
  };

  /** Opens/closes the dialog and manages focus. */
  get open(): boolean {
    return this._open;
  }

  set open(value: boolean) {
    const next = Boolean(value);
    if (next === this._open) return;
    this._open = next;
    this.toggleAttribute("open", next);
    this._triggerBtn?.setAttribute("aria-expanded", String(next));
    this.render();
    if (next) {
      // Focus the close button on open for keyboard/screen-reader users.
      this.querySelector<HTMLElement>(".vidix-modal-close")?.focus();
    } else if (this._triggerBtn) {
      // Restore focus to the trigger on close.
      this._triggerBtn.focus();
    }
  }

  /** Toggles the copy state. Only patches the copy button — a full re-render
   * would replay the entry animation and make the button flicker. */
  get copied(): boolean {
    return this._copied;
  }

  set copied(value: boolean) {
    const next = Boolean(value);
    if (next === this._copied) return;
    this._copied = next;
    if (this._open) this.renderCopiedState();
  }

  private renderCopiedState(): void {
    const player = this.getPlayer();
    const locale = player?._vidixLocale || "en";

    const btn = this.querySelector(".vidix-share-action-btn");
    if (btn) {
      btn.innerHTML = trustedHTML(this._copied ? ICON_CHECK : ICON_COPY);
    }

    const label = this.querySelector(".vidix-share-action-label");
    if (label) {
      label.textContent = translate(locale, this._copied ? "copied" : "copy");
    }
  }

  private getPlayer(): VidixPlayerElement | null {
    const root = this.getRootNode();
    return (root instanceof ShadowRoot ? root.host : null) as VidixPlayerElement | null;
  }

  connectedCallback(): void {
    this.connectExternalTrigger();
    window.addEventListener("keydown", this._onKeyDown);
  }

  disconnectedCallback(): void {
    window.removeEventListener("keydown", this._onKeyDown);
    if (this._triggerBtn && this._triggerHandler) {
      this._triggerBtn.removeEventListener("click", this._triggerHandler);
    }
  }

  /** Wires the share button that lives elsewhere in the same shadow root. */
  private connectExternalTrigger(): void {
    const root = this.getRootNode();
    const trigger =
      root instanceof ShadowRoot ? root.querySelector<HTMLElement>(".vidix-share-page") : null;
    if (trigger) {
      this._triggerBtn = trigger;
      trigger.setAttribute("aria-haspopup", "dialog");
      trigger.setAttribute("aria-expanded", String(this.open));
      this._triggerHandler = (e) => {
        e.preventDefault();
        this.open = true;
      };
      trigger.addEventListener("click", this._triggerHandler);
    }
  }

  close(): void {
    this.open = false;
  }

  /** Copies the page URL, preferring the async clipboard API. */
  copyCurrentUrl(): void {
    const url = window.location.href;
    const onSuccess = () => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(onSuccess)
        .catch(() => {
          this.fallbackCopy(url, onSuccess);
        });
    } else {
      this.fallbackCopy(url, onSuccess);
    }
  }

  private fallbackCopy(text: string, onSuccess: () => void): void {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      onSuccess();
    } catch (e) {
      log(this.getPlayer(), "failed to copy", e);
    }
  }

  private render(): void {
    if (!this._open) {
      this.innerHTML = trustedHTML("");
      return;
    }

    const player = this.getPlayer();
    const title = player?.getAttribute("data-video-title") || "";
    const locale = player?._vidixLocale || "en";

    // Thumbnail: server data wins, then the metadata attribute. Not for blur-up —
    // a plain URL, lazy-loaded, right-click disabled.
    const serverThumbnail = (player?._vidixThumbnail || "").trim();
    const propsThumbnail = (player?.getAttribute("metadata-thumbnail-url") || "").trim();
    const thumbnailUrl = isValidImageUrl(serverThumbnail)
      ? serverThumbnail
      : isValidImageUrl(propsThumbnail)
        ? propsThumbnail
        : null;

    const currentUrl = window.location.href;

    this.innerHTML = trustedHTML(`
      <!-- Backdrop (click outside to close) -->
      <div class="vidix-modal-backdrop" aria-hidden="true"></div>

      <!-- Container: bottom-sheet below 768px, centered dialog at/above it -->
      <div
        class="vidix-modal-positioner"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vidix-share-title"
      >
        <div class="vidix-modal-content">
          <!-- Mobile drag indicator (Apple HIG) -->
          <div class="vidix-modal-drag-handle" aria-hidden="true"></div>

          <button class="vidix-modal-close" aria-label="${translate(locale, "closeDialog")}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.1197 19.7779" width="16" height="16" fill="currentColor" aria-hidden="true">
              <rect height="19.7779" opacity="0" width="20.1197" x="0" y="0"/>
              <path d="M0.27467 19.5032C0.65553 19.8645 1.261 19.8645 1.63209 19.5032L9.87428 11.2512L18.1262 19.5032C18.4876 19.8645 19.1126 19.8743 19.4739 19.5032C19.845 19.1223 19.845 18.5169 19.4739 18.1555L11.2317 9.90358L19.4739 1.65162C19.845 1.2903 19.8547 0.675061 19.4739 0.303967C19.1028-0.0573608 18.4876-0.0573608 18.1262 0.303967L9.87428 8.55592L1.63209 0.303967C1.261-0.0573608 0.645764-0.0671265 0.27467 0.303967C-0.0866577 0.684827-0.0866577 1.2903 0.27467 1.65162L8.52662 9.90358L0.27467 18.1555C-0.0866577 18.5169-0.0964233 19.1321 0.27467 19.5032Z" fill="currentColor"/>
            </svg>
          </button>

          <!-- Header: Thumbnail + Title/Subtitle -->
          <div class="vidix-modal-header">
            <div class="vidix-modal-header-meta">
              <div class="vidix-modal-thumb">
                ${
                  thumbnailUrl
                    ? `<img src="${escapeHtml(thumbnailUrl)}" alt="${escapeHtml(title)}" loading="lazy" decoding="async" draggable="false" />`
                    : ""
                }
              </div>
              <div class="vidix-modal-info">
                <h2 class="vidix-modal-title" id="vidix-share-title">${escapeHtml(title)}</h2>
                <p class="vidix-modal-desc" id="vidix-share-desc">${translate(locale, "shareDesc")}</p>
              </div>
            </div>
          </div>

          <hr class="vidix-modal-separator" />

          <!-- Social apps (HIG squircle icons) -->
          <div class="vidix-share-grid-apps" role="group" aria-label="${translate(locale, "shareTo")}">
            <a
              class="vidix-share-app-item"
              href="https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="vidix-share-app-icon vidix-app-whatsapp">
                <svg fill="none" viewBox="0 0 360 362" width="36" height="36" aria-hidden="true"><path fill="#ffffff" fill-rule="evenodd" d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z" clip-rule="evenodd"/></svg>
              </div>
              <span class="vidix-share-app-label">WhatsApp</span>
            </a>

            <a
              class="vidix-share-app-item"
              href="https://t.me/share/url?url=${encodeURIComponent(currentUrl)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="vidix-share-app-icon vidix-app-telegram">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37"/>
                </svg>
              </div>
              <span class="vidix-share-app-label">Telegram</span>
            </a>

            <a
              class="vidix-share-app-item"
              href="https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="vidix-share-app-icon vidix-app-x">
                <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <span class="vidix-share-app-label">X</span>
            </a>

            <a
              class="vidix-share-app-item"
              href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="vidix-share-app-icon vidix-app-facebook">
                <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span class="vidix-share-app-label">Facebook</span>
            </a>
          </div>

          <hr class="vidix-modal-separator" />

          <!-- Actions: copy link only -->
          <div class="vidix-share-grid-actions" role="group" aria-label="${translate(locale, "actions")}">
            <button class="vidix-share-action-item" aria-label="${translate(locale, "copyLink")}">
              <div class="vidix-share-action-btn">
                ${this._copied ? ICON_CHECK : ICON_COPY}
              </div>
              <span class="vidix-share-action-label">${this._copied ? translate(locale, "copied") : translate(locale, "copy")}</span>
            </button>
          </div>
        </div>
      </div>
    `);

    // Listeners are attached after the DOM exists (replacing template @click).
    this.querySelector(".vidix-modal-backdrop")?.addEventListener("click", () => this.close());
    this.querySelector(".vidix-modal-content")?.addEventListener("click", (e) =>
      e.stopPropagation(),
    );
    this.querySelector(".vidix-modal-close")?.addEventListener("click", () => this.close());
    this.querySelector(".vidix-share-action-item")?.addEventListener("click", () =>
      this.copyCurrentUrl(),
    );
    const thumbImg = this.querySelector<HTMLImageElement>(".vidix-modal-thumb img");
    if (thumbImg) {
      thumbImg.addEventListener("contextmenu", (e) => e.preventDefault());
      thumbImg.addEventListener("error", (e) => {
        (e.target as HTMLElement).style.display = "none";
      });
    }
  }
}

/** Registers `<vidix-share-dialog>`. Idempotent; browser-only. */
export function defineVidixShareDialog(): void {
  if (typeof customElements === "undefined") return;
  if (customElements.get(ELEMENT_NAME)) return;
  customElements.define(ELEMENT_NAME, VidixShareDialog);
}
