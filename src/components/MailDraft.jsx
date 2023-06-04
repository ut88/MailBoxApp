import { Button } from "react-bootstrap";
import "./MailDraft.css";
import { useRef } from "react";
const MailDraft=()=>{
   const email=useRef();
   const subject=useRef();
   const text=useRef();
   const submitHandler=async(e)=>{
     e.preventDefault();
     const obj={
      email:email.current.value.replace('@','').replace('.',''),
      subject:subject.current.value,
      text:text.current.value,
     }
     localStorage.setItem("SentEmail",obj.email)
     console.log(obj.email)
      await fetch(`https://mail-box-86f51-default-rtdb.firebaseio.com/${obj.email}.json`,
     {
      method:"POST",
      body:JSON.stringify(obj),
      headers:{
         "Content-Type": "application/json",
      }
     })
      email.current.value="";
      subject.current.value="";
      text.current.value="";
   }
  return(<>
     <form className="form1" onSubmit={submitHandler}>
        <input type="email" placeholder="To"  ref={email} required></input>
        <input type="text" placeholder="Subject" ref={subject} required></input>
        <textarea ref={text} required></textarea>
        <Button type="submit">Send</Button>
     </form>
     
     </>
   )
}

export default MailDraft;