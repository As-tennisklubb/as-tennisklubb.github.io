/**
 * Normalizes TipTap-generated HTML for clean presentation on the website.
 *
 * TipTap outputs HTML with noise that doesn't match Markdown-rendered output.
 * This function aligns TipTap HTML with what Astro's Markdown pipeline produces:
 *
 * 1. Strips <colgroup> elements
 * 2. Removes inline style attributes from table elements
 * 3. Removes default colspan="1" / rowspan="1"
 * 4. Unwraps <p> tags nested inside table cells
 * 5. Promotes the first <tbody> row to <thead> with <th> cells
 * 6. Removes empty <p></p> tags
 * 7. Unwraps <p> tags nested inside list items (TipTap: <li><p>X</p></li> → <li>X</li>)
 * 8. Merges multiple <p> inside <blockquote> into one <p> joined by <br>
 * 9. Strips any heading tags (h1–h6) → replaces with <p><strong>…</strong></p>
 */
export function sanitizeTiptapHtml(html: string): string {
  if (!html) return html;

  let s = html;

  // 1. Remove <colgroup>…</colgroup>
  s = s.replace(/<colgroup>[\s\S]*?<\/colgroup>/gi, "");

  // 2. Remove style="" on table-related elements
  s = s.replace(/(<(?:table|thead|tbody|tr|th|td)\b[^>]*?)\s+style="[^"]*"/gi, "$1");

  // 3. Remove colspan="1" and rowspan="1" (default values = noise)
  s = s.replace(/\s+colspan="1"/gi, "");
  s = s.replace(/\s+rowspan="1"/gi, "");

  // 4. Unwrap <p> inside table cells: <td><p>X</p></td> → <td>X</td>
  s = s.replace(/<(t[dh])([^>]*)><p>([\s\S]*?)<\/p><\/\1>/gi, "<$1$2>$3</$1>");

  // 5. Promote first <tbody> row to <thead> with <th> cells
  s = s.replace(
    /<table([^>]*)>\s*<tbody>\s*(<tr>[\s\S]*?<\/tr>)/gi,
    (_match, tableAttrs: string, firstRow: string) => {
      const headerRow = firstRow.replace(/<td(\b[^>]*)>/gi, "<th$1>").replace(/<\/td>/gi, "</th>");
      return `<table${tableAttrs}><thead>${headerRow}</thead><tbody>`;
    },
  );

  // 6. Remove empty <p></p>
  s = s.replace(/<p>\s*<\/p>/g, "");

  // 7. Unwrap <p> inside list items: <li><p>X</p></li> → <li>X</li>
  s = s.replace(/<li><p>([\s\S]*?)<\/p><\/li>/gi, "<li>$1</li>");

  // 8. Merge <p> tags inside <blockquote> into one <p> joined by <br>
  //    TipTap: <blockquote><p>A</p><p>B</p></blockquote>
  //    Target: <blockquote><p>A<br>B</p></blockquote>
  s = s.replace(/<blockquote>([\s\S]*?)<\/blockquote>/gi, (_match, inner: string) => {
    const parts = inner
      .replace(/<p>\s*<\/p>/gi, "") // drop empty <p>
      .match(/<p>([\s\S]*?)<\/p>/gi);
    if (!parts || parts.length === 0) return `<blockquote>${inner}</blockquote>`;
    const contents = parts
      .map((p) => p.replace(/^<p>([\s\S]*)<\/p>$/i, "$1").trim())
      .filter(Boolean);
    return `<blockquote><p>${contents.join("<br>")}</p></blockquote>`;
  });

  // 9. Convert headings to bold paragraphs
  s = s.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, "<p><strong>$1</strong></p>");

  return s;
}
