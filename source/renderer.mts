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
            this.color = "var(--color--black)";
            this.onmousedown = (event) => {
              if (event.button === 0) {
                this.insertAdjacentHTML("beforeend", html\`<path stroke="\${this.color}" stroke-width="2" fill="transparent" d="M \${String(event.clientX)},\${String(event.clientY)}" />\`);
                const path = this.lastElementChild;
                this.onmousemove = (event) => {
                  path.setAttribute("d", path.getAttribute("d") + \` L \${String(event.clientX)},\${String(event.clientY)}\`);
                };
                this.onmouseup = () => {
                  this.onmousemove = undefined;
                  this.onmouseup = undefined;
                };
              }
              else if (event.button === 2) {
                this.onmousemove = (event) => {
                  paths: for (const path of this.children)
                    for (const { groups: coordinate } of path.getAttribute("d").matchAll(/(?<x>\\d+),(?<y>\\d+)/g))
                      if (Math.sqrt((event.clientX - Number(coordinate.x)) ** 2 + (event.clientY - Number(coordinate.y)) ** 2) < 10) {
                        path.remove();
                        continue paths;
                      }
                };
                this.onmouseup = () => {
                  this.onmousemove = undefined;
                  this.onmouseup = undefined;
                };
                this.onmousemove(event);
              }
            };
            document.onkeydown = (event) => {
              if (event.key === "1") this.color = "var(--color--black)";
              else if (event.key === "2") this.color = "var(--color--red--500)";
              else if (event.key === "3") this.color = "var(--color--green--500)";
              else if (event.key === "4") this.color = "var(--color--blue--500)";
              else if (event.key === "5") this.color = "var(--color--amber--500)";
              else if (event.key === "6") this.color = "var(--color--fuchsia--500)";
              else if (event.key === "7") this.color = "var(--color--emerald--500)";
              else if (event.key === "8") this.color = "var(--color--indigo--500)";
              else if (event.key === "9") this.color = "var(--color--pink--500)";
              else if (event.key === "0") this.color = "var(--color--white)";
            };
          `}"
        ></svg>
      </body>
    </html>
  `,
);
