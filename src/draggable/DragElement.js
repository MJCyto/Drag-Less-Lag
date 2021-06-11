import {forwardRef, useRef} from "react";
import {Dustbin} from "../Dustbin";
import Box from "../Box";
import {useDrag, useDrop} from "react-dnd";
import {DropLine} from "./DropLine";
import styled from "styled-components";
import {ItemTypes} from "../ItemTypes";


const DropLineWrapper = styled.div`
    //float: left;
    display: flex;
`;

const style = {
  height: 100,
  width: '100%',
  // marginRight: '1.5rem',
  // marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  // float: 'left',
};

const DragElement = (props, sampleRef) => {
  const {index, itemSpacing, listItem, listID} = props;
  const itemRef = useRef(null)

  console.log(listID)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: listID,
    item: (monitor) => ({ index }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.index} into ${dropResult.index}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ canDrop, isOver, position }, drop] = useDrop(() => ({
    accept: listID,
    drop: () => ({ name: 'Dustbin', index }),
    collect: (monitor) => {
      const isOver= monitor.isOver();
      const canDrop= monitor.canDrop()
      let position;
      if (canDrop && isOver){
        // console.log("in the thing")
              // monitor.getItem().hoveringIndex = index;
              if (monitor.getItem().index === index){
                position = 1
              }
              else {
                // Determine rectangle on screen
                const hoverBoundingRect = itemRef.current?.getBoundingClientRect();
                // Get vertical middle
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                // Determine mouse position
                const clientOffset = monitor.getClientOffset();
                // Get pixels to the top
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;

                if (hoverClientY < hoverMiddleY){
                  position = 0
                }
                else{
                  position = 2

                }
              }

            }

      return {
        position,
      canDrop, isOver,
    }},
  }));
  // console.log(isOver)
  // const opacity = isDragging ? 0 : 1;

  console.log(position)

  // drag(drop(itemRef));
  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  }
  else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return (
      <div ref={itemRef}>
        {/*<div ref={drop} role={'Dustbin'} style={{ ...style, backgroundColor }}>*/}
        {/*  {isActive ? 'Release to drop' : 'Drag a box here'}*/}
        {/*</div>*/}
      <div  style={{margin: -itemSpacing /2 + "px 0"}} ref={drop} role={'Dustbin'}>
        {/*<Dustbin index={index + 0.1} itemSpacing={itemSpacing} />*/}
        <DropLineWrapper style={{ backgroundColor: "red", height: itemSpacing, width: "100%",
          opacity: position === 0 ? 1: 0,
          // opacity: canDrop && isOver? 1: 0,
          paddingBottom: 10,
        }}>
          <DropLine/>
        </DropLineWrapper>
        <div ref={drag} style={{position: "relative"}}>
          <div style={{position: "absolute", height: "100%", width: "100%", top: "50%", opacity: position === 1? 1:0}}>
            <DropLine />
          </div>
          <Box element={listItem} index={index}  ref={index === 0? sampleRef : null} listID={listID}/>

        </div>

        <DropLineWrapper style={{ backgroundColor: "red", height: itemSpacing, width: "100%",
          // opacity: canDrop && isOver? 1: 0,
          paddingTop: 10,
          opacity: position === 2? 1: 0
        }}>
          <DropLine/>
        </DropLineWrapper>
        {/*<Dustbin index={index + 0.2} itemSpacing={itemSpacing}/>*/}
      </div>
      </div>
  )
}

export default forwardRef(DragElement)