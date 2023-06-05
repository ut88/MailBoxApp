import { useEffect, useState } from "react";
import "./outBox.css";
import { useDispatch } from "react-redux";
import { composeActions } from "./store/compose";
import { inboxActions } from "./store/inbox";
import { OutboxActions } from "./store/outbox";
import { emaildataActions } from "./store/emaildata";
const Inbox = () => {
  const dispatch = useDispatch(composeActions);
  const dispatch1 = useDispatch(inboxActions);
  const dispatch2 = useDispatch(OutboxActions);
  const dispatch3 = useDispatch(emaildataActions);
  const [data, setData] = useState([]);
  const DeleteHandler = async (item) => {
    await fetch(
      `https://mail-box-86f51-default-rtdb.firebaseio.com/${localStorage.getItem(
        "UserEmail"
      )}/inbox/${item.id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const remainData = data.filter((obj) => {
      return obj !== item;
    });
    setData([...remainData]);
  };
  useEffect(() => {
    setInterval(async() => {
      const response = await fetch(
        `https://mail-box-86f51-default-rtdb.firebaseio.com/${localStorage.getItem(
          "UserEmail"
        )}/inbox.json`
      );
      const result = await response.json();
      if (result) {
        const newArray = Object.keys(result).map((key) => {
          return { ...result[key], id: key };
        });
        setData(newArray);
      }
    }, 1000);
  }, []);
  const OpenHandler = async (item) => {
    try {
      await fetch(
        `https://mail-box-86f51-default-rtdb.firebaseio.com/${localStorage.getItem(
          "UserEmail"
        )}/inbox/${item.id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            visible: "read",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      alert(err);
    }
    dispatch(composeActions.toggle(true));
    dispatch1(inboxActions.toggle(false));
    dispatch2(OutboxActions.toggle(false));
    dispatch3(emaildataActions.setemailData(item));
  };
  return (
    <ul className="mail">
      {data.map((item) => {
        let email = item.email ? item.email.replace(/[.@]/g, "") : "";
        let visible = item.visible === "unread" ? "🔵" : " ";
        return (
          <li key={item.id}>
            <button
              className="btn1"
              onClick={() => {
                OpenHandler(item);
              }}
            >
              <span className="text1">{visible}</span>
              <span className="text1">From: {email}</span>
              <span className="text2">(Subject) {item.subject}</span>
            </button>
            <button
              className="btn2"
              onClick={() => {
                DeleteHandler(item);
              }}
            >
              X
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Inbox;
