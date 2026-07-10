const ENTITIES = {
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&nbsp;": " ",
};

export function htmlToText(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;|&quot;|&#39;|&apos;|&lt;|&gt;|&nbsp;/g, (m) => ENTITIES[m])
    .trim();
}
