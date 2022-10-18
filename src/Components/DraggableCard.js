import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import React from "react";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "2px 0px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;

function DraggableCard({ toDoId, toDoText, index }) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);

/*react memo를 사용할 경우 prop을 바꾼 item만 렌더링하게 해준다. */
