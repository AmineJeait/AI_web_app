import { useState,useEffect,useRef } from "react";
import api from "../api";
import ReactMarkdown from "react-markdown";
import "../styles/Chat.css"; // import the css file

function Chat() {
    const ROUTE = "";
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    useEffect (()=>{
        getMessages()
    },[])


    const storeMessages = async(data) =>{
        const res = await api.post("messages",{messages:data});
        console.log(res);
    }




   const getMessages = async () => {
        try {
            const res = await api.post("getMessages");

            console.log(res);
            // res.data.reply is already an array of message objects, e.g. [{role:..., content:...}, ...]
            setMessages(res.data.reply);

            
        }
        catch (err) {
            console.error("Error loading messages:", err);
        }
};







   const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);

        try {
            // Optimistically add user message
            const updatedMessages = [...messages, { role: "user", content: message }];
            setMessages(updatedMessages);

            // Send full messages array including new user message
            const res = await api.post(ROUTE, { messages: updatedMessages });

            const reply = res.data.reply?.trim() || "No response";

            // If assistant replied, add it to state + save
            if (reply !== "No response") {
                const finalMessages = [...updatedMessages, { role: "assistant", content: reply }];
                setMessages(finalMessages);

                // ✅ Store messages after assistant reply is added
                storeMessages(finalMessages);
            } else {
                // Still store user input alone (if needed)
                storeMessages(updatedMessages);
            }

        } catch (err) {
            console.error("Error sending message:", err);
        } finally {
            setMessage("");
            setLoading(false);
        }

        };


    return (
        <>
            <div className="chat-box">
                <div className="messages-container">
                {messages.map((msg, idx) => (
                    <div
                    key={idx}
                    className={`message-row ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                    >
                    <div
                        className={`message-bubble ${
                        msg.role === "user" ? "user" : "bot"
                        }`}
                    >
                        {/* <div className="icon-circle">
                        <i
                            className={`bi ${
                            msg.role === "user" ? "bi-person" : "bi-robot"
                            } text-dark icon`}
                        ></i>
                        </div> */}
                        <div className="message-content">
                            <ReactMarkdown
                                components={{
                                p: (props) => <p {...props} className="mb-0" />,
                                }}
                            >
                                {msg.content.replace(/\\n/g, "\n").trim()}
                            </ReactMarkdown>
                            {/* {msg.content} */}
                        </div>
                    </div>
                    </div>
                ))}
                </div>
                    {loading && (
                        <div className="message-row justify-start">
                            <div className="message-bubble bot spinner-bubble">
                            <div className="spinner"></div>
                        </div>
                </div>
                )}
                <div ref={messagesEndRef} />
                </div>
            

            {/* <button onClick={() => document.body.classList.toggle("dark")}>Toggle Dark Mode</button> */}


            <form className="message-form" onSubmit={sendMessage}>
                <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Send"}
                </button>
            </form>
        </>
    );
}

export default Chat;
