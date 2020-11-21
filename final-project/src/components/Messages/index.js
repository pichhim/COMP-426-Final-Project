import React, { useEffect, useState } from "react";

import ChatWindow from './window';
import status_colors from "../Profile/status_colors";

import { withFirebase } from '../Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { useHistory, useRouteMatch, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import './messages.css';

const styles = {
    statusStyle: function (userStatus) {
        const color = status_colors.filter(
            (color) => color.status.toLowerCase() === userStatus.toLowerCase()
        )[0].hex;
        return {
            color: `#${color}`,
        };
    },
    columnStyle: {
        height: 'calc(100vh - 100px)'
    },
    windowStyle: {
        height: 'calc(100vh - 200px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

function Messages(props) {

    const [currChat, setCurrChat] = useState('');
    const [friendList, setFriendList] = useState([]);
    const [self, setSelf] = useState(null);

    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    function chatSelect(key) {
        setCurrChat(`/${key}`)
    }

    function initFriends() {
        const db = props.firebase.getDB();
        const uid = props.user.uid;
        // Set current location
        // Need to find way getting uid to not be null
        try {
            let listener = db.ref(`/users`).on("value", snapshot => {

                if (snapshot.val() == null) {
                    return () => db.ref(`/users`).off("value", listener);
                }

                let self = snapshot.val()[uid];
                setSelf({ ...self, uid: uid });
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
            alert("error reading user friends")
        }
    }

    // Sets current window location using parameters in route
    function setLocation() {
        setCurrChat(location.pathname.replace(match.path, ''))
    }

    useEffect(initFriends, []);
    useEffect(setLocation);

    const currWindow = friendList.filter(friend => currChat === `/${friend.key}`);

    return (
        <div className="columns is-centered is-vcentered" style={styles.columnStyle}>
            <div className="column is-4 is-narrow container">
                {self ? <ChatsMenu user={self} chatList={friendList} chatSelect={chatSelect}></ChatsMenu> : null}
            </div>
            <div className="column is-7 is-narrow container">
                <div className="card">
                    <div className="card-content has-text-centered" style={styles.windowStyle}>
                        {currWindow.length > 0 ? currWindow.map(friend => <ChatWindow key={friend.key} user={self} friend={friend}></ChatWindow>)
                            : <h3>Please Select a Friend to Chat With</h3>}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ChatsMenu(props) {

    const chatList = props.chatList;
    const user = props.user;
    const [query, setQuery] = useState('')

    return (
        <div className="card"> {/** Attempted scroll */}
            <div className="card-content" style={{ height: 'calc(100vh - 200px)' }}>
                <article className="tile is-parent media">
                    <figure className="media-left">
                        <img className="image is-64x64" src={user.picture} style={{ borderRadius: "50%" }}></img>
                    </figure>
                    <h1 className="title"><b>chats</b></h1>
                </article>

                <div className="field">
                    <div className="control has-icons-left">
                        <input className="input is-rounded" type="text" placeholder="Search chats" value={query} onChange={(e) => setQuery(e.target.value)}></input>
                        <span className="icon is-left">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                    </div>
                </div>

                <div className="tile is-parent is-vertical" style={{ height: 'calc(100% - 160px)', overflow: 'auto' }}>
                    {chatList.filter(entry => entry.username.includes(query) || entry.fullname.includes(query)).map(chat => {
                        return <div className="tile is-child is-vertical custom-is-hoverable messages-option"
                            key={chat.key}
                            onClick={() => props.chatSelect(chat.key)}>
                            <Link to={`/messages/${chat.key}`}>
                                <article className="media custom-is-clickable">
                                    <figure className="media-left">
                                        <img className="image is-64x64" src={chat.picture} alt={`${chat.fullname}'s profile picture`} style={{ borderRadius: "50%" }}></img>
                                    </figure>
                                    <div className="media-content">
                                        <div className="content">
                                            <h6>{chat.fullname} - <i>{chat.username}</i></h6>
                                            <p style={styles.statusStyle(chat.status)}>{chat.status}</p>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default withFirebase(Messages);
