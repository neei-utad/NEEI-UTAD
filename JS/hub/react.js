const { React, ReactDOM, htm } = window;

export const { Fragment, useEffect, useMemo, useState } = React;
export const html = htm.bind(React.createElement);

export function mount(elementId, Component) {
  const container = document.getElementById(elementId);
  if (container) ReactDOM.createRoot(container).render(html`<${Component} />`);
}
