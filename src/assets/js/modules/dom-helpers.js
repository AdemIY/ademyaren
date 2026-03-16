export function query(selector, scope = document) {
  return scope.querySelector(selector);
}

export function queryAll(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

export function setHTML(selector, markup, scope = document) {
  const element = typeof selector === "string" ? query(selector, scope) : selector;

  if (!element) {
    return null;
  }

  element.innerHTML = markup;
  return element;
}
