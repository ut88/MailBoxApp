import { Button } from "react-bootstrap";
import "./MailDraft.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
const MailDraft = () => {
  let email = useRef();
  let subject = useRef();
  let text = useRef();
  const sendEmail = useSelector((state) => state.emaildata.email);
  useEffect(() => {
    if (sendEmail.email) {
      email.current.value = sendEmail.email;
      subject.current.value = sendEmail.subject;
      text.current.value = sendEmail.text;
    }
  }, [sendEmail]);

  const submitHandler = async (e) => {
    e.preventDefault();
    let obj = {
      email: email.current.value,
      subject: subject.current.value,
      text: text.current.value,
      visible: "unread",
    };
    await fetch(
      `https://mail-box-86f51-default-rtdb.firebaseio.com/${obj.email}/inbox.json`,
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await fetch(
      `https://mail-box-86f51-default-rtdb.firebaseio.com/${localStorage.getItem(
        "UserEmail"
      )}/outbox.json`,
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    email.current.value = "";
    subject.current.value = "";
    text.current.value = "";
  };
  return (
    <>
      <form className="form1" onSubmit={submitHandler}>
        <input type="email" placeholder="To" ref={email} required></input>
        <input type="text" placeholder="Subject" ref={subject} required></input>
        <textarea ref={text} required></textarea>
        <Button type="submit">Send</Button>
      </form>
    </>
  );
};

export default MailDraft;
