import { useState } from "react";
import api from "../api";

function Settings(){


    const Route ="ngrok";
    const [url,setUrl] = useState("");
    const [loading,setLoading] = useState(false);



    const sendUrl = async () =>{
        console.log("Sending ngrok url...");
        setLoading(true);

        try{
            const res = await api.post(Route,{"URL" : url});
            console.log(res);
        }
        catch(err){
            console.log(err);
        }
    }   


    return(
         <form className="message-form" onSubmit={sendUrl}>
                <input
                type="text"
                className="form-control"
                placeholder="Type your NGROK url.."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                </button>
            </form>
    );
}




export default Settings;