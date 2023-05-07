import React, { useEffect, useState } from "react";
import "./creatorDashboard.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useDashboradContext } from "../../context/dashboard_context";
import ProjectList from "../ProjectList/ProjectList";
import CreateMemberDashboard from "../createMemberDashboard/CreateMemberDashboard";
import CreateProjectDashboard from "../createProjectDashboard/CreateProjectDashboard";
import ListProjectMembers from "../listProjectMembers/ListProjectMembers";
import CreateTask from "../createTask/CreateTask";
import ListProjectTask from "../ListProjectTask/ListProjectTask";
import AssignTask from "../assignTask/AssignTask";
import EditProject from "../editProject/EditProject";
import EditMember from "../editMember/EditMember";
import KanbanBoard from "../kanbanBoard/KanbanBoard";
import EditKanban from "../editKanban/EditKaban";
import EditTask from "../editTask/EditTask";
import MemberProjectList from "../memberProjectList/MemberProjectList";
import MemberTask from "../memberTask/MemberTask";

const CreatorDashboard = () => {
  const {
    createMemberFlag,
    createProjectFlag,
    displayMemberFlag,
    addTaskFlag,
    displayTaskFlag,
    assignTaskFlag,
    editProjectFlag,
    editMemberFlag,
    kanbanBoardFlag,
    email,
    projects,
    members,
    selectedTasks,
    setProjects,
    setMembers,
    setSelectedTask,
    handleEditKanbanFlag,
    handleEditTaskFlag,
    memberProjectListFlag,
    memberTaskFlag
  } = useDashboradContext();

  // const [tempProjects, setTempProjects] = useState([]);
  // var tempProjects
  // var tempMembers
  // var tempSelectedTasks

  // const handleChange = (e) => {
  //   const val = e.target.value;
  //   if(displayTaskFlag){
  //     if(val === ""){
  //       setSelectedTask(selectedTasks);
  //       return;
  //     }
  //     const newSelectedTask = selectedTasks.filter((task) => {
  //       if (task.name.toLowerCase()
  //               .includes(val.toLowerCase())) { return task; }
  //     })

  //     setSelectedTask(newSelectedTask);

  //   }
  //   else if(displayMemberFlag){
  //     if(val === ""){
  //       setMembers(members);
  //       return;
  //     }
  //     const newMembers = members.filter((member) => {
  //       if (member.name.toLowerCase()
  //               .includes(val.toLowerCase())) { return member; }
  //     })

  //     setMembers(newMembers);

  //   }
  //   else{
  //     console.log("ahiya cheeee");
  //     if(val === ""){
  //       setProjects(tempProjects);
  //       return;
  //     }
  //     const newProjects = tempProjects.filter((project) => {
  //       if (project.name.toLowerCase()
  //               .includes(val.toLowerCase())) { return project; }
  //     })

  //     setProjects(newProjects);
  //   }
  // }

  // useEffect(() => {
  //   setTempProjects(projects);

  // }, [])

  return (
    <div className="container">
      <div style={{ height: "100vh" }}>
        <div style={{ height: "10%" }}>
          <nav class="navbar navbar-light bg-light justify-content-between h-100">
            <form class="form-inline">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                // onChange={handleChange}
              />
            </form>
            <a class="navbar-brand">Hii ! User</a>
          </nav>
        </div>
        {createMemberFlag ? (
          <CreateMemberDashboard />
        ) : createProjectFlag ? (
          <CreateProjectDashboard />
        ) : displayMemberFlag ? (
          <ListProjectMembers />
        ) : addTaskFlag ? (
          <CreateTask />
        ) : displayTaskFlag ? (
          <ListProjectTask />
        ) : assignTaskFlag ? (
          <AssignTask />
        ) : editProjectFlag ? (
          <EditProject />
        ) : editMemberFlag ? (
          <EditMember />
        ) : kanbanBoardFlag ? (
          <KanbanBoard />
        ) : handleEditKanbanFlag ? (
          <EditKanban />
        ) : handleEditTaskFlag ? (
          <EditTask />
        ) : memberProjectListFlag ? (
          <MemberProjectList />
        ) : (memberTaskFlag ? <MemberTask/>:
          <ProjectList />
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard;
