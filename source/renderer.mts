import fs from "node:fs/promises";
import path from "node:path";
import html from "@radically-straightforward/html";
import css from "@radically-straightforward/css";
import javascript from "@radically-straightforward/javascript";
import * as caddy from "@radically-straightforward/caddy";

css`
  @import "@radically-straightforward/javascript/static/index.css";
`;

javascript`
  import * as javascript from "@radically-straightforward/javascript/static/index.mjs";
  import html from "@radically-straightforward/html";
`;

await fs.writeFile(
  path.join(import.meta.dirname, "./static/index.html"),
  html`
    <!doctype html>
    <html
      css="${css`
        color-scheme: light dark;
      `}"
    >
      <head>
        <link rel="stylesheet" href="./${caddy.staticFiles["index.css"]}" />
        <script src="./${caddy.staticFiles["index.mjs"]}"></script>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>Lê-draw</title>
      </head>
      <body
        css="${css`
          position: fixed;
          inset: var(--size--0);
        `}"
      >
        <svg
          css="${css`
            width: 100%;
            height: 100%;
          `}"
          javascript="${javascript`
            this.onmousedown = (event) => {
              if (event.button === 0) {
                this.insertAdjacentHTML("beforeend", html\`<path stroke="red" stroke-width="2" fill="transparent" d="M \${String(event.clientX)},\${String(event.clientY)}" />\`);
                const path = this.lastElementChild;
                this.onmousemove = (event) => {
                  path.setAttribute("d", path.getAttribute("d") + \` L \${String(event.clientX)},\${String(event.clientY)}\`);
                };
                this.onmouseup = () => {
                  this.onmousemove = undefined;
                  this.onmouseup = undefined;
                };
              }
            };
          `}"
        ></svg>
      </body>
    </html>
  `,
);
