import * as React from "react"

const MOBILE_BREAKPOINT = 768
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

// Deviates from the version `shadcn add sidebar` generates: that one calls
// setState inside an effect, which this project's React Compiler lint rule
// rejects. useSyncExternalStore is the same subscription without the extra
// render. Re-running `shadcn add` restores the original — reapply this.
function subscribe(onChange) {
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange);
}

export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    // The server has no viewport, so render the desktop sidebar and let the
    // client correct it on hydration — same as the original's initial value.
    () => false
  );
}
