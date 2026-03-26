/**
 * Renders TipTap ProseMirror JSON to clean HTML.
 *
 * Produces HTML identical to what Astro's Markdown pipeline generates,
 * so prose styling applies uniformly across news and events.
 *
 * Supported nodes: paragraph, text, bulletList, orderedList, listItem,
 * blockquote, table, tableRow, tableHeader, tableCell, hardBreak.
 *
 * Supported marks: bold, italic, link.
 */

type TiptapMark = {
  type: string;
  attrs?: Record<string, unknown>;
};

type TiptapNode = {
  type: string;
  content?: TiptapNode[];
  text?: string;
  marks?: TiptapMark[];
  attrs?: Record<string, unknown>;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderChildren(node: TiptapNode): string {
  return (node.content ?? []).map(renderNode).join("");
}

function renderText(node: TiptapNode): string {
  let text = escapeHtml(node.text ?? "");
  for (const mark of node.marks ?? []) {
    switch (mark.type) {
      case "bold":
        text = `<strong>${text}</strong>`;
        break;
      case "italic":
        text = `<em>${text}</em>`;
        break;
      case "link": {
        const href = escapeHtml(String(mark.attrs?.href ?? ""));
        const rel = "noopener noreferrer nofollow";
        text = `<a href="${href}" rel="${rel}">${text}</a>`;
        break;
      }
    }
  }
  return text;
}

function renderListItem(node: TiptapNode): string {
  const children = node.content ?? [];
  // Unwrap single paragraph: <li><p>X</p></li> → <li>X</li>
  if (children.length === 1 && children[0].type === "paragraph") {
    return `<li>${renderChildren(children[0])}</li>`;
  }
  return `<li>${renderChildren(node)}</li>`;
}

function renderBlockquote(node: TiptapNode): string {
  const children = node.content ?? [];
  // Merge paragraphs into one <p> joined by <br> (matches Markdown output)
  const parts = children
    .filter((c) => c.type === "paragraph")
    .map((c) => renderChildren(c))
    .filter(Boolean);

  if (parts.length === 0) return "";
  return `<blockquote><p>${parts.join("<br>")}</p></blockquote>`;
}

function renderTable(node: TiptapNode): string {
  const rows = (node.content ?? []).filter((r) => r.type === "tableRow");
  if (rows.length === 0) return "";

  // First row with tableHeader cells → thead, rest → tbody
  const firstRow = rows[0];
  const hasHeaderCells = (firstRow.content ?? []).some((c) => c.type === "tableHeader");

  if (hasHeaderCells) {
    const thead = `<thead><tr>${(firstRow.content ?? []).map((c) => `<th>${renderCellContent(c)}</th>`).join("")}</tr></thead>`;
    const bodyRows = rows.slice(1);
    const tbody =
      bodyRows.length > 0
        ? `<tbody>${bodyRows.map((r) => `<tr>${(r.content ?? []).map((c) => `<td>${renderCellContent(c)}</td>`).join("")}</tr>`).join("")}</tbody>`
        : "";
    return `<table>${thead}${tbody}</table>`;
  }

  // No header cells — promote first row to thead
  const thead = `<thead><tr>${(firstRow.content ?? []).map((c) => `<th>${renderCellContent(c)}</th>`).join("")}</tr></thead>`;
  const bodyRows = rows.slice(1);
  const tbody =
    bodyRows.length > 0
      ? `<tbody>${bodyRows.map((r) => `<tr>${(r.content ?? []).map((c) => `<td>${renderCellContent(c)}</td>`).join("")}</tr>`).join("")}</tbody>`
      : "";
  return `<table>${thead}${tbody}</table>`;
}

function renderCellContent(cell: TiptapNode): string {
  const children = cell.content ?? [];
  // Unwrap single paragraph inside cell
  if (children.length === 1 && children[0].type === "paragraph") {
    return renderChildren(children[0]);
  }
  return renderChildren(cell);
}

function renderNode(node: TiptapNode): string {
  switch (node.type) {
    case "doc":
      return renderChildren(node);
    case "paragraph": {
      const inner = renderChildren(node);
      return inner ? `<p>${inner}</p>` : "";
    }
    case "text":
      return renderText(node);
    case "bulletList":
      return `<ul>${renderChildren(node)}</ul>`;
    case "orderedList":
      return `<ol>${renderChildren(node)}</ol>`;
    case "listItem":
      return renderListItem(node);
    case "blockquote":
      return renderBlockquote(node);
    case "table":
      return renderTable(node);
    case "tableRow":
      return `<tr>${renderChildren(node)}</tr>`;
    case "tableHeader":
      return `<th>${renderCellContent(node)}</th>`;
    case "tableCell":
      return `<td>${renderCellContent(node)}</td>`;
    case "hardBreak":
      return "<br>";
    default:
      return renderChildren(node);
  }
}

/**
 * Renders a TipTap ProseMirror JSON string to clean HTML.
 * Returns empty string for null/empty/invalid input.
 */
export function renderTiptapJson(json: string | undefined | null): string {
  if (!json) return "";

  try {
    const doc = JSON.parse(json) as TiptapNode;
    return renderNode(doc);
  } catch {
    return "";
  }
}
