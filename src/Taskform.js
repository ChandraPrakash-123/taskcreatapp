import React ,{useState,useEffect} from "react";
//import  View  from "./View.js"
import "./Taskform.css"
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
   
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }
//getting the value of local storage 
const getDatafromLS=()=>{
    const  data=localStorage.getItem('task');
    if (data){
        return JSON.parse(data);
    }
    else{
        return[];
    }
}

const  Taskform=()=>{
            const [task,settask]= useState(getDatafromLS());
           
    


    const [entertask,setentertask]=useState('');
    const [entertaskdis,setentertaskdis]=useState('');
    const [enterdate,setenterdate]=useState('');
    const [entertime,setentertime]=useState('');


    const taskchangehandler=(event)=>{
    setentertask(event.target.value);
};
    const taskdischangehandler=(event)=>{
    setentertaskdis(event.target.value);
};
    const datechangehandler=(event)=>{
    setenterdate(event.target.value);
};
    const timechangehandler=(event)=>{
    setentertime(event.target.value);
};
  const submithandler=(event)=>{
    event.preventDefault();

  const taskdata={
        taskname:entertask,
        taskdiscription:entertaskdis,
        date:new Date(enterdate),
        time:entertime
        
    }
         settask([...task,taskdata]);
    console.log(taskdata)
        setentertask('');
        setentertaskdis('');
        setenterdate('');
        setentertime('');
}
        useEffect(()=>{
                localStorage.setItem('task',JSON.stringify(task))
        },[task])

    return (
    <div>
        <div>  
                <form onSubmit={ submithandler}>
                  <div className="frame">
                            <h2>task creater</h2>
                    <div className="row1">
                        <label>task name</label>
                        <input type="text" value={entertask} onChange={taskchangehandler} />
                    </div>
                    <div className="row1">
                        <label>task Discription</label>
                        <textarea value={entertaskdis} onChange={taskdischangehandler} ></textarea>
                    </div>
                    <div className="row2">
                        <div className="row3">
                            <label>date</label>
                            <input type="date" value={enterdate} onChange={datechangehandler} />
                        </div>
                        <div className="row4">
                            <label>time</label>
                            <input type="time" value={entertime} onChange={timechangehandler} />
                        </div>
                    </div>
                        <label >create task</label>
                        <button className="btn" type="submit"  ></button>
                    </div>
      
                 </form>
        </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>taskname</th>
                                <th>task discription</th>
                                <th>date </th>
                                <th>time </th>
                            </tr>
                        </thead>
                        <tbody>
                {  task.state.map((taskdat)=>{
                return (<tr key={taskdat.length+Math.random()}>
            <td>{taskdat.taskname}</td>
           
           <td>{taskdat.taskdiscription}</td>
           <td> {taskdat.date} </td>
           <td>{taskdat.time} </td>
           
        </tr>
    );
    })}   
                        </tbody>
                    </table>
                </div>
    </div>
    );
}
export default Taskform;