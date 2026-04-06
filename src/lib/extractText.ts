export function extractTextFromBody(body: any[]): string {
  if (!body) return "";

  return body
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child: any) => child.text).join("");
    })
    .join(" ");
}