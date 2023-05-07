import {DASHBOARD_EMAIL_CHANGE, DASHBOARD_NAME_CHANGE, DASHBOARD_PROJECT_CHANGE, HANDLE_CLOSE_CREATE_MEMBER, HANDLE_CLOSE_CREATE_PROJECT, HANDLE_DISPLAY_MEMBER, CHANGE_PROJECT_ID, SET_MEMBERS, ADD_TASK_FLAG, CHANGE_MEMBER_ID, HANDLE_CLOSE_DISPLAY_TASK, HANDLE_CLOSE_ASSIGN_TASK_FLAG, SET_SELECTED_TASK, HANDLE_EDIT_PROJECT_FLAG, HANDLE_EDIT_MEMBER_FLAG, CHANGE_TASK_ID, HANDLE_KANBAN_BOARD_FLAG, CREATE_KANBAN_DATA, UPDATE_KANBAN_DATA, SET_KANBAN_DATA, HANDLE_EDIT_KANBAN, HANDLE_EDIT_TASK, HANDLE_MEMBER_PROJECT_TASK, HANDLE_MEMBER_TASK_FLAG} from "../action"



const dashboard_reducer = (state, action) => {

    if(action.type === DASHBOARD_EMAIL_CHANGE){
        console.log(action.payload);
        return {...state, email: action.payload}
        
    }
    if(action.type === DASHBOARD_NAME_CHANGE){
        console.log(action.payload);
        return {...state, name: action.payload}
    }
    if(action.type === DASHBOARD_PROJECT_CHANGE){
        console.log(action.payload);
        return {...state, projects: action.payload}
    }
    if(action.type === HANDLE_CLOSE_CREATE_MEMBER){
        return {...state, createMemberFlag: !state.createMemberFlag, createProjectFlag: false, displayMemberFlag: false};
    }
    if(action.type === HANDLE_CLOSE_CREATE_PROJECT){
        
        return {...state, createProjectFlag: !state.createProjectFlag, createMemberFlag: false};
    }
    if(action.type === HANDLE_DISPLAY_MEMBER){
        return {...state, displayMemberFlag: !state.displayMemberFlag, createMemberFlag: false, createProjectFlag: false, displayTaskFlag: false}
    }
    if(action.type === CHANGE_PROJECT_ID){
        console.log(action.payload);
        return {...state, projectId: action.payload}
    }
    if(action.type === SET_MEMBERS){
        return {...state, members: action.payload}
    }
    if(action.type === SET_SELECTED_TASK){
        return {...state, selectedTasks: action.payload}
    }
    if(action.type === ADD_TASK_FLAG){
        if(state.addTaskFlag){
            return {...state, addTaskFlag: !state.addTaskFlag, displayMemberFlag: true};
        }
        return {...state, addTaskFlag: !state.addTaskFlag, displayMemberFlag: false, createMemberFlag: false, createProjectFlag: false}
    }
    if(action.type === CHANGE_MEMBER_ID){
        return {...state, memberId: action.payload}
    }
    if(action.type === CHANGE_TASK_ID){
        return {...state, taskId: action.payload}
    }
    if(action.type === HANDLE_CLOSE_DISPLAY_TASK){
        if(state.displayTaskFlag){
            return {...state, displayTaskFlag: !state.displayTaskFlag, displayMemberFlag: true}
        }
        return {...state, displayTaskFlag: !state.displayTaskFlag, displayMemberFlag: false, createMemberFlag: false, createProjectFlag: false}
    }

    if(action.type === HANDLE_CLOSE_ASSIGN_TASK_FLAG){
        console.log("here in assign task");
        if(state.assignTaskFlag){
            return {...state, assignTaskFlag: !state.assignTaskFlag, displayMemberFlag: true}
        }

        return {...state, assignTaskFlag: !state.assignTaskFlag,displayMemberFlag: false, createMemberFlag: false, createProjectFlag: false}
    }
    if(action.type === HANDLE_EDIT_PROJECT_FLAG){
        return {...state, editProjectFlag: !state.editProjectFlag}
    }
    if(action.type === HANDLE_EDIT_MEMBER_FLAG){
        if(state.editMemberFlag){
            return {...state, editMemberFlag: !state.editMemberFlag, displayMemberFlag: true}
        }
        return {...state, editMemberFlag: !state.editMemberFlag, displayMemberFlag: false}
    }
    if(action.type === HANDLE_KANBAN_BOARD_FLAG){
        if(state.kanbanBoardFlag){
            return {...state, kanbanBoardFlag: !state.kanbanBoardFlag, displayTaskFlag: true}
        }
        return {...state, kanbanBoardFlag: !state.kanbanBoardFlag, displayTaskFlag: false};
    }
    if(action.type === SET_KANBAN_DATA){
        return {...state, kanbanData: action.payload}
    }
    if(action.type === HANDLE_EDIT_KANBAN){
        if(state.handleEditKanbanFlag){
            return {...state, kanbanBoardFlag: true, handleEditKanbanFlag: !state.handleEditKanbanFlag, displayMemberFlag: false}
        }
        return {...state, handleEditKanbanFlag: !state.handleEditKanbanFlag, kanbanBoardFlag: false, displayMemberFlag: false}
    }
    if(action.type === HANDLE_EDIT_TASK){
        if(state.handleEditTaskFlag){
            return {...state, handleEditTaskFlag: !state.handleEditTaskFlag, displayTaskFlag: true, displayMemberFlag: false}
        }
        return {...state, handleEditTaskFlag: !state.handleEditTaskFlag, displayTaskFlag: false, displayMemberFlag: false}
    }

    if(action.type === HANDLE_MEMBER_PROJECT_TASK){
        
        return {...state, memberProjectListFlag: action.payload, displayTaskFlag: false};
    }


    if(action.type === HANDLE_MEMBER_TASK_FLAG){
        console.log("handle memeber task flag")
        console.log("herherherhehrewhrkhsgkfusaebkjfgsekfuadkulfglksdhfkashfkdhgoui");
        if(state.memberTaskFlag){
            return {...state, memberTaskFlag: !state.memberTaskFlag, memberProjectListFlag: true, displayMemberFlag: false}
        }
        return {...state, memberTaskFlag: !state.memberTaskFlag, memberProjectListFlag: false, displayMemberFlag: false}
    }



    return state;
    throw new Error(`No Matching "${action.type}" - action type`)

}


export default dashboard_reducer;