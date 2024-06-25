import './TaskCard.css'
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'


function TaskCard(props:any){

    const {task} = props

    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: task?.task_id,
        data: {
            type:'Task',
            task,
        }
    })

    const style = {
        transition, 
        transform: CSS.Transform.toString(transform)

    }

    if (isDragging){
        return (
            <div className='task-dragging'></div>
        )
    }


    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="task">
            <p>{task.body}</p>
        </div>
    )
}

export default TaskCard