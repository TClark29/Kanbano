import AddColumn from "./AddColumn/AddColumn";
import { useEffect, useMemo, useState } from "react";
import { Column, Task } from "../../types";
import { useParams } from "react-router-dom";
import {
  getColumns,
  updateColumnPositions,
} from "../../../supabase/SupabaseCalls/columns";
import { getTasks, updateTasks } from "../../../supabase/SupabaseCalls/tasks";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import "./Board.css";

import ColumnContainer from "./ColumnContainer/ColumnContainer";
import TaskCard from "./Task/TaskCard";
import { SortableContext } from "@dnd-kit/sortable";

function Board(props) {
  const selectedBoard = props.selectedBoard
  const [columns, setColumns] = useState<Column[]>([]);
  const [fetchColumn, setFetchColumn] = useState(true);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const boardId = useParams().board_id
  console.log(boardId)
  useEffect(() => {
    
    getColumns(boardId).then((response) => {
      const newColumns = response.data?.toSorted(
        (a, b) => a.position - b.position
      );
      if (response.error===null){
      setColumns(newColumns);
      }
    });
  }, [fetchColumn]);

  useEffect(() => {
    getTasks(boardId).then((response) => {
      setTasks(response.data);
    });
  },[]);

  const columnsId = useMemo(
    () => columns.map((col) => col?.column_id),
    [columns]
  );

  return (
    <div className="board">
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        <SortableContext items={columnsId}>
          <div className="column-wrapper">
            {columns.map((column) => {
              return (
                <ColumnContainer
                  key={column?.column_id}
                  column={column}
                  allTasks={tasks}
                  setTasks={setTasks}
                  tasks={tasks.filter(
                    (task) => task.column_id === column.column_id
                  )}
                />
              );
            })}
          </div>
        </SortableContext>
        <AddColumn
          columns={columns}
          setFetchColumn={setFetchColumn}
          fetchColumn={fetchColumn}
        ></AddColumn>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                allTasks = {tasks}
                setTasks={setTasks}

                tasks={tasks.filter(
                  (tasks) => tasks.column_id === activeColumn.column_id
                )}
              ></ColumnContainer>
            )}
            {activeTask && (<TaskCard task={activeTask}></TaskCard>)}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragOver(event:DragOverEvent){
    const {active, over} = event
  

    if (!over) {
      return;
    }

    const activeId = active.id
    const overId = over.id

    if (activeId === overId){
      return;
    }

    const taskIsActive = active.data.current?.type === 'Task'
    const taskIsOver = over.data.current?.type ==='Task'
    const columnIsOver = over.data.current?.type === 'Column'

    if (taskIsActive && taskIsOver){
      setTasks((tasks)=> {
        const activeIndex = tasks.findIndex((task)=> task.task_id === activeId)
        const overIndex = tasks.findIndex((task)=> task.task_id === overId)

        console.log(arrayMove(tasks, activeIndex, overIndex))

        tasks[activeIndex].column_id = tasks[overIndex].column_id

        const newTasks = arrayMove(tasks, activeIndex, overIndex)

        newTasks.forEach((task, index)=>{
          task.position = index + 1
        })

        return newTasks
      })
    }

    if (taskIsActive && columnIsOver){

      setTasks((tasks)=>{
        const activeIndex = tasks.findIndex((task)=> task.task_id === activeId)
        tasks[activeIndex].column_id = overId

        return arrayMove(tasks, activeIndex, activeIndex)

      })


    }

  }
  

  function onDragEnd(event: DragEndEvent) {

    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event;

    if (!over) {
      return;
    }

   if (active.data.current?.type === 'Column'){

    const activeColId = active.id;
    const overColId = over.id;

    if (activeColId === overColId) {
      return;
    }

    if (activeColId !== overColId) {
      setColumns((columns) => {
        console.log(active.id, over.id)
        const activeColumnId = columns.findIndex(
          (col) => col.column_id === activeColId
        );

        const overColumnId = columns.findIndex(
          (col) => col.column_id === overColId
        );

        
      

        return arrayMove(columns, activeColumnId, overColumnId);
      });

      const activeColumnId = columns.findIndex(
        (col) => col.column_id === activeColId
      );

      const overColumnId = columns.findIndex(
        (col) => col.column_id === overColId
      );

      const tempColumns = arrayMove(
        columns,
        activeColumnId,
        overColumnId
      );
      tempColumns.forEach((col, index) => {
        col.position = index + 1;
      });

      updateColumnPositions(tempColumns).then((response) => {
        if (response.data){
          return;
        }
      });
    }
 
  }

  if (active.data.current?.type === 'Task'){
    console.log(active.data.current?.task, tasks)

    if (active.id === over.id){
      return;
    }
    console.log(tasks)
    updateTasks(tasks)
    .then((response)=>{
      if (response.data) return
    })



  }
     setActiveColumn(null)
    setActiveTask(null)
   }

   

    
}

export default Board;
