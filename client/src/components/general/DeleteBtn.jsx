import axios from "axios"

const DeleteBtn = ({docModel,docId,event,title}) => {
    const deleteDocument = () => {
        axios.delete(`http://localhost:8000/api/${docModel}/${docId}`)
            .then(()=>event())
            .catch(err=>console.log(err))
    }

    return (
        <button className="btn btn-danger btn-sm" style={{marginLeft:"5vw"}} onClick={deleteDocument}>{title}</button>
    )
}

export default DeleteBtn