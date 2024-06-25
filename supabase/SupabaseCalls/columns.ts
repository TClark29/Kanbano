import supabase from "../supabase";


function addColumn(position:number, column_name:string, board_id:string|number){

    return supabase
    .from('columns')
    .insert({position:position, column_name:column_name, board_id:board_id})
    .then((response)=>{
        console.log(response)
        return response
    })
}

function getColumns(board_id: string | number){
    console.log(board_id)
    return supabase
    .from('columns')
    .select('column_id, position, board_id, column_name')
    .eq('board_id', board_id)
    .then((response)=>{
        return response
    })
}

function updateColumnPositions(updateArray:any){
    console.log(updateArray)
    return supabase
    .from('columns')
    .upsert(updateArray)
    .select()
    .then((response)=>{
        return response
    })



}

export {addColumn, getColumns, updateColumnPositions}