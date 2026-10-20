import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {Navbar, Nav, Offcanvas, Button, Container, Form, Badge, Spinner} from "react-bootstrap";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import "bootstrap/dist/css/bootstrap.min.css";
import {FaCheck, FaPlus, FaRegCircle, FaRegClock, FaTasks} from "react-icons/fa";
import {MdDelete, MdMoreHoriz, MdOutlineDragIndicator} from "react-icons/md";
import { toast, Bounce } from "react-toastify";
import { boardLists, addNewList, deletelist } from "../../lib/api/listAPI";
import { addNewTask, deletetask, taskStatusToggle, movetask} from "../../lib/api/taskAPI";
import { deleteboard } from "../../lib/api/boardAPI";

const ManageBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newListInput, setNewListInput] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [listMenuVisibility, setListMenuVisibility] = useState({});
  const [taskMenuVisibility, setTaskMenuVisibility] = useState({});
  const [taskInputs, setTaskInputs] = useState({});
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const boardData = location.state?.boardData;
  const userId = location.state?.userId;
  const boardId = boardData?._id;
  const bgcolor = boardData?.boardColor || "#4f46e5";

  const fetchListData = useCallback(async () => {
    if (!boardId) {
      setLoading(false);
      return;
    }
    try {
      const response = await boardLists(boardId);
      setLists(response.data.list || []);
    }
    catch (error) {
      console.error("Error fetching board data:", error);
      toast.error("Unable to load board data.", {transition: Bounce});
    }
    finally {
      setLoading(false);
    }
  }, [boardId]);

  useEffect(() => {
    if (!boardData || !boardId) {
      navigate("/", { replace: true });
      return;
    }
    fetchListData();
  }, [boardData, boardId, navigate, fetchListData]);

  // Add list
  const handleAddList = async (e) => {
    e.preventDefault();
    const listName = newListName.trim();
    if (!listName) {
      toast.warning("Please enter a list name.");
      return;
    }
    try {
      await addNewList(boardId,{listName, listColor: bgcolor});
      setNewListName("");
      setNewListInput(false);
      toast.success(`"${listName}" created successfully.`, {transition: Bounce});
      await fetchListData();
    }
    catch (error) {
      console.error("Error creating list:", error);
      toast.error(error.response?.data?.message || "Failed to create list.", { transition: Bounce });
    }
  };

  // Delete list
  const deleteList = async (deleteListId) => {
    const confirmed = window.confirm("Are you sure you want to delete this list?");
    if (!confirmed) return;
    try {
      await deletelist({data: { deleteListId }});
      setListMenuVisibility((prev) => ({...prev, [deleteListId]: false}));
      toast.success("List deleted successfully.", {transition: Bounce});
      await fetchListData();
    }
    catch (error) {
      console.error("Error deleting list:", error);
      toast.error("Failed to delete list.", {transition: Bounce});
    }
  };

  // Add task
  const handleAddTask = async (e, listId) => {
    e.preventDefault();
    const taskName = (taskInputs[listId] || "").trim();
    if (!taskName) return;
    try {
      const response = await addNewTask({listId, taskName});
      if (response.status === 201 || response.status === 200) {
        setTaskInputs((prev) => ({...prev, [listId]: ""}));
        toast.success("Task added successfully.", {transition: Bounce});
        await fetchListData();
      }
    }
    catch (error) {
      console.error("Error creating task:", error);
      toast.error(
        error.response?.data?.message || "Failed to create task.", { transition: Bounce });
    }
  };

  // Delete task
  const deleteTask = async (deleteTaskId, listIdDeleteTask) => {
    try {
      await deletetask({data: {deleteTaskId, listIdDeleteTask}});
      setTaskMenuVisibility((prev) => ({...prev, [deleteTaskId]: false}));
      toast.success("Task deleted successfully.", {
        transition: Bounce,
      });
      await fetchListData();
    }
    catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.", {transition: Bounce});
    }
  };

  // Complete / uncomplete task
  const completeTask = async (completeTaskId, listIdCompleteTask, taskCompleteStatus) => {
    try {
      await taskStatusToggle({completeTaskId, listIdCompleteTask, taskCompleteStatus});
      toast.success(taskCompleteStatus ? "Task marked as pending." : "Great job! Task completed.", { transition: Bounce });
      await fetchListData();
    }
    catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.", {transition: Bounce});
    }
  };

  // Delete board
  const deleteBoard = async (deleteBoardId) => {
    const confirmed = window.confirm("Are you sure you want to delete this board?");
    if (!confirmed) return;
    try {
      const response = await deleteboard({data: { deleteBoardId }});
      if(response.status === 200){
        navigate(`/dashboard/showboard`)
        toast.success("Board deleted successfully.", {transition: Bounce});
      }
      // await fetchListData();
    }
    catch (error) {
      console.error("Error deleting list:", error);
      toast.error("Failed to delete list.", {
        transition: Bounce,
      });
    }
  };


  // Drag and drop
  const handleOnDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)){
      return;
    }
    const previousLists = lists;
    const sourceList = lists.find((list) => list._id === source.droppableId);
    const destinationList = lists.find((list) => list._id === destination.droppableId);
    if (!sourceList || !destinationList) return;
    const sourceTasks = [...sourceList.taskId];
    const [movedTask] = sourceTasks.splice(source.index, 1);
    if (!movedTask || movedTask._id !== draggableId) return;
    let updatedLists;
    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      updatedLists = lists.map((list) => list._id === sourceList._id ? { ...list, taskId: sourceTasks } : list);
    }
    else {
      const destinationTasks = [...destinationList.taskId];
      destinationTasks.splice(destination.index, 0, {...movedTask, listId: destinationList._id});
      updatedLists = lists.map((list) => {
        if (list._id === sourceList._id) {
          return { ...list, taskId: sourceTasks };
        }
        if (list._id === destinationList._id) {
          return { ...list, taskId: destinationTasks };
        }
        return list;
      });
    }
    setLists(updatedLists);

    try {
      const response = await movetask({
        taskId: movedTask._id,
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        destinationIndex: destination.index,
      });
      if (response.status === 200) {
        await fetchListData();
      }
    }
    catch (error) {
      console.error("Error moving task:", error);
      setLists(previousLists);
      toast.error("Failed to move task.", {transition: Bounce});
      await fetchListData();
    }
  };
  if (!boardData) {
    return null;
  }
  const totalTasks = lists.reduce((total, list) => total + (list.taskId?.length || 0),0);
  const completedTasks = lists.reduce((total, list) => total + (list.taskId?.filter((task) => task.isComplete).length || 0),0);

  return (
    <div className="min-vh-100 d-flex flex-column" style={{backgroundColor: "#f5f7fb", color: "#172033"}}>
      <Navbar className="px-3 px-md-4 py-3 shadow-sm" style={{backgroundColor: "#ffffff", borderBottom: `3px solid ${bgcolor}`,}}>
        <Container fluid className="p-0">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center justify-content-center rounded-3" style={{width: 44, height: 44, backgroundColor: bgcolor, color: "#ffffff", flexShrink: 0}}>
              <FaTasks size={20} />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h5 className="mb-0 fw-bold">{boardData.boardName}</h5>
                <Badge bg="light" text="dark" className="border fw-medium">Board</Badge>
              </div>
              <small className="text-secondary">Organize your work, one task at a time</small>
            </div>
          </div>
          <Button variant="light" className="rounded-3 border ms-auto d-flex align-items-center justify-content-center" style={{ width: 42, height: 42 }} onClick={() => setShowOffcanvas(true)} aria-label="Open board menu">
            <MdMoreHoriz size={25} />
          </Button>
        </Container>
      </Navbar>
      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end">
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="fw-bold">Board settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="rounded-3 p-3 mb-4" style={{backgroundColor: "#f5f7fb", borderLeft: `4px solid ${bgcolor}`}}>
            <div className="fw-semibold">{boardData.boardName}</div>
            <small className="text-secondary">Your workspace board</small>
          </div>
          <Nav className="flex-column gap-2">
            <Nav.Link as={Link} to="/" className="rounded-3 px-3 py-2 text-dark" onClick={() => setShowOffcanvas(false)}>About this board</Nav.Link>
            <Button variant="outline-secondary" className="text-start border-0" onClick={() => {setShowOffcanvas(false);toast.info("Board editing is not connected yet.")}}>Edit board</Button>
            <Button variant="outline-danger" className="text-start border-0" onClick={() => deleteBoard(boardId)}><MdDelete size={19} className="me-2" />Delete board</Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <Container fluid className="px-3 px-md-4 pt-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
          <div>
            <h4 className="fw-bold mb-1">Your workspace</h4>
            <p className="text-secondary mb-0 small">Keep your tasks organized and moving forward.</p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <div className="bg-white border rounded-3 px-3 py-2">
              <small className="text-secondary d-block">Total tasks</small>
              <span className="fw-bold">{totalTasks}</span>
            </div>
            <div className="bg-white border rounded-3 px-3 py-2">
              <small className="text-secondary d-block">Completed</small>
              <span className="fw-bold text-success">{completedTasks}</span>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="d-flex flex-column align-items-center justify-content-center py-5" style={{ minHeight: 250 }}>
            <Spinner animation="border" style={{ color: bgcolor }} />
            <p className="text-secondary mt-3 mb-0">Loading your board...</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="d-flex align-items-start gap-3 pb-4" style={{overflowX: "auto", minHeight: "55vh", scrollbarWidth: "thin"}}>
              {lists.map((list) => {
                const tasks = list.taskId || [];
                const completed = tasks.filter((task) => task.isComplete).length;
                return (
                  <div key={list._id} className="rounded-4 border shadow-sm flex-shrink-0" style={{width: 310, maxWidth: "85vw", backgroundColor: "#ffffff", borderTop: `4px solid ${bgcolor}`}}>
                    <div className="p-3">
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <div className="d-flex align-items-center gap-2 overflow-hidden">
                          <span className="rounded-circle flex-shrink-0" style={{width: 10, height: 10, backgroundColor: bgcolor}}/>
                          <h6 className="fw-bold mb-0 text-truncate">{list.listName}</h6>
                          <Badge bg="light" text="dark" className="border rounded-pill">{tasks.length}</Badge>
                        </div>
                        <div className="position-relative flex-shrink-0">
                          <Button variant="light" size="sm" className="border-0 rounded-3" onClick={() => setListMenuVisibility((prev) => ({...prev, [list._id]: !prev[list._id]}))} aria-label={`Options for ${list.listName}`}>
                            <MdMoreHoriz size={21} />
                          </Button>
                          {listMenuVisibility[list._id] && (
                            <div className="position-absolute bg-white border rounded-3 shadow p-2" style={{top: "100%", right: 0, width: 170, zIndex: 100}}>
                              <Button variant="light" className="w-100 text-start text-danger" onClick={() => deleteList(list._id)}>
                                <MdDelete size={18} className="me-2"/>Delete list
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="d-flex justify-content-between mb-1">
                          <small className="text-secondary">Progress</small>
                          <small className="text-secondary">{tasks.length ? Math.round((completed / tasks.length) * 100): 0}%</small>
                        </div>
                        <div className="rounded-pill overflow-hidden" style={{height: 5, backgroundColor: "#edf0f5"}}>
                          <div className="rounded-pill" style={{width: `${tasks.length ? (completed / tasks.length) * 100 : 0}%`, height: "100%", backgroundColor: bgcolor, transition: "width 0.2s ease"}}/>
                        </div>
                      </div>
                    </div>
                    <Droppable droppableId={list._id}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="px-2 pb-2 rounded-3" style={{minHeight: 90, backgroundColor: snapshot.isDraggingOver ? "#eef2ff" : "#f8fafc", transition: "background-color 0.2s ease"}}>
                          {tasks.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                              {(dragProvided, dragSnapshot) => (
                                <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="bg-white border rounded-3 p-3 mb-2" style={{...dragProvided.draggableProps.style, borderColor: dragSnapshot.isDragging ? bgcolor : "#e6eaf0", boxShadow: dragSnapshot.isDragging ? "0 8px 24px rgba(15,23,42,0.12)" : "0 1px 3px rgba(15,23,42,0.04)", opacity: task.isComplete ? 0.8 : 1}}>
                                  <div className="d-flex align-items-start gap-2">
                                    <button type="button" {...dragProvided.dragHandleProps} className="border-0 bg-transparent text-secondary p-0 mt-1" style={{cursor: dragSnapshot.isDragging ? "grabbing" : "grab", touchAction: "none"}} aria-label="Drag task" onClick={(e) => e.stopPropagation()}>
                                      <MdOutlineDragIndicator size={19} />
                                    </button>
                                    <div className="flex-grow-1 overflow-hidden">
                                      <div className="d-flex align-items-start gap-2">
                                        <span className="mt-1" style={{color: task.isComplete ? "#16a34a" : "#94a3b8"}}>
                                          {task.isComplete ? (<FaCheck size={13} />) : (<FaRegCircle size={13} />)}
                                        </span>
                                        <div className="flex-grow-1">
                                          <p className="mb-0" style={{fontSize: 14, lineHeight: 1.5, overflowWrap: "anywhere", color: task.isComplete ? "#94a3b8" : "#273449", textDecoration: task.isComplete ? "line-through" : "none"}}>
                                            {task.taskName}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="position-relative flex-shrink-0">
                                      <Button variant="light" size="sm" className="border-0 p-1 rounded-2" onClick={() =>setTaskMenuVisibility((prev) => ({...prev, [task._id]: !prev[task._id]}))} aria-label="Task options">
                                        <MdMoreHoriz size={19} />
                                      </Button>
                                      {taskMenuVisibility[task._id] && (
                                        <div className="position-absolute bg-white border rounded-3 shadow p-2" style={{width: 190, top: "100%", right: 0, zIndex: 110}}>
                                          <div className="small text-secondary px-2 py-1 text-truncate">
                                            {task.taskName}
                                          </div>
                                          <Button variant="light" size="sm" className="w-100 text-start" onClick={() => completeTask(task._id, task.listId || list._id, task.isComplete)}>
                                            <FaCheck className="me-2 text-success"/>{task.isComplete ? "Mark as pending" : "Mark as complete"}
                                          </Button>
                                          <Button variant="light" size="sm" className="w-100 text-start text-danger" onClick={() =>deleteTask(task._id, task.listId || list._id)}>
                                            <MdDelete className="me-2" size={17}/>Delete task
                                          </Button>
                                          <div className="border-top mt-2 pt-2 px-2">
                                            <small className="text-secondary"><FaRegClock className="me-1" />Due dates coming soon</small>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                                    <Badge bg={task.isComplete ? "success" : "light"} text={task.isComplete ? "white" : "dark"} className="fw-medium">
                                      {task.isComplete ? "Completed" : "In progress"}
                                    </Badge>
                                    <Button variant={task.isComplete ? "light" : "outline-success"} size="sm" className="rounded-2 py-1 px-2" onClick={() => completeTask(task._id, task.listId || list._id, task.isComplete)} title={task.isComplete ? "Mark as pending" : "Complete task"}>
                                      <FaCheck size={12} />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                          {tasks.length === 0 && (
                            <div className="text-center text-secondary py-4">
                              <FaTasks size={23} style={{ opacity: 0.4 }}/>
                              <p className="small mt-2 mb-0">No tasks yet</p>
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>

                    {/* Add Task */}
                    <div className="p-2">
                      <Form onSubmit={(e) => handleAddTask(e, list._id)}>
                        <div className="d-flex align-items-center gap-2">
                          <Form.Control type="text" size="sm" value={taskInputs[list._id] || ""} placeholder="Add a task..." className="border-0 bg-light rounded-3" aria-label={`Add task to ${list.listName}`} onChange={(e) =>setTaskInputs((prev) => ({...prev, [list._id]: e.target.value}))}/>
                          <Button type="submit" variant="light" className="border rounded-3 flex-shrink-0" style={{color: bgcolor, width: 34, height: 34, padding: 0,}} aria-label="Add task"><FaPlus size={12} /></Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                );
              })}

              {/* Add List */}
              <div className="flex-shrink-0 rounded-4 p-3" style={{width: 290, maxWidth: "85vw", backgroundColor: newListInput ? "#ffffff" : "#e9edf5", border: newListInput ? "1px solid #e1e6ef" : "1px dashed #c4ccda", transition: "background-color 0.2s ease"}}>
                {newListInput ? (
                  <Form onSubmit={handleAddList}>
                    <Form.Label className="fw-semibold">Create a new list</Form.Label>
                    <Form.Control autoFocus type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)} placeholder="e.g. In progress" className="rounded-3 mb-3" maxLength={100}/>
                    <div className="d-flex gap-2">
                      <Button type="submit" className="rounded-3 border-0" style={{ backgroundColor: bgcolor }}><FaPlus className="me-2" size={12} /> Create list</Button>
                      <Button type="button" variant="light" className="rounded-3 border"onClick={() => {setNewListInput(false);setNewListName("")}}>Cancel</Button>
                    </div>
                  </Form>
                ) : (
                  <Button variant="light" className="w-100 border-0 bg-transparent text-start d-flex align-items-center gap-2 py-2 fw-semibold" onClick={() => setNewListInput(true)}><FaPlus style={{ color: bgcolor }} /> Add another list </Button>
                )}
              </div>
            </div>
          </DragDropContext>
        )}
      </Container>
    </div>
  );
};
  
export default ManageBoard;