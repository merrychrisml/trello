import { atom } from "recoil";

export const toDoState = atom({
  key: "toDo",
  default: {
    "해야 할 업무": [],
    "진행 중인 업무": [],
    "완료한 업무": [],
  },
});
