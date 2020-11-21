import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';
import { NotificationManager, } from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import status_colors from './status_colors';

import { withFirebase } from '../Firebase';

const styles = {
  input: {
    position: 'relative'
  },
  autocomplete: (width) => ({
    margin: '0px',
    padding: '10px',
    zIndex: '100',
    cursor: 'pointer',
    width: width
  }),
  noSugg: (width) => ({
    margin: '0px',
    padding: '10px',
    zIndex: '100',
    background: 'white',
    width: width
  }),
  absolute: {
    position: 'absolute',
    zIndex: '100',
  },
  imageStyle: function (length) {
    return {
      width: `${length}px`,
      height: `${length}px`,
      position: "relative",
      objectFit: "cover",
      overflow: "hidden",
      borderRadius: "50%",
      border: "0px solid",
    };
  },
  statusStyle: function (userStatus) {
    const color = status_colors.filter(
      (color) => color.status.toLowerCase() === userStatus.toLowerCase()
    )[0].hex;
    return {
      color: `#${color}`,
    };
  },
}

const Suggestion = styled.button`
font-size: 15px;
border: none;
:hover {
    background-color: #ECCDC2;
};
`
// Debouncer
function useDebounce(value, delay) {

  const [debouncedValue, setDebouncedValue] = useState(value);

  function init() {
    const dbHandler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);

    return () => clearTimeout(dbHandler);
  }

  useEffect(init, [value]);

  return debouncedValue;
}

function FriendCard(props) {

  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const debouncedSearch = useDebounce(search, 500);
  const [inputWidth, setInputWidth] = useState(400);
  const [show, setShow] = useState(false);

  function handleInput(e) {
    setShow(true)
    setSearch(e.target.value);
  }

  function handleFocus() {
    setShow(false);
  }

  // Debounces search
  function handleSearch() {

    if (debouncedSearch) {

      const db = props.firebase.getDB();
      let tempResults = [];
      db.ref('/users/').once('value').then(snapshot => {

        for (let snap in snapshot.val()) {
          let username = snapshot.val()[snap].username
          if (username != null && username.toLowerCase().includes(debouncedSearch)) {
            tempResults.push(username)
          }
        }
        setResults(tempResults);
      })
    } else {
      setResults([])
    }
  }

  function handleSelect(value) {
    setSearch(value);
    setShow(false);
  }

  function initWidth() {
    // makes sure that the search term width is always the same as the input menu
    if (inputRef.current != null && inputRef.current.offsetWidth != null && inputRef.current.offsetWidth != inputWidth) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }

  async function addFriend() {
    let username = search;
    let message = "";
    if (username !== "") {
      message = await props.firebase.pushUserData("friends", username);
    }
    message = message.toLowerCase()
    switch (message) {
      case "invalid user":
        NotificationManager.warning(
          "",
          `username ${username.toLowerCase()} is an invalid user.`
        );
        break;
      case "already added":
        NotificationManager.warning(
          "",
          `you have already added ${username.toLowerCase()} as a friend.`
        );
        break;
      case "success":
        NotificationManager.success(
          "",
          `you have added ${username.toLowerCase()} as a friend.`
        );
        break;
      default:
        break; // No input: do nothing
    }
  }
  async function removeFriend() {
    let username = search;
    let message = "";
    if (username !== "") {
      message = await props.firebase.unfriend(username);
    }
    message = message.toLowerCase()
    switch (message) {
      case "invalid user":
        NotificationManager.warning(
          "",
          `username ${username.toLowerCase()} is an invalid user.`
        );
        break;
      case "not in friend's list":
        NotificationManager.warning(
          "",
          `you do not have ${username.toLowerCase()} added as a friend.`
        );
        break;
      case "success":
        NotificationManager.error("", `you have unfriended ${username.toLowerCase()}.`);
        break;
      default:
        break; // No input: do nothing
    }
  }

  useEffect(handleSearch, [debouncedSearch])
  useEffect(initWidth);

  return (
    <div>
      <figure style={{ height: '100px', zIndex: '100' }}>
        <h1 className="title is-2" style={{ marginBottom: '0px', }}>friends</h1>
        <br></br>&nbsp;
      <div className="field has-addons">
          {/* Input field */}
          <div className="control is-expanded" style={{ position: 'relative' }}>
            {/* get all the usernames here */}
            <input
              className="input is-fullwidth"
              type="text"
              id="friendInput"
              placeholder="enter username here"
              ref={inputRef}
              value={search}
              onFocus={handleFocus}
              onChange={handleInput}
            />
            <div className="suggestions" style={styles.absolute}>
              {show ? results.length > 0 || search.length === 0 ? results.map((res, index) => {
                return (
                  <Suggestion className="box" style={styles.autocomplete(inputWidth)} key={index} onClick={() => handleSelect(res)}>
                    {res}
                  </Suggestion>
                )
              }) : <Suggestion style={styles.noSugg(inputWidth)}>no suggestions!</Suggestion> : null}
            </div>
          </div>
      &nbsp;

      <div className="buttons is-right">
            <button
              className="button"
              data-tip="add friend"
              data-place="top"
              onClick={() => addFriend()}
            >
              <span className="icon is-small">
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </button>
            <button
              className="button"
              data-tip="unfriend"
              data-place="top"
              onClick={() => removeFriend()}
            >
              <span className="icon is-small">
                <FontAwesomeIcon icon={faMinus} />
              </span>
            </button>
          </div>
        </div>
        &nbsp;
                </figure>
      <br></br>&nbsp;
      <div className="tile"><FriendsList friendsList={props.friendsList} handleSelect={handleSelect}/></div>
    </div>

  )
}

function FriendsList(props) {

  const friendsList = props.friendsList;

  return friendsList === [] ? (
    ""
  ) : (
      <div className="tile is-child" style={{ overflow: 'auto', height: 'calc(100vh - 400px)' }}>
        {friendsList.map((obj) => (
          <div className="container" style={{ width: '100%', marginBottom: '1rem' }}>
            <article
              className="media custom-is-hoverable custom-is-clickable"
              key={obj.username}
              onClick={() => props.handleSelect(obj.username)}
            >
              <div className="media-left">
                <figure className="image">
                  <img
                    style={styles.imageStyle(100)}
                    src={`${obj.picture}`}
                    alt={obj.fullname + " profile"}
                  ></img>
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                  <div>
                    <strong>{obj.fullname}</strong>
                    <br></br>
                    <em>{obj.username}</em>
                    <p style={styles.statusStyle(obj.status)}>{obj.status}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    );
}

export default withFirebase(FriendCard);