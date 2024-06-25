import './AddColumn.css'
import {Column} from '../../../types'
import {addColumn} from '../../../../supabase/SupabaseCalls/columns'
import React, { SetStateAction } from 'react'
import { useParams } from 'react-router-dom'

interface Props {
    columns:Array<Column>,
    setFetchColumn: React.Dispatch<SetStateAction<boolean>>,
    fetchColumn: boolean
        
    

}


function AddColumn(props: Props){

    const board_id = useParams().board_id

    const {columns, setFetchColumn, fetchColumn} = props


    function addNewColumn(){
        
        addColumn(columns.length+1, `Column ${columns.length+1}`, board_id)
        .then(()=>{
            setFetchColumn(!fetchColumn)
        })

    }

    return (
        <div className='add-column'>
            <button onClick={()=>addNewColumn()}>Add Column</button>
        </div>
    )
 }

 export default AddColumn