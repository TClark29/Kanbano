import './teamTab.css'

function TeamTab(props){

    const team = props.team
    const selectedTeamId = props.selectedTeamId
    const setSelectedTeamId = props.setSelectedTeamId

    function selectTeam(e){
        e.preventDefault()
        e.stopPropagation()
        setSelectedTeamId(team.team_id)
        console.log(`selected ${team.team_name}`)

    }

    return (
        <div className='team-tab' onClick={(e)=>selectTeam(e)}>
            {team.team_name}
        </div>
    )


}

export default TeamTab