import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { LoginActions } from "./store/login";
const Form1 = () => {
  const dispatch = useDispatch(LoginActions);
  const [login, setlogin] = useState(false);
  const email = useRef();
  const password = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const email1 = email.current.value;
    const password2 = password.current.value;
    let url;
    if (login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqtH4RacoWhFJya3pU4TthNl2mJAo1PNQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqtH4RacoWhFJya3pU4TthNl2mJAo1PNQ";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email1,
          password: password2,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log(result.idToken);
      localStorage.setItem("Token", result.idToken);
      localStorage.setItem("UserEmail", email1.replace(/[.@]/g, ""));
      email.current.value = "";
      password.current.value = "";
      dispatch(LoginActions.toggle());
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <div style={{ margin: "4px" }}>
        <h1 style={{ textAlign: "center" }}>📧Login</h1>
      </div>
      <Form style={{ border: "5px solid blue" }} onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={email}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={password}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={password}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" justify-content="center">
          Submit
        </Button>
        <Button
          variant="link"
          onClick={() => {
            setlogin(!login);
          }}
        >
          {login ? "Create New Account" : "Have a Existing Account"}
        </Button>
      </Form>
    </>
  );
};

export default Form1;
