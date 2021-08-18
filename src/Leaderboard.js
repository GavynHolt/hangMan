import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faHome } from '@fortawesome/free-solid-svg-icons';
import firebase from './firebaseConfig.js';

const Leaderboard = () => {
  const [indexOffset, setIndexOffset] = useState(0);
  const [userList, setUserList] = useState([]);

  // Changes leaderboard page by choosing a new range (10 for now) of items in the array
  const changeLeaderboardPage = (offset) => {
    const newIndexOffset = indexOffset + offset;
    if (newIndexOffset >= 0 && newIndexOffset < userList.length) {
      setIndexOffset(newIndexOffset);
    }
  };

  // Load the leaderboard database
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (snapshot) => {
      const myData = snapshot.val();

      const newArray = [];
      for (let dataKey in myData) {
        const userObject = {
          key: dataKey,
          username: myData[dataKey].username,
          score: myData[dataKey].score,
          word: myData[dataKey].word,
        };
        newArray.push(userObject);
      }
      // sort the object array by score
      newArray.sort((a, b) => b.score - a.score);
      setUserList(newArray);
    });
  }, []);

  return (
    <div className='leaderboard'>
      <h2>Leaderboard</h2>
      {userList.length === 0 ? <p>Loading...</p> : <p>{userList.length} Entries</p>}
      <table>
        <thead>
          <tr>
            <th className='username'>Username</th>
            <th className='word'>Word</th>
            <th className='score'>Score</th>
          </tr>
        </thead>
        <tbody>
          {userList.slice(indexOffset, indexOffset + 10).map((user, index) => {
            return (
              <tr key={user.key}>
                <td className='username'>
                  {indexOffset + index + 1}. {user.username}
                </td>
                <td className='word'>{user.word}</td>
                <td className='score'>{user.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='pageTurnBox'>
        <button onClick={() => changeLeaderboardPage(-10)}>
          <span className='sr-only'>Previous Page</span>
          <FontAwesomeIcon icon={faArrowLeft} aria-hidden='true' />
        </button>
        <button onClick={() => changeLeaderboardPage(10)}>
          <span className='sr-only'>Next Page</span>
          <FontAwesomeIcon icon={faArrowRight} aria-hidden='true' />
        </button>
      </div>
      <Link className='buttonLink' to='/'>
        <span className='sr-only'>Go Back Home</span>
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden='true' /> <FontAwesomeIcon icon={faHome} aria-hidden='true' />
      </Link>
    </div>
  );
};

export default Leaderboard;
