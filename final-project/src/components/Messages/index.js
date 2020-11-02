import React, { useEffect, useState } from "react";

import { withFirebase } from '../Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons';

function Messages(props) {

    const [currChat, setCurrChat] = useState('');
    const [chatList, setChatList] = useState([]);

    function initChat() {
        const db = props.firebase.getDB();
        const uid = props.user.uid;

        // Need to find way getting uid to not be null
        try {
            let listener = db.ref(`/users/${uid}/friends`).on("value", snapshot => {
                let chatList = [];
                for (let snap in snapshot.val()) {
                    let currVal = snapshot.val()[snap]
                    if (currVal !== "HEAD") chatList.push({ 
                        key: snap, 
                        channel: currVal.channel,
                        username: currVal.username,
                        fullname: currVal.fullname,
                        uid: currVal.uid,
                        img: currVal.img
                    })
                }
                setChatList(chatList)
            })
            return () => db.ref(`/users/${uid}/friends`).off("value", listener);
        } catch (error) {
            alert("Error reading user channels")
        }
    }

    useEffect(initChat, [])

    return (
        <div className="tile is-ancestor">
            <div className="tile is-parent is-4">
                <ChatsMenu user={props.user} chatList={chatList}></ChatsMenu>
            </div>
            <div className="tile is-parent is-7 box">
                <ChatWindow user={props.user}></ChatWindow>
            </div>
        </div>
    )
}

function ChatsMenu(props) {

    const chatList = props.chatList

    return (
        <div className="tile is-parent is-vertical overflow-auto" style={{ maxHeight: "700px" }}> {/** Attempted scroll */}
            <article className="tile is-parent media">
                <figure className="media-left">
                    <img className="image is-64x64" src={'lmao'} style={{ borderRadius: "50%" }}></img>
                </figure>
                <h1 className="title"><b>Chats</b></h1>
            </article>

            <div className="field">
                <div className="control has-icons-left">
                    <input className="input is-rounded" type="text" placeholder="Search chats"></input>
                    <span className="icon is-left">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </div>
            </div>

            <div className="tile is-parent is-vertical">
                {chatList.map(chat => (
                    <div className="tile is-child is-vertical"
                        key={chat.key}
                        // onMouseEnter={e => e.currentTarget.style.background="#F0F0F0"}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#F0F0F0"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0000"} >
                        <article className="media">
                            <figure className="media-left">
                                <img className="image is-64x64" src={chat.img} alt={`${chat.fullname}'s profile picture`} style={{ borderRadius: "50%" }}></img>
                            </figure>
                            <div className="media-content">
                                <div className="content">
                                    <h4>{chat.fullname}</h4>
                                    <p>{chat.username}</p>
                                </div>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ChatWindow(props) {

    const user = props.user;

    return (
        <div className="tile is-vertical is-parent is-12" id="open-chat">
            <div className="tile is-vertical is-child">
                <article className="tile is-child media">
                    <figure className="media is-left">
                        {/* <img className="image is-32x32" src={user.img} alt={user.name} style={{ borderRadius: "50%" }}></img> */}
                        <h2 className="subtitle"><b>User Name</b></h2>
                    </figure>
                </article>
            </div>

            

            <div className="tile is-vertical is-child is-10">
                <div className="field">
                    <div className="control has-icons-left">
                        <input className="input is-rounded" type="text" placeholder="Type a message..."></input>
                        <span className="icon is-right">
                            <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default withFirebase(Messages);