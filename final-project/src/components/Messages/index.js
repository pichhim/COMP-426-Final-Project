import React from "react";
import test_data from "./test_data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons';

function Messages() {

    return(
        <div className="tile is-ancestor">
            <div className="tile is-parent is-4">
                {renderChatsMenu()}
            </div>
            <div className="tile is-parent is-7 box">
                {renderChatWindow(test_data[0])}
            </div>
        </div>
    )
}

const demoUser1 = {
    image: "https://www.nicepng.com/png/full/49-493768_cartoon-boba-cu-ni-hay-v-tr-sa.png",
    name: "Pich Him",
    message: "I'm hungry too"
}

const imageStyle = function () {
    return {
        borderRadius: "50%"
    }
}


/**
* renderChatsMenu
* 
* - need to display history of chats, likely stored on backend/firebase?
* - profile pics need to be rendered with each chat
* - name of user
* - preview of most recent message received/delivered
*/
function renderChatsMenu() {
        return (
            <div className="tile is-parent is-vertical overflow-auto" style={{ maxHeight: "700px" }}> {/** Attempted scroll */}
                <article className="tile is-parent media">
                    <figure className="media-left">
                        <img className="image is-64x64" src={demoUser1.image} style={{borderRadius: "50%"}}></img>
                    </figure>
                    <h1 className="title"><b>Chats</b></h1>
                </article>

                <div className="field">
                    <div className="control has-icons-left">
                        <input className="input is-rounded" type="text" placeholder="Search chats"></input>
                        <span className="icon is-left">
                            <FontAwesomeIcon icon={faSearch}/>
                        </span>
                    </div> 
                </div>
                
                <div className="tile is-parent is-vertical">
                    {test_data.map(user => (
                        <div className="tile is-child is-vertical" 
                        // onMouseEnter={e => e.currentTarget.style.background="#F0F0F0"}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor="#F0F0F0"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor="#0000"} 
                        onClick={handleChatSelect} >
                            <article className="media" id="selected">
                                <figure className="media-left">
                                    <img className="image is-64x64" src={user.img} style={{borderRadius: "50%"}}></img>
                                </figure>
                                <div className="media-content">
                                    <div className="content">
                                        <h4>{user.name}</h4>
                                        <p>{user.message}</p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        )
}

// Not implemented yet!
function handleChatSelect() {
    let currentOpen = document.getElementById('open-chat');
    currentOpen.replaceWith(demoUser1)
    console.log(currentOpen);

}

/**
 * renderChatWindow
 * 
 * - display user's chat history with selected friend / clean window?
 * - friend name / profile pic?
 * - visual rendering of games menu buttons (separate functions?)
 */
function renderChatWindow(user) {

    return (
        <div className="tile is-vertical is-parent is-12" id="open-chat">
            <div className="tile is-vertical is-child">
                <article className="tile is-child media">
                    <figure className="media is-left">
                        <img className="image is-32x32" src={user.img} alt={user.name} style={{borderRadius: "50%"}}></img>
                        <h2 className="subtitle"><b>{user.name}</b></h2>
                    </figure>
                </article>
            </div>

            <div className="tile is-vertical is-child is-10">
                {renderMessages(user)}
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

function renderMessages (user) {
    return (
        <div>
            <p>{user.name}</p>
            <article className="media">
                <figure className="media is-left">
                    <img className="image is-32x32" src={user.img} alt={user.name} style={{borderRadius: "50%"}}></img>
                    <p className="box">{user.message}</p>
                </figure>
            </article>

        </div>
        
    )
}

/**
 * newChatIndicator
 * 
 * - boldens the user's name and most recent message in chat menu
 * 
 */

//  function newChatIndicator(user) {
     
//  }

export default Messages;