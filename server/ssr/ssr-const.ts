import {readFileSync} from "node:fs";

export const contentStringBegin = '<div class="js-app-wrapper">';
export const contentStringEnd = "</div>";
export const contentStringFull = contentStringBegin + contentStringEnd;

export const indexHtml: string = readFileSync("./dist/index.html", "utf8");
