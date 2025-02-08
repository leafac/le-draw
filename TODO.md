# TODO

- Smooth
- Window show/hide
- Clear
- Menubar
- Multiple monitors


```
path.points = [
  { x: 500, y: 500 },
  { x: 600, y: 400 },
  { x: 700, y: 600 },
  { x: 800, y: 300 },
  { x: 900, y: 300 },
];

document.querySelector("svg").insertAdjacentHTML("beforeend", html\`
  <circle fill="red" cx="\${String(point3.x)}" cy="\${String(point3.y)}" r="4"/>
  <line stroke="green" x1="\${String(point3.x)}" y1="\${String(point3.y)}" x2="\${String(point3Control.x)}" y2="\${String(point3Control.y)}" />
  <circle fill="green" cx="\${String(point3Control.x)}" cy="\${String(point3Control.y)}" r="2"/>
\`);
```