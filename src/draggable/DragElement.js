import { forwardRef, useRef } from "react";
import { Dustbin } from "../Dustbin";
import Box from "../Box";
import { useDrag, useDrop } from "react-dnd";
import { DropLine } from "./DropLine";
import styled from "styled-components";

const DropLineWrapper = styled.div`
  display: flex;
`;

// const style = {
//   height: 100,
//   width: "100%",
//   // marginRight: '1.5rem',
//   // marginBottom: '1.5rem',
//   color: "white",
//   padding: "1rem",
//   textAlign: "center",
//   fontSize: "1rem",
//   lineHeight: "normal",
//   // float: 'left',
// };

const DragElement = (props, sampleRef) => {
  const { index, itemSpacing, listItem, listID } = props;
  const itemRef = useRef(null);

  console.log(listID);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: listID,
    item: monitor => ({ index }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.index} into ${dropResult.index}!`);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ canDrop, isOver, position }, drop] = useDrop(() => ({
    accept: listID,
    drop: () => ({ name: "Dustbin", index }),
    collect: monitor => {
      const isOver = monitor.isOver();
      const canDrop = monitor.canDrop();
      let position;

      if (canDrop && isOver) {
        const item = monitor.getItem();
        if (item.index === index) {
          position = 1;
        } else {
          // Determine rectangle on screen
          const hoverBoundingRect = itemRef.current?.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // Determine mouse position
          const clientOffset = monitor.getClientOffset();
          // Get pixels to the top
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;

          if (hoverClientY < hoverMiddleY && index !== item.index + 1) {
            position = 0;
          } else if (index !== item.index - 1) {
            position = 2;
          }
        }
      }

      return {
        position,
        canDrop,
        isOver,
      };
    },
  }));

  return (
    <div ref={itemRef}>
      <div
        ref={drop}
        role={"Dustbin"}
        style={{
          margin: -itemSpacing / 2 + "px 0",
          position: "relative",
          zIndex: isDragging ? 2 : 1,
        }}
      >
        <DropLineWrapper
          style={{
            backgroundColor: "red",
            height: itemSpacing,
            width: "100%",
            opacity: position === 0 ? 1 : 0,
            // opacity: canDrop && isOver? 1: 0,
            paddingBottom: 10,
          }}
        >
          <DropLine />
        </DropLineWrapper>
        <div ref={drag} style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              top: "50%",
              opacity: position === 1 ? 1 : 0,
            }}
          >
            <DropLine />
          </div>
          <Box
            element={listItem}
            index={index}
            ref={index === 0 ? sampleRef : null}
            listID={listID}
          />
        </div>

        <DropLineWrapper
          style={{
            backgroundColor: "red",
            height: itemSpacing,
            width: "100%",
            paddingTop: 10,
            opacity: position === 2 ? 1 : 0,
          }}
        >
          <DropLine />
        </DropLineWrapper>
      </div>
    </div>
  );
};

export default forwardRef(DragElement);
