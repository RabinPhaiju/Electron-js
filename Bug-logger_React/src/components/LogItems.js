import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import LogItem from "./LogItem";

import { GlobalContext } from "../context/GlobalState";

const LogItems = () => {
  const { logs } = useContext(GlobalContext);
  return (
    <Table>
      <thead>
        <tr>
          <th>Priority</th>
          <th>Log Text</th>
          <th>User</th>
          <th>Created</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <LogItem key={log.id} log={log} />
        ))}
      </tbody>
    </Table>
  );
};

export default LogItems;
