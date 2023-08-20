import {elementTools} from "jointjs"

export const ResizeTool = elementTools.Control.extend({
  children: [
    {
      tagName: "image",
      selector: "handle",
      attributes: {
        cursor: "pointer",
        width: 20,
        height: 20,
        "xlink:href":
          "https://cdn.iconscout.com/icon/premium/png-512-thumb/resize-2693123-2234806.png?f=avif&w=256"
      }
    },
    {
      tagName: "rect",
      selector: "extras",
      attributes: {
        "pointer-events": "none",
        fill: "none",
        stroke: "#33334F",
        "stroke-dasharray": "2,4",
        rx: 5,
        ry: 5
      }
    }
  ],
  getPosition: function (view) {
    const model = view.model;
    const { width, height } = model.size();
    return { x: width, y: height };
  },
  setPosition: function (view, coordinates) {
    const model = view.model;
    model.resize(
      Math.max(coordinates.x - 10, 1),
      Math.max(coordinates.y - 10, 1)
    );
  }
});
