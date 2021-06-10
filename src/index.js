
	import { render } from 'react-dom'
	import Example from './example'
	import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'
	import { TouchBackend } from 'react-dnd-touch-backend'
	import styled from "styled-components"

	import { usePreview } from 'react-dnd-preview'
	import DraggableList from "./draggable/DraggableList";
	import {useState} from "react";
	//
	// const MyPreview = () => {
	// 	const {display, itemType, item, style} = usePreview()
	// 	if (!display) {
	// 		return null
	// 	}
	// 	return <div class="item-list__item" style={style}>{item.element}</div>
	// }

	const Item = styled.div`
		height: 50px;
		width: 100%;
		background-color: green;
	`;

	function App() {

		const [list, setList] = useState(["Hello", "Dingus", "Yes", "No", "Goodbye"])
		return (
			<div className="App">
				<DndProvider backend={TouchBackend} options={{enableMouseEvents: true}}>
					<DraggableList itemSpacing={10}>
						{list.map((listItem, index) => <Item>{listItem}</Item>)}
					</DraggableList>
				</DndProvider>
			</div>
		)
	}

	const rootElement = document.getElementById('root')
	render(<App />, rootElement)
