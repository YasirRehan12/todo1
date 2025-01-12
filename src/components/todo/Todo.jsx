import React, { useEffect, useState } from 'react'
import "./todo.css"
import TodoCard from './TodoCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Update from './Update';
import axios from 'axios';

let id = sessionStorage.getItem("id")
// console.log("id = ", id);
let toBeUpdateArray=[]


const Todo = () => {
    const [Inputs, setInputs] = useState({
        title: "",
        body: ""
    })
    // console.log("inputs",Inputs);
    const [Array, setArray] = useState([])


    const show = () => {
        document.getElementById("textarea").style.display = "block";
    };
    const change = (e) => {


        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value })
        // [name]: value => new value deta hay phely wale value ko delete kiya beghair
        // ...Inputs => is ka matlab ya k jo bhe useState me property hen (like; title our body) woh deta hay our sath update value bhe


    };
    const submit = async () => {        // For button
        if (Inputs.title === "" && Inputs.body === "") {
            toast.error("Title or Body Should Not Be Empty")


        }
        else {
            if (id) {
                console.log("idddddd", id);

                await axios.post("http://localhost:8000/api/v2/addTask", {
                    title: Inputs.title,
                    body: Inputs.body,
                    id: id,
                }).then((response) => {
                    console.log(response);

                })
                setArray([...Array, Inputs])
                setInputs({ title: "", body: "" })
                toast.success("Your Task is Added")


            }
            else {
                setArray([...Array, Inputs])
                setInputs({ title: "", body: "" })
                toast.success("Your Task is Added")
                toast.error("Your Task is Not Saved ! Please SignUp")

            }

        }


    }
    // console.log(Inputs);
    // console.log(Array);
    const del = async (Cardid) => {
        if (id) {
            await axios.delete(`http://localhost:8000/api/v2/deleteTask/${Cardid}`, { data: { id: id } })
                .then(() => {
                    toast.success("Your Task is Deleted")


                })
        }
        else{
            toast.error("Please SingUp first")
        }

        // console.log( "Delete",id);
        // Array.splice(id, "1")
        // setArray([...Array])


    }
    const dis = (value) => {
        console.log(value);
        document.getElementById("todo-update").style.display = value


    }
    const update=(value)=>{
        toBeUpdateArray=(Array[value]);
        
    }
    useEffect(() => {
        if(id){
            const fetch = async () => {
                await axios.get(`http://localhost:8000/api/v2/getTask/${id}`)
                    .then((response) => {
                        setArray(response.data.list);
    
    
                    })
            }
            fetch()

        }
       
       
    }, [submit])


    return (
        <><div className='todo'>
            <ToastContainer />
            <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                <div className='d-flex flex-column todo-inputs-div w-100 p-1'>
                    <input
                        type="text"
                        placeholder='Title'
                        className='my-2 p-2 todo-inputs'
                        onClick={show}
                        name='title'
                        value={Inputs.title}
                        onChange={change} />

                    <textarea
                        id="textarea"
                        type="text"
                        placeholder='Body'
                        className='p-2 todo-inputs'
                        name='body'
                        onChange={change}
                        value={Inputs.body} />

                </div>
                <div className='w-lg-50 w-100 d-flex justify-content-end my-3 '>

                    <button className='home-btn py-1 px-2' onClick={submit}>Add</button>
                </div>

            </div>
            <div className="todo-body">
                <div className="container-fluid">
                    <div className="row">

                        {Array && Array.map((item, index) => (
                            <div className='col-lg-3 col-11  mx-lg-5 mx-3 my-2' key={index}>
                                <TodoCard
                                    title={item.title}
                                    body={item.body}
                                    id={item._id}
                                    delid={del}
                                    display={dis}
                                    updateId={index}
                                    toBeUpdate={update}
                                    />
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div><div className="todo-update" id='todo-update'>
                <div className="container update">
                    <Update display={dis} update={toBeUpdateArray} />
                </div></div></>
    )
}

export default Todo