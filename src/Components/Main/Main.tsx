import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import TeamBar from "./TeamBar/teamBar";
import BoardBar from "./BoardBar/boardBar";
import {getTeams} from '../../../supabase/SupabaseCalls/teams'
import {getBoards} from '../../../supabase/SupabaseCalls/boards'
import './Main.css'

function Main() {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  

  const [selectedTeamId, setSelectedTeamId] = useState<string|null|undefined>(null)
  
  const [teams, setTeams] = useState([])
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState<boolean>(true)

 

  useEffect(() => {
    setLoading(true)
    if (!user) {
      
      return navigate("/login");
    }
    
    getTeams(user?.id)
    .then((response)=>{
      const tempTeams = []
  
      response.data?.forEach((team)=>{
        const tempTeam = {team_id: team.team_id, is_admin:team.is_admin, team_name: team.teams.team_name}
        tempTeams.push(tempTeam)

      })
      
      setTeams(tempTeams)
      
    })
    .then(()=>{
      if (selectedTeamId){
        getBoards(selectedTeamId)
        .then((response)=>{
        
          setBoards(response.data)
          
        })
      }

    })
  
    setLoading(false)


  }, [user, selectedTeamId]);

  

  if (loading){
    return (
      <div>Loading...</div>
    )
  }

  return <div><h1>Main</h1>
  <div className='bar-container'>
  <TeamBar selectedTeamId={selectedTeamId} setSelectedTeamId={setSelectedTeamId} teams={teams} setTeams={setTeams}></TeamBar>
  {selectedTeamId&&<BoardBar boards={boards} setBoards={setBoards} selectedTeamId={selectedTeamId} ></BoardBar>}
  </div>
  
  </div>;
}

export default Main;
