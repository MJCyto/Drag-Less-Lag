import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import {forwardRef} from "react";
const style = {
    backgroundColor: 'white',
    cursor: 'move',
    // float: 'left',
    width: "100%"
};
const Box = ({ index, element, itemDims, setItemDims, listID }, ref) => {
    // const [{ isDragging }, drag] = useDrag(() => ({
    //     type: listID,
    //     item: (monitor) => ({ index }),
    //     end: (item, monitor) => {
    //         const dropResult = monitor.getDropResult();
    //         if (item && dropResult) {
    //             alert(`You dropped ${item.index} into ${dropResult.name}!`);
    //         }
    //     },
    //     collect: (monitor) => ({
    //         isDragging: monitor.isDragging(),
    //     }),
    // }));
    // const opacity = isDragging ? 0 : 1;
    return (<div  style={{ ...style }} >
        <div ref={ref}>{element}</div>
		</div>);
};

export default forwardRef(Box)
