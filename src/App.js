import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import DraggableCard from "./Components/DraggableCrad";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      // soruce 에서 인덱스 제거해서 드래그 한걸로 바꾸기
      toDosCopy.splice(source.index, 1);
      toDosCopy.splice(destination?.index, 0, draggableId);
      // draggableId 가 toDo 이므로 추가해주면 됨
      return toDosCopy;
    });
  };
  /* 드래그가 끝났을때 실행되는 함수. args 로 많은 것을 알려준다. 가령
  목적지의 droppableId 혹은 index를 알려주거나, 우리가 드래그하는 것의 draggable
  Id를 알려준다. source의 경우 드래그하고있는 것의 인덱스를 반환할 수 있다.*/
  /* draggable 의 Key 와 draggable Id는 같아야 함! 보통 리액트에서는
  index나 id로 key를 주지만 beautiful dnd 쓸때는 위와 같아야 하므로 
  아래에서 key를 {toDo}로 준 것을 알 수 있음.*/
  /* */
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DraggableCard key={toDo} index={index} toDo={toDo} />
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
