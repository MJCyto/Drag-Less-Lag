import { useCallback, useLayoutEffect, useState } from "react";

function getDimensionObject(node) {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: "x" in rect ? rect.x : rect.top,
    left: "y" in rect ? rect.y : rect.left,
    x: "x" in rect ? rect.x : rect.left,
    y: "y" in rect ? rect.y : rect.top,
    right: rect.right,
    bottom: rect.bottom,
  };
}

const defaultDimsObject = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  x: 0,
  y: 0,
  right: 0,
  bottom: 0,
};

/**
 * Provides a node to give to a rendered element and will provide information once there is an update on the element.
 * Heavily based on https://github.com/Swizec/useDimensions/tree/master/src
 *
 * The dimensions object will contain the width, height, coordinates of the ref along with the position of all four
 * sides of it.
 *
 * Limitations of how react recognises changes in refs means that an adjacent element on the page changing its
 * size/position will not cause the dimensions provided to change. An example of this is the navbar - collapsing or
 * opening the navbar would not cause new dimensions to be given.
 *
 * Dimensions are updated when resizing the window, scrolling or changing the style of the element programmatically.
 */
const useDimensions = () => {
  const [dimensions, setDimensions] = useState(null);
  const [node, setNode] = useState(null);

  const ref = useCallback(node => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() => setDimensions(getDimensionObject(node)));
      measure();

      window.addEventListener("resize", measure);
      window.addEventListener("scroll", measure);

      return () => {
        window.removeEventListener("resize", measure);
        window.removeEventListener("scroll", measure);
      };
    }
  }, [node]);

  return [ref, dimensions || defaultDimsObject, node];
};

export default useDimensions;
