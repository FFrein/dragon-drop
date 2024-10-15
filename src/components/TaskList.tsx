import { useEffect, useState } from "react";
import { Task } from "./../model/models";

const TaskList: React.FC = () => {
  const [getToDo, setToDo] = useState<Array<Task>>([]);

  const [getSelectedTask, setSelectedTask] = useState<Task>();

  const [getrNewTaskName, setNewTaskName] = useState("");

  const onDragStartHandle = (e: React.DragEvent<HTMLLIElement>, task: Task) => {
    e.target.style.opacity = 0.5;
    setSelectedTask(task);
  };

  const onDragEndHandle = (e: React.DragEvent<HTMLLIElement>) => {
    e.target.style.opacity = 1;
  };

  const onDragOverHandle = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const onDropHandle = (e: React.DragEvent<HTMLLIElement>, task: Task) => {
    e.preventDefault();

    if (getSelectedTask) {
      const buff = getSelectedTask.order;

      getToDo[getSelectedTask.order - 1] = {
        ...getSelectedTask,
        order: task.order,
      };
      getToDo[task.order - 1] = { ...task, order: buff };

      setToDo([...getToDo.sort(sortOrder)]);
    }
  };

  const onClickAddHandler = () => {
    if (getrNewTaskName.trim().length != 0) {
      setToDo([
        ...getToDo,
        {
          id: getToDo.length + 1,
          order: getToDo.length + 1,
          text: getrNewTaskName,
          finished: false,
        },
      ]);
    }
  };

  const onClickTaskHandler = (e: React.MouseEvent, task: Task) => {
    if (task) {
      setToDo(
        [
          ...getToDo.slice(0, task.order - 1),
          ...getToDo.slice(task.order, getToDo.length),
          { ...task, finished: !task.finished },
        ].sort(sortOrder)
      );
    }
  };

  const sortOrder = (a: Task, b: Task) => {
    return a.order >= b.order ? 1 : -1;
  };

  useEffect(() => {
    const tasks: Array<Task> = [
      {
        id: 1,
        order: 1,
        text: "Text 1",
        finished: false,
      },
      {
        id: 2,
        order: 2,
        text: "Text 2",
        finished: false,
      },
      {
        id: 3,
        order: 3,
        text: "Text 3",
        finished: false,
      },
    ];
    setToDo(tasks);
  }, []);

  return (
    <>
      <article>
        <div className="taskList">
          <h2>To Do</h2>
          <div className="inputForm">
            <input
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                setNewTaskName(e.target.value);
              }}
            />
            <button onClick={onClickAddHandler}>Add</button>
          </div>
          <ul>
            {getToDo.map((task) =>
              task.finished ? (
                ""
              ) : (
                <li
                  onDragStart={(e) => {
                    onDragStartHandle(e, task);
                  }}
                  onDragEnd={onDragEndHandle}
                  onDragOver={onDragOverHandle}
                  onDrop={(e) => {
                    onDropHandle(e, task);
                  }}
                  className="card"
                  draggable="true"
                  onClick={(e) => {
                    onClickTaskHandler(e, task);
                  }}
                  key={task.id}
                >
                  {task.text}
                </li>
              )
            )}
          </ul>
        </div>
      </article>
    </>
  );
};

export default TaskList;
