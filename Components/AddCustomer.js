import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../config'
import axios from 'axios'
export default function AddCustomer(props) {
    const update = props.update
    const setupdate = props.setupdate
    const navigate = useNavigate()
    const [id, setid] = useState("")
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [phonenumber, setphonenumber] = useState("")
    useEffect(() => {
        console.log(props.details)
        const { id, firstname, lastname, email, phonenumber } = { ...props.details }
        setfname(firstname)
        setlname(lastname)
        setemail(email)
        setphonenumber(phonenumber)
        setid(id)
    }, [])
    const submit = (e) => {
        e.preventDefault()
        if (update) {
            axios.put(`${api.customer}/${id}`, { firstname: fname, lastname: lname, email: email, phonenumber: phonenumber }).then(async (data) => {
                console.log(data)
                await props.getCustomers(update)
            })

        }
        else {
            axios.post(`${api.customer}`, { firstname: fname, lastname: lname, email: email, phonenumber: phonenumber }).then(data => {
                console.log(data)
                navigate("/")

            })
        }
    }

    return (
        <div className='container'>
            <div className='row d-flex justify-content-center'>
                <form onSubmit={submit} className={update?"col-12 mt-5":'col-8 mt-5'}>
                    <h1>Add Customer Details</h1>
                    <div className='row mt-5'>
                        <div className="mb-3 col-6">
                            <label for="name" className="form-label">First Name</label>
                            <input required type="text" value={fname} onChange={e => setfname(e.target.value)} className="form-control border-secondary border-2" id="name" placeholder="first name" />
                        </div>
                        <div className="mb-3 col-6">
                            <label for="lastname" className="form-label">Last Name</label>
                            <input required type="text" value={lname} onChange={e => setlname(e.target.value)} className="form-control border-secondary border-2" id="lastname" placeholder="last name" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input required type="email" value={email} onChange={e => setemail(e.target.value)} className="form-control border-secondary border-2" id="email" placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                        <label for="phonenumber" className="form-label">Contact Number</label>
                        <input required type="number" value={phonenumber} onChange={e => setphonenumber(e.target.value)} className="form-control border-secondary border-2" id="phonenumber" placeholder="mobile number" />
                    </div>
                    <div className="mb-5 mt-5 d-flex justify-content-center">
                        <button className="btn btn-primary fw-bold" type="submit">Submit</button>
                        {
                            update ?
                                <button className="btn btn-danger fw-bold ms-2" onClick={e=>setupdate(false)}>Close</button>
                            :
                            null
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}
