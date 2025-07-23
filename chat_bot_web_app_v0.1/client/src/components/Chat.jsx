import { useState } from "react";
import api from "../api";
import ReactMarkdown from 'react-markdown';


function Chat() {
    const ROUTE = "";
    const [messages, setMessages] = useState([]); // has a role ( choosing between user and bot messages) and the content of each one , array of objects storing messages
    const [message, setMessage] = useState("");   // sets the message from the input to a variable 
    const [loading, setLoading] = useState(false);    //handles loading

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);

        try {
            // Add user message
            setMessages((prev) => [...prev, { role: "user", content: message }]); // adds new messages to previous ones

            const res = await api.post(ROUTE, { message });
            const reply = res.data.reply || "No response"; // standard answer adaptable in backend (reply from server = bot message)
            console.log(res.data)
            // Add bot reply
            setMessages((prev) => [...prev, { role: "bot", content: reply }]);    // adds new messages to previous ones
            // console.log(messages)
        } catch (err) {
            console.error(err);
        } finally {
            setMessage("");
            setLoading(false);
        }

    };





    return (
        <>
        <div
            className="chat-box border rounded p-3 my-3"
            style={{ height: "800px", overflowY: "auto", backgroundColor: "#f8f9fa" }}
        >
            <div className="d-flex flex-column gap-2">
            {messages.map((msg, idx) => (
                <div
                key={idx}
                className={`rounded p-2 ${msg.role === "user"
                    ? "bg-primary text-white align-self-end"    //if its a user its rendered right in the screen
                    : "bg-light align-self-start"}`}    //if not its left 
                >
                <ReactMarkdown>{msg.content.replace(/\\n/g, "\n")}</ReactMarkdown>
                
                </div>
            ))}
            </div>
        </div>

        <form className="d-flex gap-2" onSubmit={sendMessage}>
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
