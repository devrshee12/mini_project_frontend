import React, { useEffect } from 'react'
import { useDashboradContext } from '../../context/dashboard_context';
import axios from 'axios';
import { useUserContext } from '../../context/user_context';

const ListProject = () => {
  const {projects, setProjects, changeMemberId, memberTaskFlag, changeProjectId, projectId,  handleEditProjectFlag, handleMemberTaskFlag} = useDashboradContext();
  const {email, setEmail} = useUserContext();
  useEffect(() => {
    console.log("hello from list compo");
    console.log("email here", email)
    axios.post('/api/v1/dashboard/getMemberProjects', {email},{
      withCredentials: true
    })
          .then((response) => {
            // console.log("data", data);
            console.log("got", response);
            changeMemberId(response.data.memberId);
            // if()
            if(response.data.projects.length !== 0){
              setProjects(response.data.projects);
            }
            else{
              setProjects([]);
            }
          }, (error) => {
            console.log("here in error");
            console.log(error);
          });
  }, [])


//   const callApiDeleteProject = async(val) => {
//     try{
//       console.log("here in call api");
//       console.log(projectId)
//       const res = await axios.delete(`/api/v1/dashboard/deleteProject/${val}`, {
//         withCredentials:true,
//       })

//       const data = await axios.get("/api/v1/dashboard/getUser", {withCredentials: true});
//       console.log("got data in delete : " + data.data);
//       setProjects(data.data.projects);

//     }
//     catch(err){
//       console.log(err);
//     }
//   }

//   const deleteProject = (val) => {
//     // changeProjectId(val);
//     // console.log("hii from delete");
    
//     callApiDeleteProject(val);
//   }

  


  
  

  

  return (
    
   <>
   {
    projects && 
  
      
      projects.map((project, index) => {
        return (<tbody>
                        <tr>
                          
                          <th className="col-lg-1" style={{verticalAlign:"middle"}}>{index+1}</th>
                          <td className="col-lg-3" style={{verticalAlign:"middle",cursor:"pointer",color:"blue"}} onClick={() => {changeProjectId(project._id);handleMemberTaskFlag(false);}}>{project.name}</td>
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
                            memberTaskFlag();
                          }}></i>
                          </td>
                          <td className="col-lg-2">
                            <div className="d-flex justify-content-between w-75">
                              <button
                                type="button"
                                class="btn btn-outline-secondary btn-sm"
                                onClick={(e) => {changeProjectId(project._id);handleEditProjectFlag()}}
                              >
                                Edit
                              </button>
                              <button type="button" class="btn btn-outline-danger btn-sm" onClick={() => {
                                // console.log("first")
                                // console.log("project id :", projectId)
                                // changeProjectId(project._id);
                                // console.log("")
                                // deleteProject(project._id);
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

export default ListProject