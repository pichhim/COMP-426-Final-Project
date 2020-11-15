import React, { useEffect, useState } from "react";

import ChatWindow from './window';

import { withFirebase } from '../Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './messages.css';

function Messages(props) {

    const [currChat, setCurrChat] = useState('');
    const [friendList, setFriendList] = useState([])

    function initFriends() {
        const db = props.firebase.getDB();
        const uid = props.user.uid;

        // Need to find way getting uid to not be null
        try {
            let listener = db.ref(`/users`).on("value", snapshot => {
                let self = snapshot.val()[uid];
                let friends = self.friends;
                let friendInfo = [];
                for (let snap in snapshot.val()) {
                    if (friends && snap in friends) {
                        friendInfo.push({
                            ...snapshot.val()[snap],
                            key: snap
                        })
                    }
                }
                setFriendList(friendInfo)
            })
            return () => db.ref(`/users`).off("value", listener);
        } catch (error) {
            alert("Error reading user friends")
        }
    }

    useEffect(initFriends, [])


    return (
        <div className="columns">
            <div className="column is-4 container is-" style={{height:'calc(100vh - 200px)', overflow:'auto'}}>
                <ChatsMenu user={props.user} chatList={friendList} chatSelect={setCurrChat}></ChatsMenu>
            </div>
            <div className="column is-8 container" style={{height:'calc(100vh - 200px)'}}>
                {friendList.filter(friend => currChat === friend.key).map(friend => <ChatWindow key={friend.key} user={props.user} friend={friend}></ChatWindow>)}
            </div>
        </div>
    )
}

function ChatsMenu(props) {

    const chatList = props.chatList

    return (
        <div className="tile is-vertical overflow-auto"> {/** Attempted scroll */}
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
                {chatList.map(chat => {
                    return <div className="tile is-child is-vertical messages-is-hoverable"
                        key={chat.key}
                        onClick={() => props.chatSelect(chat.key)}>
                        <article className="media messages-is-clickable">
                            <figure className="media-left">
                                <img className="image is-64x64" src={chat.img} alt={`${chat.fullname}'s profile picture`} style={{ borderRadius: "50%" }}></img>
                            </figure>
                            <div className="media-content">
                                <div className="content">
                                    <h4>{chat.username}</h4>
                                    <p><i>{chat.fullname}</i></p>
                                </div>
                            </div>
                        </article>
                    </div>
                })}
            </div>
        </div>
    )
}

export default withFirebase(Messages);
