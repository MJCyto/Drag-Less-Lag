import { usePreview } from "react-dnd-preview";

const DragPreview = props => {
  // const { elements, width, itemSpacing, listID } = props;

  const { display, item, style } = usePreview();
  if (!display) {
    return null;
  }
  // console.log(item);
  // transform: "translate(332.6875px, -2px)"

  // const thing = style.transform.replace("translate(", "").replace(")", "").replaceAll("px", "");
  // const coordinates = thing.split(",");
  // // const coordinates = style.transform.split("(")[1].split[","]
  // // coordinates[0] = parseFloat(coordinates[0].replace("px", "")) + itemSpacing
  // // coordinates[1] = parseFloat(coordinates[1].split("px")[0])
  //
  // const newTransform =
  //     "translate(" + parseFloat(coordinates[0]) + itemSpacing + "px, " + coordinates[1] + "px)";

  const newStyle = {
    ...style,
    // transform: newTransform,
  };
  //display: "flex", alignContent: "center"
  // if (item.listID === listID) {
  // if (item.listID !== listID) {
  //   return null;
  // }
  return (
    <div
      className="item-list__item"
      style={{
        ...newStyle,
        width: item.width + "px",
        zIndex: 3,
      }}
    >
      {item.element}
    </div>
  );
  // }
  // return null;
};

export default DragPreview;
