export type Id = string | number

export type Column = {

    column_id: Id;
    column_name: string;
    position: number;
    board_id: Id
} 

export type Task = {
    task_id: Id;
    body: string;
    position: number;
    column_id: Id;
    colour: string;
    board_id:Id
}