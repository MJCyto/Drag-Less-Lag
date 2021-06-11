import { usePreview } from "react-dnd-preview";
import { memo } from "react";
import useDimensions from "../useDimensions";
import DragElement from "./DragElement";
import { v4 as uuidv4 } from "uuid";

const DraggableList = function DraggableList(props) {
  const { children, style, itemSpacing } = props;
  const [sampleRef, sampleDims] = useDimensions();

  const listID = uuidv4();

  return (
    <div>
      <div
        style={{ clear: "both", display: "flex", flexDirection: "column", width: "100%", ...style }}
      >
        {children.map((listItem, index) => (
          <div style={{ margin: -itemSpacing / 2 + "px 0", width: "100%" }}>
            <DragElement
              index={index}
              itemSpacing={itemSpacing}
              listItem={listItem}
              ref={sampleRef}
              listID={listID}
            />
          </div>
        ))}
      </div>
      {/*<DragPreview*/}
      {/*  elements={children}*/}
      {/*  width={sampleDims.width}*/}
      {/*  itemSpacing={itemSpacing}*/}
      {/*  listID={listID}*/}
      {/*/>*/}
    </div>
  );
};

export default DraggableList;
