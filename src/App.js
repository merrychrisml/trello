import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import GlobalStyle from "./GlobalStyle";

const Wrapper = styled.div`
  display: flex;
  max-width: 840px;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        // boardCopy.splice(destination?.index, 0, draggableId);
        boardCopy.splice(destination?.index, 0, taskObj);
        // draggableId 가 toDo 이므로 추가해주면 됨
        // [source.droppableId] => 변수로 사용가능
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        // destinationBoard.splice(destination?.index, 0, draggableId);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  /* 드래그가 끝났을때 실행되는 함수. args 로 많은 것을 알려준다. 가령
  목적지의 droppableId 혹은 index를 알려주거나, 우리가 드래그하는 것의 draggable
  Id를 알려준다. source의 경우 드래그하고있는 것의 인덱스를 반환할 수 있다.*/
  /* draggable 의 Key 와 draggable Id는 같아야 함! 보통 리액트에서는
  index나 id로 key를 주지만 beautiful dnd 쓸때는 위와 같아야 하므로 
  아래에서 key를 {toDo}로 준 것을 알 수 있음.*/
  /* */
  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
