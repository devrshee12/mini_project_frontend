import React, { useEffect } from 'react'
import { useDashboradContext } from '../../context/dashboard_context';
import axios from 'axios';

const List = () => {
  const {projects, setProjects, handleCloseCreateMember,handleDisplayMember, changeProjectId} = useDashboradContext();
  useEffect(() => {
    console.log("hello from list compo");
    axios.get('/api/v1/dashboard/getUser', {
      withCredentials: true
    })
          .then((response) => {
            // console.log("data", data);
            console.log("got", response);
            // if()
            if(response.data.projects.length !== 0){
              setProjects(response.data.projects);
            }
          }, (error) => {
            console.log("here in error");
            console.log(error);
          });
  }, [])
  return (
    
   <>
   {
    projects && 
  
      
      projects.map((project, index) => {
        return (<tbody>
                        <tr>
                          
                          <th className="col-lg-1" style={{verticalAlign:"middle"}}>{index+1}</th>
                          <td className="col-lg-3" style={{verticalAlign:"middle",cursor:"pointer",color:"blue"}} onClick={() => {changeProjectId(project._id);handleDisplayMember();}}>{project.name}</td>
                          <td className="col-lg-3" style={{verticalAlign:"middle"}}>{project.category}</td>
                          <td className="col-lg-2" style={{verticalAlign:"middle"}}>
                          <button type="button" class="btn btn-outline-success btn-sm">{project.creaters[0].name}</button>
                          </td>
                          <td className="col-lg-1" style={{verticalAlign:"middle"}}>
                          <i className="fas fa-circle-plus fa-2x" onClick={() => {
                            console.log("function called");
                            console.log(project._id);
                            changeProjectId(project._id);
                            console.log("after calling change project id");
                            handleCloseCreateMember();
                          }}></i>
                          </td>
                          <td className="col-lg-2">
                            <div className="d-flex justify-content-between w-75">
                              <button
                                type="button"
                                class="btn btn-outline-secondary btn-sm"
                              >
                                Edit
                              </button>
                              <button type="button" class="btn btn-outline-danger btn-sm">
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

export default List