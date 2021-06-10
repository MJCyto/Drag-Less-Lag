import { usePreview } from 'react-dnd-preview'
import {memo, useCallback, useState} from "react";
import {Dustbin} from "../Dustbin";
import useDimensions from "../useDimensions";
import Box from "../Box";
import { debounce } from "lodash";

const DragPreview = (props) => {

  const {elements, width} = props;

  const {display, item, style} = usePreview()
  if (!display) {
    return null
  }
  return <div class="item-list__item" style={{...style, width: width + "px"}}>{elements[item.index]}</div>
}


const DraggableList = memo(function DraggableList(props) {
  const {children, style, itemSpacing} = props;
  const [itemDims, setItemDims] = useState({})
const [hoveredIndex, setHoveredIndex] = useState()
  const [sampleRef, sampleDims] = useDimensions()


  return (<div>
    <div style={{ clear: 'both', display: "flex", flexDirection: "column", width: "100%", ...style }}>
      {children.map((listItem, index) => (
          <div style={{margin: -itemSpacing/2 + "px 0", width: "100%"}}>
            <Dustbin index={index + 0.1} itemSpacing={itemSpacing} hoveredIndex={hoveredIndex} setHoveredIndex={index => debounce(() => setHoveredIndex(index), 50)}/>
            <Box element={listItem} index={index} itemDims={itemDims} setItemDims={setItemDims} ref={index === 0? sampleRef : null}/>
            <Dustbin index={index + 0.2} itemSpacing={itemSpacing} hoveredIndex={hoveredIndex} setHoveredIndex={index => debounce(() => setHoveredIndex(index), 50)}/>
          </div>
          ))}
    </div>
    <DragPreview elements={children} width={sampleDims.width}/>
  </div>);
});

export default DraggableList