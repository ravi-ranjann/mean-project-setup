import { useGetNotesQuery } from "./notesApiSlice"
import Note from './Note';
import PulseLoader from 'react-spinners/PulseLoader'

const NotesList = () => {

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery();

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = notes

        // let filteredIds
        // if (isManager || isAdmin) {
        //     filteredIds = [...ids]
        // } else {
        //     filteredIds = ids.filter(noteId => entities[noteId].username === username)
        // }

        const tableContent = ids?.length ? ids.map(noteId => <Note key={noteId} noteId={noteId} />) : null;


        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Username</th>
                        <th scope="col" className="table__th note__created">Created</th>
                        <th scope="col" className="table__th note__updated">Updated</th>
                        <th scope="col" className="table__th note__title">Title</th>
                        <th scope="col" className="table__th note__username">Owner</th>
                        <th scope="col" className="table__th note__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}

export default NotesList;