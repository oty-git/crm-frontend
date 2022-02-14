import TableHeading from "./userTable/TableHeading";
import { capitalizeFirstLetter } from "../../../functions/functions";
import TableCatalog from "./userTable/TableCatalog";
import apiFreelancers from "../../../api/freelancers";
import { useEffect, useState } from "react";
import apiEmployees from "../../../api/employees";
import apiClients from "../../../api/clients";

const Table = ({ type, formConfig, formToJson }) => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    getUsersByType();
  }, [type]);

  let title = capitalizeFirstLetter(type);

  const getApi=()=>{
    let api = false;
    switch (type) {
      case "freelancers":
        api = apiFreelancers;
        break;
      case "employees":
        api = apiEmployees;
        break;
      case "clients":
        api = apiClients;
        break;
    }
    return api;
  };



  const getUsersByType = () => {
    let api =  getApi();

    api
      .getAll()
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="employers-page__wrap">
      <div className="container">
        <TableHeading title={title} />
        <TableCatalog
          users={users}
          title={title}
          type={type}
          api={getApi()}
          formConfig={formConfig}
          formToJson={formToJson}
          getUsersByType={getUsersByType}
        />
      </div>
    </div>
  );
};

export default Table;
