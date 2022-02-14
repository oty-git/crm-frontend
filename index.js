import React from "react";
import { useParams } from "react-router";
import Table from "./blocks/Table";

const Index = () => {
  let { type } = useParams();
  const getFormConfig = () => {
    try {
      return require("./formConfig").default;
    } catch (e) {
      console.log("e", e);
      /**
       * no form config
       */
      return false;
    }
  };

  return <Table type={type} formConfig={getFormConfig()} />;
};

export default Index;
