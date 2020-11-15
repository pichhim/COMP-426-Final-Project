import React, { useEffect, useState } from "react";

import { withFirebase } from '../Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import TicTacToe from '../GameBoard/TicTacToe';

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

    function initChat() {
        const db = props.firebase.getDB();

        let channelId = uid > friendID ? `${uid}<=>${friendID}` : `${friendID}<=>${uid}`;

        // Need to find way getting uid to not be null
        try {
            let listener = db.ref(`/channels/${channelId}`).on("value", snapshot => {

                if (snapshot.val() == null) {
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

                let gameState = newThread.find(item => item.type !== 'TEXT');
                if (gameState) {
                    setLastState(gameState);
                    setIsPlaying(String(gameState.content.nextPlayer) === String(uid));
                }

                setThread(newThread)
            })
            return () => db.ref(`/channels/${channelId}`).off("value", listener);
        } catch (error) {
            alert("Error reading user channels")
        }
    }

    function sendTextMessage(e) {
        e.preventDefault();
        const db = props.firebase.getDB();

        let channelId = uid > friendID ? `${uid}<=>${friendID}` : `${friendID}<=>${uid}`;
        console.log('clicked')

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

        if (lastState && lastState.winner === 'NONE') console.log('Still Playing')
        else {
            const tempState = {
                date: new Date().toISOString(),
                author: uid,
                type: GameType,
                content: {
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

        try {
            db.ref(`/channels/${channelId}/thread`).push(state)
            setTextMessage('')
        } catch (error) {
            alert(error)
        }
    }

    function handleUpdateInput(e) {
        setTextMessage(e.target.value);
    }

    function handleBoardClick({ x, y }) {
        let newBoard = lastState.content.board.map((arr) => (arr.slice()));
        newBoard[y][x] = `${uid}`

        const tempState = {
            date: new Date().toISOString(),
            author: uid,
            type: GameType,
            content: {
                started: lastState.content.started,
                board: newBoard,
                justPlayed: uid,
                nextPlayer: friendID,
                winner: 'NONE'
            }
        }
        setShowBoard(false);
        sendGameState(tempState)
    }

    function openBoard(e) {
        e.preventDefault();
        setShowBoard(true)
    }

    useEffect(initChat, [])

    return (
        <div className="tile is-vertical is-parent is-12 messages-window" id="open-chat">
            <div className="tile is-vertical is-child">
                <article className="tile is-child media">
                    <figure className="media is-left">
                        {/* <img className="image is-32x32" src={user.img} alt={user.name} style={{ borderRadius: "50%" }}></img> */}
                        <h2 className="subtitle"><b>{friend.username}</b></h2>
                    </figure>
                </article>
            </div>

            <div style={{ maxHeight: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
                {isPlaying && showBoard ? <OwnMessage entry={lastState} onClick={handleBoardClick} /> : null}
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
                        {isPlaying && !showBoard ? <span className="button is-info" onClick={openBoard}>Show Board</span>
                            : <span className="button is-info" onClick={startGame}>Start Game</span>}
                    </div>
                    <div className="control">
                        <span className="button is-info is-rounded" onClick={sendTextMessage}><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                        </span>
                    </div>
                </form>
            </div>

        </div>
    )
}

function OwnMessage(props) {
    let content = props.entry.content;

    function defineContentType() {
        switch (props.entry.type) {
            case 'TICTACTOE':
                return (
                    <TicTacToe data={content} onClick={props.onClick}></TicTacToe>
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
                    <TicTacToe data={content}></TicTacToe>
                )

            default:
                return (
                    content
                )
        }
    }

    return (
        <div className="messages-container">
            <div className="friend-messages">
                {defineContentType()}
            </div>
        </div>

    )
}

export default withFirebase(ChatWindow)