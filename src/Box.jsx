import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import {forwardRef} from "react";
const style = {
    backgroundColor: 'white',
    cursor: 'move',
    float: 'left',
    width: "100%"
};
const Box = ({ index, element, itemDims, setItemDims }, ref) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: (monitor) => ({ index }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                alert(`You dropped ${item.index} into ${dropResult.name}!`);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    const opacity = isDragging ? 0 : 1;
    return (<div ref={drag} style={{ ...style, opacity }} >
        <div ref={ref}>{element}</div>
		</div>);
};

export default forwardRef(Box)
