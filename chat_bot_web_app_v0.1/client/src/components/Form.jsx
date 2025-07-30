import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCES_TOKEN,REFRESH_TOKEN } from "../constants";



function Form({route,method}){
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[loading,setLoading] = useState(false);
    
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) =>{
        setLoading(true);
        console.log(loading);
        e.preventDefault();

        try{
            const res = await api.post(route,{username,password})
            if(method == "login"){
                localStorage.setItem(ACCES_TOKEN,res.data.access);
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
                navigate("/");
            }else{
                navigate("/login");
            }

        }catch(error){
            alert(error);
        }finally{
            setLoading(false);
        }
    }



    return (
        <div className="containter" >
            <form onSubmit={handleSubmit} className="card shadow-lg p-4 form-generic">
                <h4 className="form-title">{name}</h4>
                <br />
                <div className="mb-3">
                    {/* <label htmlFor="input1" className="form-label">Username</label> */}
                    <input type="text" id="input1" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>
                </div>
                <div className="mb-3">
                    {/* <label htmlFor="input2" className="form-label">Password</label> */}
                    <input type="password" id="input2" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                    
                </div>
                <br />
                <button className="btn btn-primary"  type="submit">{name}</button>
            </form>
        </div>
    );
}


export default Form;