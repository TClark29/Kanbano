import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Task } from "../../../types";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "../Task/TaskCard";
import { SetStateAction, useMemo, useState } from "react";
import { submitNewTask } from "../../../../supabase/SupabaseCalls/tasks";
import "./ColumnContainer.css";
import { useParams } from "react-router-dom";

interface ColProps {
  column: Column;
  tasks: Task[];
  allTasks: Task[];
  setTasks: SetStateAction<Task[]>;
}

function ColumnContainer(props: ColProps) {
  const { column, tasks, allTasks, setTasks } = props;
  const board_id = useParams().board_id

  const taskCards = useMemo(() => {
    return tasks.map((task) => task.position);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column?.column_id,
    data: {
      type: "Column",
      column,
    },
  });

  const [showAddTask, setShowAddTask] = useState<boolean>(false);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className="column-dragged"></div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className="column">
      <h3 {...attributes} {...listeners} className="column-header">
        {column?.column_name}
      </h3>
      <div>
        <SortableContext items={taskCards}>
          {tasks.map((task) => {
            return <TaskCard key={task.task_id} task={task} />;
          })}
        </SortableContext>
        {showAddTask === false && (
          <NewTask setShowAddTask={setShowAddTask}></NewTask>
        )}
        {showAddTask && (
          <TaskInput
            columnId={column.column_id}
            setShowAddTask={setShowAddTask}
            allTasks={allTasks}
            setTasks={setTasks}
            board_id={board_id}
          ></TaskInput>
        )}
      </div>
    </div>
  );
}

function NewTask(props: any) {
  const setShowAddTask = props.setShowAddTask;

  return (
    <div className="new-task">
      <button className="new-task-button" onClick={() => setShowAddTask(true)}>
        Add Task
      </button>
    </div>
  );
}

function TaskInput(props: any) {
  const [taskBody, setTaskBody] = useState<string>("");
  const board_id = props.board_id

  function cancelSubmit(e) {
    setTaskBody("");
    e.preventDefault();
    e.stopPropagation();

    setShowAddTask(false);
    return;
  }

  function submitTask(e) {
    console.log(e.relatedTarget.value);
    e.preventDefault();
    e.stopPropagation();

    if (e.relatedTarget.value === "Cancel") {
      setTaskBody("");
      setShowAddTask(false);
      return;
    }

    if (taskBody.replaceAll(" ", "").length === 0) {
      setTaskBody("");
      setShowAddTask(false);
      return;
    }

    setShowAddTask(false);
    let highestPos = 1;
    allTasks.forEach((task: Task) => {
      if (task.position > highestPos) {
        highestPos = task.position;
      }
    });
    const newTask = {
      body: taskBody,
      colour: "white",
      board_id: board_id,
      position: highestPos + 1,
      column_id: columnId,
    };

    submitNewTask(newTask).then((response) => {
      if (response.error) {
        console.log(response);
      }
      const returnedTask = response.data[0];
      setTasks([...allTasks, returnedTask]);
    });
  }

  function handleTaskInput(e) {
    e.preventDefault();
    setTaskBody(e.target.value);
  }

  const setShowAddTask = props.setShowAddTask;
  const allTasks = props.allTasks;
  const columnId = props.columnId;
  const setTasks = props.setTasks;

  return (
    <div className="task-input">
      <form onSubmit={(e) => submitTask(e)}>
        <input
          value={taskBody}
          autoFocus
          onBlur={(e) => submitTask(e)}
          onChange={(e) => handleTaskInput(e)}
        ></input>

        <div>
          <button onClick={(e) => submitTask(e)}>Submit</button>
          <button value="Cancel" onClick={(e) => cancelSubmit(e)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ColumnContainer;
