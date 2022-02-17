import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    member_id: '',
    title: '',
    address: '',
    country: '',
    //date: '',
    _id: ''
}

function CreateMember() {
    const state = useContext(GlobalState)
    const [member, setMember] = useState(initialState)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [members] = state.membersAPI.members
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.membersAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            members.forEach(member => {
                if(member._id === param.id) {
                    setMember(member)
                   
                }
            })
        }else{
            setOnEdit(false)
            setMember(initialState)
            
        }
    }, [param.id, members])


    const handleChangeInput = e =>{
        const {name, value} = e.target
        setMember({...member, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            
            if(onEdit){
                await axios.put(`/api/members/${member._id}`, {...member}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/members', {...member}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/member")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

   
    return (
        <div className="create_member">
            

            <form onSubmit={handleSubmit} id="creatememberform">

                <h2 style={{'textAlign':'center'}}>Member Management System</h2><br />

                {/* input for member id */}
                <div className="row">
                    <label htmlFor="member_id">Member ID</label>
                    <input type="text" name="member_id" id="member_id" required
                    value={member.member_id} onChange={handleChangeInput} disabled={onEdit} placeholder="Member ID"/>
                </div>

                {/* input for member title */}
                <div className="row">
                    <label htmlFor="title">Name</label>
                    <input type="text" name="title" id="title" required
                    value={member.title} onChange={handleChangeInput} placeholder="Name"/>
                </div>

                {/* input for member address */}
                <div className="row">
                    <label htmlFor="address">Address</label>
                    <textarea type="text" name="address" id="address" required
                    value={member.address} rows="5" onChange={handleChangeInput} style={{borderColor: "rgb(212, 212, 219)"}} />
                </div>

               

                <div className="row">
                    <label htmlFor="country">Country </label>
                    <select  name="country" id="countrydwn" required  required value={member.country} onChange={handleChangeInput} >
                    <option>Select Country</option>
                        <option value="Australia">Australia</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Canada">Canada</option>
                        <option value="Denmark">Denmark</option>
                    </select>
                    
                </div>
                
                {/* <div className="row">
                    <label htmlFor="date">Date </label>
                    <input type="text" name="date" id="date" required
                    value={member.date} onChange={handleChangeInput} placeholder="date"/>
                </div> */}


                {/* buttons */}
                <button type="submit" id="btncreate">{onEdit? "Update" : "Create"}</button>
               
                
            </form>
        </div>
    )
}

export default CreateMember
