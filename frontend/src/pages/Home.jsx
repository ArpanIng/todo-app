import React from "react";

import Title from "../components/Title";
import TaskList from "../components/TaskList";
import ChoicesProvider from "../contexts/choicesContext";

function Home() {
  return (
    <>
      <Title />
      <ChoicesProvider>
        <TaskList />
      </ChoicesProvider>
    </>
  );
}

export default Home;
