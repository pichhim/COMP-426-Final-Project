import React, { useEffect, useState } from "react";

import { withFirebase } from '../Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import TicTacToe from '../GameBoard/TicTacToe';
import { Redirect } from "react-router-dom";

function ChatWindow(props) {

    const friend = props.friend;
    const uid = props.user.uid;
    const friendID = friend.key;

    const GameType = 'TICTACTOE'

    const [thread, setThread] = useState([]);
    const [textMessage, setTextMessage] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showBoard, setShowBoard] = useState(false);
    const [lastState, setLastState] = useState(null);
    const [redirect, setRedirect] = useState(null);

    function initChat() {
        const db = props.firebase.getDB();

        let channelId = uid > friendID ? `${uid}<=>${friendID}` : `${friendID}<=>${uid}`;

        // Need to find way getting uid to not be null
        try {
            let listener = db.ref(`/channels/${channelId}`).on("value", snapshot => {

                if (snapshot.val() == null) {
                    setRedirect(true)
                    return () => db.ref(`/channels/${channelId}`).off("value", listener);
                }

                let newThread = [];
                for (let key in snapshot.val().thread) {
                    let entry = snapshot.val().thread[key];
                    if (entry.type !== 'HEAD') {
                        newThread.push(entry)
                    }
                }
                newThread = newThread.sort((a, b) => new Date(b.date) - new Date(a.date));

                let gameState = newThread.find(item => item.type !== 'TEXT' && item.type !== 'SYSTEM');
                if (gameState) {
                    setLastState(gameState);
                    if (gameState.content.winner === 'NONE') {
                        let isPlaying = String(gameState.content.nextPlayer) === String(uid);
                        setIsPlaying(isPlaying);
                        setShowBoard(isPlaying);
                    } else {
                        setIsPlaying(false);
                        setShowBoard(false);
                    }
                }

                setThread(newThread)
            })
            return () => db.ref(`/channels/${channelId}`).off("value", listener);
        } catch (error) {
            alert("Error reading user channels")
        }
    }

    // TO DO: Add more games?

    function sendTextMessage(e) {
        e.preventDefault();
        const db = props.firebase.getDB();

        let channelId = uid > friendID ? `${uid}<=>${friendID}` : `${friendID}<=>${uid}`;

        if (textMessage.length > 0) {
            try {
                db.ref(`/channels/${channelId}/thread`).push({
                    date: new Date().toISOString(),
                    author: uid,
                    type: 'TEXT',
                    content: textMessage
                })
                setTextMessage('')
            } catch (error) {
                alert("Error reading user channels")
            }
        }
    }

    function startGame(e) {
        e.preventDefault();
        if (lastState == null || lastState.content.winner !== 'NONE') {
            sendSystemMessage(`${props.user.username} is starting a new game of tic-tac-toe...`)
            const tempState = {
                date: new Date().toISOString(),
                author: uid,
                type: GameType,
                content: {
                    // System fills the board with placeholder values to symbolize empty values
                    board: [["SYSTEM", "SYSTEM", "SYSTEM"],
                    ["SYSTEM", "SYSTEM", "SYSTEM"],
                    ["SYSTEM", "SYSTEM", "SYSTEM"]],
                    justPlayed: "SYSTEM",
                    nextPlayer: uid,
                    started: uid,
                    winner: 'NONE'
                }
            }
            setLastState(tempState);
            setShowBoard(true);
            setIsPlaying(true)
        }
    }

    function sendGameState(state) {
        const db = props.firebase.getDB();
        let channelId = uid > friendID ? `${uid}<=>${friendID}` : `${friendID}<=>${uid}`;

        let winner = state.content.winner;

        try {
            db.ref(`/channels/${channelId}/thread`).push(state)
            setShowBoard(false);
        } catch (error) {
            alert(error)
        }

        if (String(uid) === String(winner)) {
            sendSystemMessage(`Congratuations, ${props.user.username} won!`)
        } else if (String(winner) === 'SYSTEM') {
            sendSystemMessage(`Nobody Won! HAHAHAHAHA`)
        }
    }

    function sendSystemMessage(message) {
        const db = props.firebase.getDB();
        let channelId = uid > friendID ? `${uid}<=>${friendID}` : `${friendID}<=>${uid}`;

        let sysObject = {
            date: new Date().toISOString(),
            author: 'SYSTEM',
            type: 'SYSTEM',
            content: message
        }

        try {
            db.ref(`/channels/${channelId}/thread`).push(sysObject)
        } catch (error) {
            alert(error)
        }
    }

    function handleUpdateInput(e) {
        setTextMessage(e.target.value);
    }

    function toggleBoard(e) {
        e.preventDefault();
        setShowBoard(prevState => !prevState)
    }

    function OwnMessage(props) {
        let content = props.entry.content;

        function defineContentType() {
            switch (props.entry.type) {
                case 'TICTACTOE':
                    return (
                        <TicTacToe data={content} sendState={props.oldState ? null : sendGameState} uid={uid} friendID={friendID}></TicTacToe>
                    )
                default:
                    return (
                        content
                    )
            }
        }

        return (
            <div className="messages-container">
                <div className="own-messages">
                    {defineContentType()}
                </div>
            </div>

        )
    }

    function FriendMessage(props) {
        let content = props.entry.content;

        function defineContentType() {
            switch (props.entry.type) {
                case 'TICTACTOE':
                    return (
                        <div className="friend-messages">
                            <TicTacToe data={content}></TicTacToe>
                        </div>
                    )
                case 'SYSTEM':
                    return (
                        <div className="system-messages">
                            {content}
                        </div>
                    )
                default:
                    return (
                        <div className="friend-messages">
                            {content}
                        </div>
                    )
            }
        }

        return (
            <div className="messages-container">
                {defineContentType()}
            </div>
        )
    }

    useEffect(initChat, [])

    return (
        <div className="tile is-vertical is-parent is-12 messages-window" id="open-chat">
            <div className="tile is-vertical is-child">
                <article className="tile is-child media">
                    <figure className="media is-left">
                        <h2 className="subtitle"><b>{friend.username}</b></h2>
                    </figure>
                </article>
            </div>

            <div style={{ maxHeight: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
                {isPlaying && showBoard ? <OwnMessage entry={lastState} /> : null}
                {thread.map(entry => {
                    return entry.author === uid ? <OwnMessage entry={entry} key={entry.date} oldState={true} /> : <FriendMessage entry={entry} key={entry.date} oldState={true} />
                })}
            </div>

            <div className="tile is-vertical is-child is-12">
                <form className="field has-addons" onSubmit={sendTextMessage}>
                    <div className="control" style={{ width: '100%' }}>
                        <input className="input is-rounded" type="text" placeholder="Type a message..." value={textMessage} onChange={handleUpdateInput}></input>
                    </div>
                    <div className="control">
                        {isPlaying && lastState && lastState.content.winner === 'NONE' ?
                            <span className="button is-info" onClick={toggleBoard}>{!showBoard ? "Show Board" : "Close Board"}</span>
                            : <span className="button is-info" onClick={startGame}>{lastState && lastState.content.winner === 'NONE' ? "Waiting..." : "Start Game"}</span>}
                    </div>
                    <div className="control">
                        <span className="button is-info is-rounded" onClick={sendTextMessage}><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                        </span>
                    </div>
                </form>
            </div>
            {redirect ? <Redirect to="/messages"></Redirect> : null}
        </div>
    )
}

export default withFirebase(ChatWindow)