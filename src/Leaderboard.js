import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebaseConfig.js';

const Leaderboard = () => {
  const [userList, setUserList] = useState([]);

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
        };
        newArray.push(userObject);
      }
      setUserList(newArray);
    });
  }, []);
  return (
    <div className='leaderboard'>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th className='centered'>Score</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            return (
              <tr key={user.key}>
                <td>{user.username}</td>
                <td className='centered'>{user.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link className='buttonLink' to='/'>
        To Home
      </Link>
    </div>
  );
};

export default Leaderboard;
