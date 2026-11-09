import { useEffect, useState } from "./react.js";

// separador ativo refletido no hash
export function useHashTab(defaultTab, hashedTab) {
  const [tab, setTab] = useState(() => (location.hash === `#${hashedTab}` ? hashedTab : defaultTab));

  useEffect(() => {
    const url = tab === hashedTab ? `#${hashedTab}` : location.pathname + location.search;
    history.replaceState(null, "", url);
  }, [tab, hashedTab]);

  return [tab, setTab];
}
