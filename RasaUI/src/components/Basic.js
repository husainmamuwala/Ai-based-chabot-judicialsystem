import './chatBot.css';
import react, { useEffect, useState } from 'react';
import { BiBot, BiUser } from 'react-icons/bi';

function Basic() {
    const [chat, setChat] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [botTyping, setbotTyping] = useState(false);
    const [botOffline , setbotOffline] = useState(false);


    useEffect(() => {

        console.log("called");
        const objDiv = document.getElementById('messageArea');
        objDiv.scrollTop = objDiv.scrollHeight;


    }, [chat])




    const handleSubmit = (evt) => {
        evt.preventDefault();
        const name = "husain";
        const request_temp = { sender: "user", sender_id: name, msg: inputMessage };

        if (inputMessage !== "") {

            setChat(chat => [...chat, request_temp]);
            setbotTyping(true);
            setInputMessage('');
            rasaAPI(name, inputMessage);
        }
        else {
            window.alert("Please enter valid message");
        }

    }


    const rasaAPI = async function handleClick(name, msg) {

        //chatData.push({sender : "user", sender_id : name, msg : msg});


        await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'charset': 'UTF-8',
            },
            
            credentials: "same-origin",
            body: JSON.stringify({ "sender": name, "message": msg }),
        })
            .then(response => response.json())
            .then((response) => {
                if (response) {
                    const temp = response[0];
                    const recipient_id = temp["recipient_id"];
                    const recipient_msg = temp["text"];
                    const response_temp = { sender: "bot", recipient_id: recipient_id, msg: recipient_msg };
                    setbotTyping(false);
                    setChat(chat => [...chat, response_temp]);
                    // scrollBottom();

                }
            })
    }

    console.log(chat);

    const stylecard = {
        maxWidth: '30rem',
        paddingLeft: '0px',
        paddingRight: '0px',
        borderRadius: '30px',
        boxShadow: '0 16px 20px 0 rgba(0,0,0,0.3)'

    }

    return (
        <div className='mt-20'>


            <div className="container">
                <div className="row justify-content-center">

                    <div className="rounded-[2rem]" style={stylecard}>
                        <div className="text-white bg-[#E30000] h-14 rounded-t-[2rem]">
                            <span className='text-xl'>AI Assistant</span>
                             {botTyping ? <h6>Bot is Typing....</h6> : 
                             <p>Bot Online</p>}



                        </div>
                        <div className="cardBody bg-[#ECECEC] pt-10 h-[28rem] 
                                        overflow-x-hidden overflow-y-scroll" id="messageArea">

                            <div className="row msgarea">
                                {chat.map((user, key) => (
                                    <div key={key}>
                                        {user.sender === 'bot' ?
                                            (

                                                <div className='flex flex-row justify-start'>
                                                    <BiBot className="botIcon" />
                                                    <h5 className="bg-[#ffffff] text-black px-4 h-auto min-h-[45px]
                                                pt-2 pb-2 rounded-[2rem] max-w-[20rem] text-lg font-normal justify-start flex
                                                 shadow-sm">{user.msg}</h5>
                                                </div>

                                            )

                                            : (
                                                <div className='flex flex-row justify-end py-2'>
                                                    <h5
                                                        className="bg-[#E30000] text-white px-4 h-auto min-h-[45px] 
                                                pt-2 pb-2 rounded-[2rem] max-w-[20rem] font-normal justify-end text-lg shadow-sm">{user.msg}</h5>
                                                    <BiUser className="userIcon" />
                                                </div>
                                            )
                                        }
                                    </div>
                                ))}

                            </div>

                        </div>
                        <div className="text-black bg-[#ECECEC] rounded-b-[2rem]">
                            <div className="">
                                <div className='flex flex-row px-[2.1rem]'>
                                    <h2 className='text-lg border-2 bg-white border-[#EC0000] px-3 rounded-[2rem]'>Case No___</h2>
                                </div>
                                <form className='flex flex-row justify-center' onSubmit={handleSubmit}>
                                    <div className="px-2 py-2">
                                        <input onChange={e => setInputMessage(e.target.value)} value={inputMessage} type="text"
                                            className="h-14 w-96  rounded-[2rem] border-2 border-black px-4
                                    text-lg font-semibold bg-[#ECECEC]"></input>
                                    </div>
                                    <div className="self-center">
                                        <button type="submit" className="" ><img src='/icons/send.svg' /></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Basic;
