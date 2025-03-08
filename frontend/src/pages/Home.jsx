import React from "react";

import Title from "../components/Title";
import TodoList from "../components/TodoList";
import ChoicesProvider from "../contexts/choicesContext";

function Home() {
  return (
    <>
      <Title />
      <ChoicesProvider>
        <TodoList />
      </ChoicesProvider>
    </>
  );
}

export default Home;
