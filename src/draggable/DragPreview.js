import { usePreview } from "react-dnd-preview";

const DragPreview = props => {
  const { display, item, style } = usePreview();
  if (!display) {
    return null;
  }
  const newStyle = {
    ...style,
  };
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
};

export default DragPreview;
