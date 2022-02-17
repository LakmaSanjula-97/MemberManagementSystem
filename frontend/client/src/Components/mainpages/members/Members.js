import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'

import axios from 'axios'

import BtnRender from '../utils/memberItem/BtnRender'

//members - handling delete all and select all
function Members() {
    const state = useContext(GlobalState)
    const [members, setMembers] = state.membersAPI.members
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.membersAPI.callback
    const [isCheck, setIsCheck] = useState(false)


   

    const deleteMember = async(id, public_id) => {
        try {
        
            
            const deleteMember = axios.delete(`/api/members/${id}`, {
                headers: {Authorization: token}
            })

            await deleteMember
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        
       

        <div className="">



                <table id = "table1">
                <thead>
                    <tr>
                        <th style={{'textAlign':'center'}}>Name</th>
                        <th style={{'textAlign':'center'}}>Address</th>
                        <th style={{'textAlign':'center'}}>country</th>
                        <th style={{'textAlign':'center'}}>Registered Date</th>
                        <th></th>
                       
                    </tr>
                </thead>
                <tbody>

                {
                members.map(member => {
                    return  <tr>
                   
                    <td>{member.title}</td>
                    <td>{member.address}</td>
                    <td>{member.country}</td>
                    <td>{member.createdAt}</td>
                    
                    <td style={{'textAlign':'center'}}>
                        <BtnRender member={member} deleteMember={deleteMember} />
                    </td>
                    
                    </tr>
                })
            } 
                                       
                    
                </tbody>
            </table>

            
        </div>
       
    )
}

export default Members
