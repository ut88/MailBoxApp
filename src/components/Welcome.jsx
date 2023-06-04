import "./Welcome.css";
import OutBox from './outBox';
import MailDraft from "./MailDraft";
import { useDispatch,useSelector } from "react-redux";
import { composeActions } from "./store/compose";
import { inboxActions } from "./store/inbox";
import  {OutboxActions} from './store/outbox';
import Inbox from "./Inbox";
import { LoginActions } from "./store/login";
const Welcome=()=>{
 const dispatch=useDispatch(composeActions);
 const dispatch1=useDispatch(inboxActions);
 const dispatch2=useDispatch(OutboxActions);
 const dispatch3=useDispatch(LoginActions)
 const outbox=useSelector(state=>state.outbox.condition);
 const inbox=useSelector(state=>state.inbox.condition)
 const compose=useSelector(state=>state.compose.state)
 const composehandler=()=>{
  dispatch(composeActions.toggle(true))
  dispatch1(inboxActions.toggle(false))
  dispatch2(OutboxActions.toggle(false))
 }
 const inboxHandler=()=>{
  dispatch(composeActions.toggle(false))
  dispatch1(inboxActions.toggle(true))
  dispatch2(OutboxActions.toggle(false))
 }
 const outboxHandler=()=>{
    dispatch(composeActions.toggle(false))
    dispatch1(inboxActions.toggle(false))
    dispatch2(OutboxActions.toggle(true))
 }
 const logoutHandler=()=>{
   dispatch3(LoginActions.toggle())
   localStorage.removeItem("Token")
   localStorage.removeItem("SentEmail")
   localStorage.removeItem("UserEmail")
 }
  return(
  <div><div className="main"><h1>Welcome to Mail Box 📨</h1>
  <button className="btnlog" onClick={logoutHandler}>Logout</button></div>
  <div className="sideblock"><button className="button1" onClick={composehandler}>✏️Compose</button>
  <div className="buttons">
  <button onClick={inboxHandler}>Inbox</button>
  <button onClick={outboxHandler}>Outbox</button>
  </div>
  </div>
  {compose &&<div className="sidediv"><MailDraft /></div>}
  {outbox && <OutBox />}
  {inbox && <Inbox />}
  </div>
 )
}

export default Welcome;