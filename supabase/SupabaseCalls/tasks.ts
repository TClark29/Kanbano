import supabase from '../supabase'


function getTasks(board_id:any){

    return supabase
    .from('tasks')
    .select('task_id, column_id, body, colour, position, board_id')
    .eq('board_id', board_id)
    .then((response)=>{
        return response
    })
}

function updateTasks(tasksArray:any){
    return supabase
    .from('tasks')
    .upsert(tasksArray)
    .select()
    .then((response)=>{
        if (response.error){
            console.log(response.error)
        }
        return response
    })

}

function submitNewTask(newTask:any){
    return supabase 
    .from('tasks')
    .insert(newTask)
    .select('task_id, column_id, body, colour, board_id, position')
    .then((response)=>{
        return response
    })

}

export { getTasks, updateTasks, submitNewTask }