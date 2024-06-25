import supabase from '../supabase'


function getBoards(team_id){

    return supabase
    .from('boards')
    .select()
    .eq('team_id', team_id)
    .then((response)=>{
        return response
    })
}

function addBoard(boardName, teamId, isPublic){
    return supabase
    .from('boards')
    .insert({board_name:boardName, team_id:teamId, public:isPublic})
    .select()
    .then((response=>{
        
        return response
    }))
}

export {getBoards, addBoard}