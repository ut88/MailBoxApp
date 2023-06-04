import { useEffect, useState } from "react";
import './outBox.css';
import { useDispatch } from "react-redux";
import {composeActions} from "./store/compose";
import { inboxActions } from "./store/inbox";
import { OutboxActions } from "./store/outbox";
const OutBox=()=>{
const dispatch=useDispatch(composeActions);
 const dispatch1=useDispatch(inboxActions);
 const dispatch2=useDispatch(OutboxActions);
 const [data,setData]=useState([]);
 const DeleteHandler=async(item)=>{
    await fetch(`https://mail-box-86f51-default-rtdb.firebaseio.com/${item.email}/outbox/${item.id}.json`,{
      method:'DELETE',
      headers:{
          "Content-Type": "application/json"
      }
    })
     const remainData=data.filter((obj)=>{
        return obj!==item
     })
    setData([...remainData])
 }
    useEffect(()=>{
        let fetchData=async()=>{
            const response= await fetch(`https://mail-box-86f51-default-rtdb.firebaseio.com/${localStorage.getItem("UserEmail")}/outbox.json`)
            const result=await response.json();
            console.log(result)
            if(result){
            const newArray=Object.keys(result).map((key)=>{
                return {...result[key],id:key}
              })
            setData(newArray)
            }
         }
        fetchData()
    },[])
   const OpenHandler=()=>{
    dispatch(composeActions.toggle(true))
    dispatch1(inboxActions.toggle(false))
    dispatch2(OutboxActions.toggle(false))
   }
 return(<ul className="mail">
     {data.map((item)=>{
     let email= (item.email)?item.email.replace('gmailcom','@gmail.com'):""
        return(<li key={item.id}>
            <button className="btn1" onClick={OpenHandler}>
                <span className="text1">To: {email}</span>
                <span className="text2">(Subject) {item.subject}</span>
            </button>
        <button className="btn2" onClick={()=>{DeleteHandler(item)}}>X</button>
      </li>)
     })}
 </ul>)
}

export default OutBox;