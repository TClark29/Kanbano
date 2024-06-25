import './boardTab.css'
import { useNavigate } from "react-router-dom"

function BoardTab(props){

    const navigate = useNavigate()

    const board = props.board

    function selectBoard(e){
        e.preventDefault()
        e.stopPropagation()
        console.log(board.board_id)
        navigate(`/board/${board.board_id}`)

    }

    return (
        <div className="board-tab" onClick={(e)=>selectBoard(e)}>
            <div>{board.board_name}</div>
        </div>
    )
}

export default BoardTab