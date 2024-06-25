import { useState } from "react"
import { addTeam} from "../../../../supabase/SupabaseCalls/teams"
import TeamTab from "./TeamTab/teamTab"
import { useAuth } from "../../../contexts/Auth"
import './teamBar.css'

function TeamBar(props){

    const {user} = useAuth()

    const setTeams = props.setTeams
    const teams = props.teams

    const selectedTeamId=props.selectedTeamId
    const setSelectedTeamId = props.setSelectedTeamId
    const [addTeamModal, setAddTeamModal] = useState<boolean>(false)

    function showModal(e){
        e.preventDefault()
        e.stopPropagation()
        setAddTeamModal(true)
    }

    return (<div className="team-select">
        
        <button className='add-team' onClick={(e)=>showModal(e)}>Add new team</button>
        <div>
            {teams.map((team)=>{
                return (
                    <TeamTab key={team.team_id} team={team} selectedTeamId={selectedTeamId} setSelectedTeamId={setSelectedTeamId}></TeamTab>
                )

            })}
        </div>
        {addTeamModal&& <AddTeamModal user={user} setAddTeamModal={setAddTeamModal} setTeams={setTeams}></AddTeamModal>}
    </div>)



}

function AddTeamModal(props){
    const setAddTeamModal = props.setAddTeamModal
    const setTeams = props.setTeams
    const user = props.user
   

    const [teamName, setTeamName] = useState<string>('')
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState<boolean>(false)

    function teamNameHandler(e){
        e.preventDefault()
        setTeamName(e.target.value)
    }

    function submitNewTeam(e){
        setLoading(true)
        setErrors({})
        const tempErrors = {}

        e.preventDefault()

        if (teamName.length<1){
            tempErrors.teamName = 'A name is required'

        }
        setErrors(tempErrors)

        if (Object.keys(tempErrors).length===0){


            
          addTeam(teamName, user.id, true)
        
            setLoading(false)

            setAddTeamModal(false)

        }
        setLoading(false)
    }



    return (
        <div className="team-bar">
            <form>
                <div>
                    <label>Team Name</label>
                    <input value={teamName} onChange={(e)=>teamNameHandler(e)}></input>
                    <p>{errors.teamName}</p>

                </div>
                <div>
                    <button onClick={(e)=>submitNewTeam(e)}>Create new Team</button>
                </div>
            </form>

            <button onClick={()=>setAddTeamModal(false)}>Close</button>
        </div>
    )
}

export default TeamBar