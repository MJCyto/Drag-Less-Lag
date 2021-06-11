import { usePreview } from 'react-dnd-preview'
import {memo, useCallback, useState} from "react";
import {Dustbin} from "../Dustbin";
import useDimensions from "../useDimensions";
import Box from "../Box";
import { debounce } from "lodash";
import DragElement from "./DragElement";
import { v4 as uuidv4 } from "uuid";

const DragPreview = (props) => {

  const {elements, width, itemSpacing} = props;

  const {display, item, style} = usePreview()
  if (!display) {
    return null
  }
  // console.log(style)
  // transform: "translate(332.6875px, -2px)"

  const thing = style.transform.replace("translate(", "").replace(")", "").replaceAll("px", "")
  const coordinates = thing.split(",")
  // const coordinates = style.transform.split("(")[1].split[","]
  // coordinates[0] = parseFloat(coordinates[0].replace("px", "")) + itemSpacing
  // coordinates[1] = parseFloat(coordinates[1].split("px")[0])

  const newTransform = "translate(" + parseFloat(coordinates[0]) + itemSpacing + "px, " + coordinates[1] + "px)"

  const newStyle = {
    ...style,
    transform: newTransform
  }
  //display: "flex", alignContent: "center"
  return (<div class="item-list__item" style={{...newStyle, width: width + "px", }}>
    <div style={{transform: `translateY(${itemSpacing}px)`, width: "100%"}}>
    {elements[item.index]}
    </div>
  </div>)
}


const DraggableList = memo(function DraggableList(props) {
  const {children, style, itemSpacing, listID} = props;
  const [sampleRef, sampleDims] = useDimensions()


  return (<div>
    <div style={{ clear: 'both', display: "flex", flexDirection: "column", width: "100%", ...style }}>
      {children.map((listItem, index) => (
          <div style={{margin: -itemSpacing/2 + "px 0", width: "100%"}}>
            <DragElement index={index} itemSpacing={itemSpacing} listItem={listItem} ref={sampleRef} listID={listID}/>
          </div>
          ))}
    </div>
    <DragPreview elements={children} width={sampleDims.width} itemSpacing={itemSpacing}/>
  </div>);
});

export default DraggableList