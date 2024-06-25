import supabase from '../supabase'

async function addTeam(teamName, userId, isAdmin){

    const {data:data1, error:error1} = await supabase
    .from('teams')
    .insert({team_name:teamName})
    .select()

    const {data:data2, error:error2} = await supabase
    .from('teams_users')
    .insert({team_id:data1[0].team_id, user_id:userId, is_admin:isAdmin})
    .select()

    return [data1, error1, data2, error2]

}





function getTeams(userId){
  
    return supabase
    .from('teams_users')
    .select('team_id, is_admin, teams(team_name)')
    .eq('user_id', userId)
    .then((response)=>{
        
        return response
    })
}

export {addTeam, getTeams}