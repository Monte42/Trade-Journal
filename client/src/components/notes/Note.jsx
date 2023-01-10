import DeleteBtn from "../general/DeleteBtn"
import axios from "axios"

const Note = ({index,note,getNotes}) => {

    return (
        <article className='thought'>
            <p>{index+1}). {note.content}</p>
            <span className='ps-5'>{new Date(note.created_at).toDateString()}</span>
            <DeleteBtn 
                docModel={'notes'}
                docId={note.id}
                event={getNotes}
                title={'x'}
                leftMargin={'20%'}
            />
        </article>
    )
}

export default Note