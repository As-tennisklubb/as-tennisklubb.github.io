/**
 * Normalizes TipTap-generated HTML for clean presentation on the website.
 *
 * TipTap outputs table HTML with noise that doesn't match the site's
 * .data-table structure. This function:
 *
 * 1. Strips <colgroup> elements
 * 2. Removes inline style attributes from table elements
 * 3. Removes default colspan="1" / rowspan="1"
 * 4. Unwraps <p> tags nested inside table cells
 * 5. Promotes the first <tbody> row to <thead> with <th> cells
 * 6. Removes empty <p></p> tags
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
  //    TipTap never outputs <thead>; the first row is the header when
  //    withHeaderRow is enabled, but it's still inside <tbody> as <td> or <th>.
  s = s.replace(
    /<table([^>]*)>\s*<tbody>\s*(<tr>[\s\S]*?<\/tr>)/gi,
    (_match, tableAttrs: string, firstRow: string) => {
      const headerRow = firstRow.replace(/<td(\b[^>]*)>/gi, "<th$1>").replace(/<\/td>/gi, "</th>");
      return `<table${tableAttrs}><thead>${headerRow}</thead><tbody>`;
    },
  );

  // 6. Remove empty <p></p>
  s = s.replace(/<p>\s*<\/p>/g, "");

  return s;
}
