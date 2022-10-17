import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import React from "react";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

function DraggableCard({ toDo, index }) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);

/*react memo를 사용할 경우 prop을 바꾼 item만 렌더링하게 해준다. */
