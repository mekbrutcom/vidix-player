/**
 * Server select controller: the dropdown behind `.vidix-control-server`.
 *
 * Ported from scaffold-design/vidix-player-full.js:3074-3295. Renders the popover
 * imperatively into the shadow root, positions it against the viewport, keeps the
 * listbox count in sync with the API, and dispatches `vidix:server-select`.
 */

import { SERVER_COUNT } from "../constants.js";
import type { VidixPlayerElement, VidixServerDataEventDetail } from "../types.js";
import { getPlayerRoot } from "../utils/element.js";
import { translate } from "../utils/locale.js";
import { trustedHTML } from "../utils/trusted-types.js";

const SERVER_VALUE = (n: number) => `Server ${n}`;

export class VidixServerSelect {
  readonly player: VidixPlayerElement;
  readonly button: HTMLElement | null;
  private spanText: HTMLElement | null = null;
  private dropdown!: HTMLDivElement;
  private scrollEl!: HTMLDivElement;
  private currentValue = SERVER_VALUE(1);
  private isOpen = false;
  private totalServers = SERVER_COUNT.dropdownMax as number;

  constructor(player: VidixPlayerElement) {
    this.player = player;
    this.button = getPlayerRoot(player).querySelector(".vidix-control-server");
    if (!this.button) return;

    this.spanText = this.button.querySelector(".vidix-text-server span");

    this.updatePosition = this.updatePosition.bind(this);
    this.createDropdown();
    this.bindEvents();

    // The API decides the real count (data.vod.server_count).
    const preset = Number.parseInt(player.getAttribute("data-server-count") || "", 10);
    if (Number.isFinite(preset) && preset > 0) {
      this.setServerCount(preset);
    }
    player.addEventListener("vidix:server-data", (event) => {
      const detail = (event as CustomEvent<VidixServerDataEventDetail>).detail;
      if (detail && Number.isFinite(detail.serverCount)) {
        this.setServerCount(detail.serverCount);
      }
    });
  }

  /** Rebuilds the option list for a new count and keeps the current selection. */
  setServerCount(count: number): void {
    // Never offer more servers than the payload actually contains (the API's
    // server_count may exceed data.server.length); before data arrives the
    // dropdown keeps its configured maximum.
    const available = this.player._vidixServers?.length ?? 0;
    const upper =
      available > 0 ? Math.min(available, SERVER_COUNT.dropdownMax) : SERVER_COUNT.dropdownMax;
    const next = Math.min(Math.max(count || 0, 1), upper);
    if (next === this.totalServers) return;
    this.totalServers = next;
    this.createDropdownItems();
    this.select(this.currentValue);
  }

  private createDropdownItems(): void {
    const locale = this.player._vidixLocale || "en";
    let itemsHtml = "";
    for (let i = 1; i <= this.totalServers; i++) {
      const val = SERVER_VALUE(i);
      const isActive = val === this.currentValue;
      itemsHtml += `
        <div class="vidix-select-item ${isActive ? "is-active" : ""}" role="option" data-value="${val}" aria-selected="${isActive}">
          <span class="vidix-select-item-text">${translate(locale, "server", { n: i })}</span>
          <svg class="vidix-select-check" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      `;
    }
    this.scrollEl.innerHTML = trustedHTML(itemsHtml);
  }

  private createDropdown(): void {
    this.dropdown = document.createElement("div");
    this.dropdown.className = "vidix-select-content";

    // The scroll area is separate from the shell (background/border stay solid
    // while content fades). This is the listbox itself: it holds the options and
    // can receive keyboard focus for arrow scrolling.
    this.scrollEl = document.createElement("div");
    this.scrollEl.className = "vidix-select-scroll";
    this.scrollEl.setAttribute("role", "listbox");
    const locale = this.player._vidixLocale || "en";
    this.scrollEl.setAttribute("aria-label", translate(locale, "serverList"));
    this.scrollEl.tabIndex = -1; // focused only while the popover is open
    this.dropdown.appendChild(this.scrollEl);
    this.createDropdownItems();

    const button = this.button;
    if (!button) return;
    const parent = button.parentElement;
    const wrapper = document.createElement("div");
    wrapper.className = "vidix-select-wrapper";
    parent?.insertBefore(wrapper, button);
    wrapper.appendChild(button);
    wrapper.appendChild(this.dropdown);
  }

  private bindEvents(): void {
    if (!this.button) return;

    this.button.setAttribute("aria-haspopup", "listbox");
    this.button.setAttribute("aria-expanded", "false");

    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });

    this.button.addEventListener("keydown", (e) => {
      // Open on Enter/Space and arrows, like a native select.
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        this.open();
        // Move focus to the listbox so keyboard users can scroll immediately.
        requestAnimationFrame(() => this.scrollEl.focus());
      }
    });

    this.dropdown.addEventListener("click", (e) => {
      // e.target is in the shadow tree; composedPath() gives the real node.
      const path = e.composedPath();
      const item = path.find(
        (node): node is HTMLElement =>
          (node as HTMLElement)?.classList?.contains("vidix-select-item") === true,
      );
      if (!item) return;
      this.select(item.dataset.value || "");
      this.close();
    });

    // Outside clicks close the popover. Events crossing a shadow boundary are
    // retargeted to the host, so match with composedPath(). Document/window
    // listeners are attached/detached as a group so the element lifecycle can
    // release them (see attachGlobalListeners/detachGlobalListeners).
    this.attachGlobalListeners();

    // Fade masks update dynamically as the listbox scrolls.
    this.scrollEl.addEventListener(
      "scroll",
      () => {
        if (this.isOpen) this.updateScrollFade();
      },
      { passive: true },
    );
  }

  private readonly onDocumentClick = (e: MouseEvent): void => {
    const path = e.composedPath();
    if (this.button && !path.includes(this.button) && !path.includes(this.dropdown)) {
      this.close();
    }
  };

  private readonly onDocumentKeydown = (e: KeyboardEvent): void => {
    if (e.key === "Escape" && this.isOpen) {
      this.close();
    }
  };

  private readonly onWindowResize = (): void => {
    if (this.isOpen) this.updatePosition();
  };

  private readonly onWindowScroll = (): void => {
    if (this.isOpen) this.updatePosition();
  };

  private globalBound = false;

  /** Adds the document/window listeners (idempotent). */
  attachGlobalListeners(): void {
    if (this.globalBound || !this.button) return;
    this.globalBound = true;
    document.addEventListener("click", this.onDocumentClick);
    document.addEventListener("keydown", this.onDocumentKeydown);
    window.addEventListener("resize", this.onWindowResize);
    window.addEventListener("scroll", this.onWindowScroll, { passive: true });
  }

  /** Removes the document/window listeners (idempotent). */
  detachGlobalListeners(): void {
    if (!this.globalBound) return;
    this.globalBound = false;
    document.removeEventListener("click", this.onDocumentClick);
    document.removeEventListener("keydown", this.onDocumentKeydown);
    window.removeEventListener("resize", this.onWindowResize);
    window.removeEventListener("scroll", this.onWindowScroll);
  }

  /** Places the popover above or below the trigger, whichever has more room. */
  updatePosition(): void {
    if (!this.button) return;
    const btnRect = this.button.getBoundingClientRect();
    const margin = 24;
    const spaceAbove = btnRect.top - margin;
    const spaceBelow = window.innerHeight - btnRect.bottom - margin;
    const maxAllowed = 260; // ideal popover height

    if (spaceAbove >= 140 || spaceAbove > spaceBelow) {
      this.dropdown.setAttribute("data-side", "top");
      const maxHeight = Math.min(maxAllowed, Math.max(100, spaceAbove));
      this.scrollEl.style.maxHeight = `${maxHeight}px`;
    } else {
      this.dropdown.setAttribute("data-side", "bottom");
      const maxHeight = Math.min(maxAllowed, Math.max(100, spaceBelow));
      this.scrollEl.style.maxHeight = `${maxHeight}px`;
    }

    this.updateScrollFade();
  }

  /** Applies the fade mask only on the side that still has hidden content. */
  private updateScrollFade(): void {
    const el = this.scrollEl;
    const threshold = 2;
    const hideTop = el.scrollTop > threshold;
    const hideBottom = el.scrollTop + el.clientHeight < el.scrollHeight - threshold;

    this.dropdown.classList.toggle("fade-top", hideTop);
    this.dropdown.classList.toggle("fade-bottom", hideBottom);
  }

  toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  open(): void {
    this.isOpen = true;
    this.button?.classList.add("is-open");
    this.button?.setAttribute("aria-expanded", "true");
    this.dropdown.classList.add("is-open");
    // The scroll region joins the tab order only while open.
    this.scrollEl.tabIndex = 0;
    // Position after is-open so overflow measurement is accurate.
    this.updatePosition();
  }

  close(): void {
    this.isOpen = false;
    this.button?.classList.remove("is-open");
    this.button?.setAttribute("aria-expanded", "false");
    this.dropdown.classList.remove("is-open");
    this.dropdown.classList.remove("fade-top", "fade-bottom");
    // Leave the tab order while hidden.
    this.scrollEl.tabIndex = -1;
  }

  /** Records the selection, updates the label, and notifies the player. */
  select(val: string): void {
    this.currentValue = val;
    if (this.spanText) {
      const locale = this.player._vidixLocale || "en";
      const match = /Server (\d+)/.exec(val);
      this.spanText.textContent = match
        ? translate(locale, "server", { n: Number.parseInt(match[1], 10) })
        : val;
    }

    const items = this.dropdown.querySelectorAll<HTMLElement>(".vidix-select-item");
    for (const item of items) {
      const active = item.dataset.value === val;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    }

    // Switching server rebuilds the iframe/download URLs.
    this.player.dispatchEvent(new CustomEvent("vidix:server-select", { detail: { value: val } }));
  }
}
