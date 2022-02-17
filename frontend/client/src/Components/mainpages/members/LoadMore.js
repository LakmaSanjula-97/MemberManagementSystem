import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

//load more component
function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.membersAPI.page
    const [result] = state.membersAPI.result

    return (
        <div className="load_more">
            {
                result < page * 9 ? ""
                : <button onClick={() => setPage(page+1)}>Load more</button>
            }
        </div>
    )
}

export default LoadMore