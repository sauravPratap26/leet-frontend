import React from "react";
import CreateProblemForm from "../component/CreateProblemForm";
import BackWrapper from "../utility/Back";

const AddProblem = () => {
  return (
    <BackWrapper to="/" label="Back to Home">
      <CreateProblemForm />
    </BackWrapper>
  );
};

export default AddProblem;
