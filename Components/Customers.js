import React, { useState, useEffect } from 'react'
import axios from 'axios'
import api from '../config'
import AddCustomer from './AddCustomer'
export default function Customers(props) {
    const [customers, setcustomers] = useState([])
    const [currentCustomer, setcurrentCustomer] = useState(undefined)
    const [update, setupdate] = useState(false)
    const getCustomers = async (check) => {
        await setcustomers(undefined)
        await axios.get(api.customer).then(async (data) => {
            // console.log("data data", data.data)
            setcustomers(data.data)
            await data.data.map(cust => {
                if (currentCustomer.id === cust.id) {
                    setcurrentCustomer(cust)
                }
            })
            if (check) {
                setupdate(false)
            }

        })
    }

    const deleteCustomer = () => {
        axios.delete(`${api.customer}/${currentCustomer.id}`).then(data => {
            setcurrentCustomer(undefined)
            setupdate(false)
            getCustomers()
        })
    }

    useEffect(() => {
        getCustomers()
    }, [])
    return (
        <div className='d-flex justify-content-center  col-12' style={{ height: "80%" }}>
            <div className=' col-6 ' style={{ minheight: "100%" }}>
                <div className='mt-3 mb-3' style={{ marginLeft: "20px", padding: "0px 20px" }}>
                    <h2 >Customers</h2>
                </div>
                <div className='d-flex justify-content-center col-12 mt-5' style={{ width: "100%",height:'90%' ,overflowY:"auto"}}>

                    <table className="table text-center" style={{ width: '60%' }}>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers === undefined ?
                                    <tr>
                                        <td colSpan={3}>
                                            Loading Customer data...
                                        </td>
                                    </tr>
                                    :
                                    customers.map(item => (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.firstname}</td>
                                            <td>{item.lastname}</td>
                                            <td>
                                                <button className="btn btn-outline-primary" onClick={e => {
                                                    setcurrentCustomer(item)
                                                }}>View Details</button>
                                            </td>
                                        </tr>))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='col-6 ' style={{ minheight: "100%" ,borderLeft:'2px solid rgb(0,0,0,0.2)'}}>
                <div className='d-flex justify-content-center align-items-center text-center' style={{ height: "100%", width: "100%" }}>

                    {
                        currentCustomer === undefined ?
                            <div className="col-12 text-muted " style={{ fontSize: 25 }}>
                                Click on view details of a customer to explore.
                            </div>
                            :
                            update !== true ?
                                <div className='d-flex justify-content-center flex-column'>
                                    <div className="col-12">
                                        <h2 className='mb-5'>

                                            Customer Details
                                        </h2>
                                    </div>
                                    <div className='d-flex justify-content-center flex-column align-items-center' style={{ width: "100%" }}>

                                        <div className='col-12 d-flex' style={{ gap: 10 }}>
                                            <div className='col-6 d-flex justify-content-start fw-bold' style={{ fontSize: 20 }}>Customer ID</div>:
                                            <div className='col-6'>{currentCustomer.id}</div>
                                        </div>
                                        <div className='col-12 d-flex' style={{ gap: 10 }}>
                                            <div className='col-6 d-flex justify-content-start fw-bold' style={{ fontSize: 20 }}>First name</div>:
                                            <div className='col-6'>{currentCustomer.firstname}</div>
                                        </div>
                                        <div className='col-12 d-flex' style={{ gap: 10 }}>
                                            <div className='col-6 d-flex justify-content-start fw-bold' style={{ fontSize: 20 }}>Last name</div>:
                                            <div className='col-6'>{currentCustomer.lastname}</div>
                                        </div>
                                        <div className='col-12 d-flex' style={{ gap: 10 }}>
                                            <div className='col-6 d-flex justify-content-start fw-bold' style={{ fontSize: 20 }}>Email</div>:
                                            <div className='col-6'>{currentCustomer.email}</div>
                                        </div>
                                        <div className='col-12 d-flex' style={{ gap: 10 }}>
                                            <div className='col-6 d-flex justify-content-start fw-bold' style={{ fontSize: 20 }}>Phone</div>:
                                            <div className='col-6'>{currentCustomer.phonenumber}</div>
                                        </div>

                                        <div className='d-flex justify-content-center align-items-center'>
                                            <button className="btn btn-secondary mt-5" onClick={e => setupdate(true)}>Edit details</button>
                                            <button className="btn btn-danger fw-bold ms-2 mt-5" onClick={e => deleteCustomer()}>Delete Customer</button>

                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='d-flex justify-content-center flex-column'>
                                    <AddCustomer details={currentCustomer} update={update} setupdate={setupdate} getCustomers={getCustomers} />
                                </div>

                    }
                </div>
            </div>
        </div>
    )
}
