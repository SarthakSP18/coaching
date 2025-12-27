import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";

const AdminReg = () => {
        const navigate = useNavigate();
    
    const [data,setdata] = useState({fullname:"",email:"",password:""});

    async function handleForm(e){
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/adminregister",data);
            alert("Admin Register Successful !!");
            console.log(data);
            setdata({fullname:"",email:"",password:""});
            navigate("/adminlogin")
        } catch (error) {
            alert("Register failed")
            console.log(error);
            
        }
    }
    function handleChange(e){
        setdata({...data,[e.target.name]:e.target.value})
    }

  return (
    <div>
      
        <form action="" onSubmit={handleForm}>
            <h2>Admin Register Form</h2>
            <input type="text" name='fullname'  value={data.fullname} placeholder='Enter your Name' onChange={handleChange} required/><br /><br />
            <input type="email" name='email'  value={data.email} placeholder='Enter EmailID ' onChange={handleChange} required/><br /><br />
            <input type="password" name='password'  value={data.password} placeholder='Enter Password ' onChange={handleChange} required/><br /><br />
            <button>Submit</button>

        </form>

    </div>
  )
}

export default AdminReg;
