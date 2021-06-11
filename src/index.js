import { render } from "react-dom";
import Example from "./example";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import styled from "styled-components";

import { usePreview } from "react-dnd-preview";
import DraggableList from "./draggable/DraggableList";
import { useLayoutEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ItemTypes } from "./ItemTypes";

import faker from "faker";
import DragPreview from "./draggable/DragPreview";

const Modes = Object.freeze({
  SMALL_LIST: "small",
  STRESS_TEST: "stress",
  REPORTS: "reports",
  HAZARD: "hazard",
});

const Item = styled.div`
  height: 50px;
  width: 100%;
  background-color: green;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 30%;
  column-gap: 10px;
`;

function App() {
  const [smallList, setSmallList] = useState(["hello", "goodbye", "yes", "no", "dingus", "dongus"]);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);

  const [mode, setMode] = useState("small");

  const makeList = () => {
    const list = [];

    for (let i = 0; i < 20; i++) {
      list.push(faker.animal.dog());
    }

    return list;
  };

  useLayoutEffect(() => {
    setList1(makeList());
    setList2(makeList());
    setList3(makeList());
  }, []);
  return (
    <div className="App">
      <div onClick={() => setMode(Modes.SMALL_LIST)}>Small List</div>
      <div onClick={() => setMode(Modes.STRESS_TEST)}>Stress Test</div>
      <div onClick={() => setMode(Modes.REPORTS)}>Reports</div>
      <div onClick={() => setMode(Modes.HAZARD)}>Hazard Ratings</div>
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <DragPreview />

        <Wrapper>
          {mode === Modes.SMALL_LIST && (
            <>
              <DraggableList itemSpacing={10} listID={ItemTypes.BOX}>
                {smallList.map((listItem, index) => (
                  <Item>{listItem}</Item>
                ))}
              </DraggableList>
              <DraggableList itemSpacing={10} listID={ItemTypes.TWO}>
                {smallList.map((listItem, index) => (
                  <Item>{listItem}</Item>
                ))}
              </DraggableList>
              <DraggableList itemSpacing={10} listID={ItemTypes.THREE}>
                {smallList.map((listItem, index) => (
                  <Item>{listItem}</Item>
                ))}
              </DraggableList>
            </>
          )}
          {mode === Modes.STRESS_TEST && (
            <>
              <DraggableList itemSpacing={10} listID={ItemTypes.BOX}>
                {list1.map((listItem, index) => (
                  <Item>{listItem}</Item>
                ))}
              </DraggableList>
              <DraggableList itemSpacing={10} listID={ItemTypes.TWO}>
                {list2.map((listItem, index) => (
                  <Item>{listItem}</Item>
                ))}
              </DraggableList>
              <DraggableList itemSpacing={10} listID={ItemTypes.THREE}>
                {list3.map((listItem, index) => (
                  <Item>{listItem}</Item>
                ))}
              </DraggableList>
            </>
          )}
        </Wrapper>
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
