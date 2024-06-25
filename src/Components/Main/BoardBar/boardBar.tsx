import { useState } from "react"
import BoardTab from "./BoardTab/boardTab"
import { addBoard } from "../../../../supabase/SupabaseCalls/boards"
import './boardBar.css'


function BoardBar(props:any){
    const setBoards = props.setBoards
    const boards = props.boards
    const selectedTeamId = props.selectedTeamId
    const [addBoardModal, setAddBoardModal] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    function toggleBoardModal(e){
        e.preventDefault()
        setAddBoardModal(true)
    }

    return (
        <div className="board-wrapper">
            <button className="add-board" onClick={(e)=>{toggleBoardModal(e)}}>Add New Board</button>
            <div className="board-select">
                {boards.map((board:any)=>{
                    return (
                    <BoardTab key={board.board_id} board={board}></BoardTab>
                    )
                })}
            </div>
            
            {addBoardModal && <AddBoardModal setAddBoardModal={setAddBoardModal}></AddBoardModal>}
        </div>
    )

    function AddBoardModal(props:any){
        const setAddBoardModal = props.setAddBoardModal

        const [boardName, setBoardName] = useState<string>('')
        const [isPublic, setIsPublic] = useState(false)


        function boardNameHandler(e:any){
            e.preventDefault()
            setBoardName(e.target.value)
        }

        function publicCheckHandler(){
     
            setIsPublic(!isPublic)
            
        }

        function closeModal(e:any){
            e.preventDefault()
            setAddBoardModal(false)
        }

        function createNewBoard(e){

            setLoading(true)
            setErrors({})

            const tempErrors = {}

            e.preventDefault()
            e.stopPropagation()

            if (boardName.length===0){
                tempErrors.boardName='A name is required'
            }

            setErrors(tempErrors)

            if (Object.keys(tempErrors).length===0){
                addBoard(boardName, selectedTeamId, isPublic)
                setLoading(false)
                setAddBoardModal(false)
            }

            setLoading(false)



            


        }

        return (
            <div>
                <form onSubmit={(e=>createNewBoard(e))}>
                <div>
                    <label>Board Name</label>
                    <input value={boardName} onChange={(e)=>boardNameHandler(e)}></input>
                </div>
                <div>
                    <label>
                         Make board public?
                        <input checked={isPublic} onChange={()=>publicCheckHandler()}type='checkbox'></input>
                       
                    </label>
                </div>
                <button onClick={(e)=>createNewBoard(e)}>Create Board</button>
                
                </form>
                <button onClick={(e)=>closeModal(e)}>Close</button>
            </div>
        )
    }
}

export default BoardBar