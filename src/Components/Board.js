import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Wrapper = styled.div`
  margin: 10px;
  padding: 10px 20px;
  padding-top: 30px;
  background-image: radial-gradient(circle at 10% 50%, #ffefba 0%, #ffffff 80%);
  border-radius: 5px;
  min-height: 250px;
  width: 360px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 15px;
  font-family: "Stylish";
`;

const Area = styled.div`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#F3F9A7"
      : props.isDraggingFromThis
      ? "#F3F9A7"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid;
    outline: 0;
    font-size: 1rem;
    font-family: "Stylish";
    color: $white;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
  }
`;

function Board({ toDos, boardId }) {
  const { register, setValue, handleSubmit } = useForm();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`${boardId}에 업무 추가하기`}
        ></input>
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
