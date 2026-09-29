/**
 * Trusted Types policy.
 *
 * Ported from scaffold-design/vidix-player.js:315-358. Under a CSP with
 * `require-trusted-types-for 'script'`, assigning raw strings to HTML sinks
 * (`innerHTML`, `insertAdjacentHTML`) throws a `TypeError` and the player would
 * fail to render entirely. This policy wraps those assignments.
 *
 * The policy name is {@link TRUSTED_TYPES_POLICY} (`"vidix-player"`): consumers
 * whose CSP sets a `trusted-types` allowlist must include that name, otherwise
 * policy creation throws and the sinks behave as if unwrapped (same as no
 * policy — no silent regression, just the CSP error the site asked for).
 *
 * Without Trusted Types support, `trustedHTML` returns the input unchanged.
 */

import { TRUSTED_TYPES_POLICY } from "../constants.js";

type TrustedHTML = string;
type TrustedScriptURL = string;

type Policy = {
  createHTML: (s: string) => TrustedHTML;
  createScriptURL: (s: string) => TrustedScriptURL;
};

type TrustedTypesGlobal = typeof globalThis & {
  trustedTypes?: {
    createPolicy: (
      name: string,
      rules: {
        createHTML?: (s: string) => string;
        createScriptURL?: (s: string) => string;
      },
    ) => Policy;
  };
};

let policy: Policy | false | null = null;

/** Creates the policy once; `false` means it is unavailable or not allowed. */
function getPolicy(): Policy | false {
  if (policy !== null) return policy;

  const tt = (globalThis as TrustedTypesGlobal).trustedTypes;
  if (typeof window === "undefined" || !tt) {
    policy = false;
    return false;
  }

  try {
    policy = tt.createPolicy(TRUSTED_TYPES_POLICY, {
      createHTML: (s) => s,
      createScriptURL: (s) => s,
    });
  } catch {
    // CSP allowlist does not include our policy name.
    policy = false;
  }
  return policy;
}

/** Wraps a markup string for assignment to an HTML sink. */
export function trustedHTML(html: string): TrustedHTML {
  const p = getPolicy();
  return p ? p.createHTML(html) : html;
}

/** Wraps a URL string for assignment to a script `src` sink. */
export function trustedScriptURL(url: string): TrustedScriptURL {
  const p = getPolicy();
  return p ? p.createScriptURL(url) : url;
}
