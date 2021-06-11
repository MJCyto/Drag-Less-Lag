import {useDragDropManager, useDrop} from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import {DropLine} from "./draggable/DropLine";
import styled from "styled-components";
import {useMemo} from "react";
const Wrapper = styled.div`
    float: left;
    display: flex;
`;
const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};
export const Dustbin = (props) => {
    const {itemSpacing, index, hoveredIndex} = props;
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => {
            const isOver = monitor.isOver();
            const canDrop = monitor.canDrop();
            if (canDrop && isOver){
                // monitor.getItem().hoveringIndex = index;
            }
            return {
                isOver,
                canDrop,
            }
        },
    }));

    const item = useDragDropManager().getMonitor().getItem()

    const isHovering = useMemo(() => {
        return hoveredIndex === index
    }, [hoveredIndex]);


    // console.log(useDragDropManager().getMonitor())

    const isActive = canDrop && isOver;
    let backgroundColor = '#222';
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }
    return (<Wrapper ref={drop} role={'Dustbin'} style={{ backgroundColor: "red", height: itemSpacing, width: "100%",
        opacity: isHovering? 1: 0
    }}>
        <DropLine/>
			{/*{isActive ? 'Release to drop' : 'Drag a box here'}*/}
		</Wrapper>);
};
