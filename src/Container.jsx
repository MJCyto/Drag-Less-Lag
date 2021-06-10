import { memo } from 'react';
import { Dustbin } from './Dustbin';
import Box from "./Box";
export const Container = memo(function Container() {
    return (<div>
			<div style={{ overflow: 'hidden', clear: 'both' }}>
				<Dustbin />
			</div>
			<div style={{ overflow: 'hidden', clear: 'both' }}>
				<Box index="0"/>
				<Box index="1"/>
				<Box index="2"/>
			</div>
		</div>);
});
