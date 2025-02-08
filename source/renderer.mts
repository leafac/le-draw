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
            cursor: crosshair;
          `}"
          javascript="${javascript`
            this.color = "var(--color--black)";
            this.onmousedown = (event) => {
              if (event.button === 0) {
                this.insertAdjacentHTML("beforeend", html\`<path stroke="\${this.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" fill="transparent" />\`);
                const path = this.lastElementChild;
                path.points = [];
                this.onmousemove = (event) => {
                  const previousPoint = path.points.at(-1);
                  if (previousPoint !== undefined && Math.sqrt((event.clientX - previousPoint.x) ** 2 + (event.clientY - previousPoint.y) ** 2) < 3) return;
                  path.points.push({ x: event.clientX, y: event.clientY });
                  path.setAttribute(
                    "d",
                    \`M \${path.points[0].x},\${path.points[0].y} S \${[...path.points.keys()].map((pointsIndex) => {
                      const previousPoint = path.points[pointsIndex - 1];
                      const point = path.points[pointsIndex];
                      const nextPoint = path.points[pointsIndex + 1] ?? path.points[pointsIndex];
                      const smooth = 0.1;
                      const pointControl = previousPoint === undefined ? point : { x: point.x - (nextPoint.x - previousPoint.x) * smooth, y: point.y - (nextPoint.y - previousPoint.y) * smooth };
                      return \`\${pointControl.x},\${pointControl.y} \${point.x},\${point.y}\`;
                    }).join(" ")}\`
                  );
                };
                this.onmouseup = () => {
                  this.onmousemove = undefined;
                  this.onmouseup = undefined;
                };
                this.onmousemove(event);
              }
              else if (event.button === 2) {
                this.onmousemove = (event) => {
                  paths: for (const path of this.children)
                    for (const point of path.points)
                      if (Math.sqrt((event.clientX - point.x) ** 2 + (event.clientY - point.y) ** 2) < 10) {
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
              else if (event.key === " ") this.innerHTML = html\`\`;
            };
          `}"
        ></svg>
      </body>
    </html>
  `,
);
