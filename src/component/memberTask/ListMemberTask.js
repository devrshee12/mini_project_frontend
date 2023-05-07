import React, {useEffect} from 'react'
import axios from 'axios';
import { useDashboradContext } from '../../context/dashboard_context';

const ListMemberTask = () => {
  const {projectId, memberId, setSelectedTask, selectedTasks, taskId, changeTaskId, handleEditTask} = useDashboradContext();


  

  const getSelectedTask = async() => {
    console.log(projectId);
    console.log(memberId);
    try{
      const res = await axios.post("/api/v1/dashboard/getTaskOfMember", {projectId, memberId}, {
        withCredentials: true
      })

      console.log(res);

      setSelectedTask(res.data.tasks);
    }
    catch(err){
      console.log(err);
    }
  }
  
  useEffect(() => {
    getSelectedTask();
  }, [])



  const callApiForDeleteTask = async(val) => {
    try{
      const res = await axios.post("/api/v1/dashboard/deleteTaskForMember", {
        projectId,
        memberId,
        taskId: val
      }, {
        withCredentials: true
      });


      const data = await axios.post("/api/v1/dashboard/getTaskOfMember", {projectId, memberId},{withCredentials: true});
      setSelectedTask(data.data.tasks);
    }
    catch(err){
      console.log(err);
    }
  }

  const deleteTaskMember = (val) => {
    callApiForDeleteTask(val);
  }


  

  return (
    
   <>
   {
    selectedTasks && 
  
      
    selectedTasks.map((task, index) => {
        return (<tbody>
                        <tr>
                          
                          <th className="col-lg-1" style={{verticalAlign:"middle"}}>{index+1}</th>
                          <td className="col-lg-3" style={{verticalAlign:"middle",cursor:"pointer",color:"blue"}}>{task.name}</td>
                          <td className="col-lg-3" style={{verticalAlign:"middle"}}>{task.taskType}</td>
                          <td className="col-lg-2" style={{verticalAlign:"middle"}}>
                          {task.status}
                          </td>
                          {/* <td className="col-lg-1" style={{verticalAlign:"middle"}}>
                          <i className="fas fa-circle-plus fa-2x"></i>
                          </td> */}
                          <td className="col-lg-2">
                            <div className="d-flex justify-content-between w-75">
                              <button
                                type="button"
                                class="btn btn-outline-secondary btn-sm"
                                onClick={() => {changeTaskId(task._id);
                                  handleEditTask();}}
                                
                              >
                                Edit
                              </button>
                              <button type="button" class="btn btn-outline-danger btn-sm" onClick={() => {
                                changeTaskId(task._id);
                                deleteTaskMember(task._id);
                              }}>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>)
      })
    
  }
   </>
  )
}

export default ListMemberTask