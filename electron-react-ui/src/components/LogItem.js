import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Moment from "react-moment";

import { GlobalContext } from "../context/GlobalState";

const LogItem = ({ log }) => {
  const { deleteLog } = useContext(GlobalContext);
  const setVarient = () => {
    if (log.priority === "high") {
      return "danger";
    } else if (log.priority === "moderate") {
      return "warning";
    } else {
      return "success";
    }
  };
  return (
    <tr>
      <td>
        <Badge className={"text-light bg-" + setVarient()}>
          {log.priority.charAt(0).toUpperCase() + log.priority.slice(1)}
        </Badge>
      </td>
      <td>{log.text}</td>
      <td>{log.user}</td>
      <td>
        <Moment format='MM Do YYYY, h:mm:ss a'>{new Date(log.created)}</Moment>
      </td>
      <td>
        <Button onClick={() => deleteLog(log.id)} variant='danger' size='sm'>
          x
        </Button>
      </td>
    </tr>
  );
};

export default LogItem;
