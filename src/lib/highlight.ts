import { createHighlighter, type ThemeRegistration } from "shiki";

const usm4Theme: ThemeRegistration = {
  name: "usm4",
  type: "dark",
  colors: { "editor.background": "#00000000", "editor.foreground": "#d4d4da" },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#5c5c68", fontStyle: "italic" } },
    { scope: ["keyword", "storage", "storage.type", "storage.modifier", "keyword.operator.new"], settings: { foreground: "#c6ff3d" } },
    { scope: ["string", "string.quoted", "punctuation.definition.string"], settings: { foreground: "#9fd3ff" } },
    { scope: ["constant.numeric", "constant.language"], settings: { foreground: "#ffb86b" } },
    { scope: ["entity.name.function", "support.function", "meta.function-call"], settings: { foreground: "#ffffff" } },
    { scope: ["entity.name.type", "entity.name.class", "support.class", "entity.other.inherited-class", "support.type"], settings: { foreground: "#7ee0c4" } },
    { scope: ["meta.decorator", "punctuation.decorator", "entity.name.function.decorator"], settings: { foreground: "#e9ffad" } },
    { scope: ["variable.other.php", "variable.parameter", "punctuation.definition.variable"], settings: { foreground: "#f2c6ff" } },
    { scope: ["entity.name.tag.yaml", "entity.name.tag"], settings: { foreground: "#c6ff3d" } },
    { scope: ["variable.other.property", "meta.object-literal.key"], settings: { foreground: "#d4d4da" } },
    { scope: ["punctuation", "meta.brace"], settings: { foreground: "#8b8b96" } },
  ],
};

let hl: Awaited<ReturnType<typeof createHighlighter>> | null = null;

export async function highlight(code: string, lang: string) {
  hl ??= await createHighlighter({ themes: [usm4Theme], langs: ["ts", "php", "yaml"] });
  return hl.codeToHtml(code, { lang, theme: "usm4" });
}
