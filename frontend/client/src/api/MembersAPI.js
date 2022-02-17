import {useState, useEffect} from 'react'
import axios from 'axios'

//Members API
function MembersAPI() {
    const [members, setMembers] = useState([])
    const [callback, setCallback] = useState(false)
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getMembers = async () => {
            const res = await axios.get(`/api/members?limit=${page*9}&${sort}&title[regex]=${search}`)
            setMembers(res.data.members)
            setResult(res.data.result)
        }
        getMembers()
    },[callback,  sort, search, page])
    
    return {
        members: [members, setMembers],
        callback: [callback, setCallback],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default MembersAPI
