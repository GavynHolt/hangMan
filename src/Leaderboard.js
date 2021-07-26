import { useState, useEffect } from 'react';
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
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            return (
              <tr key={user.key}>
                <td>{user.username}</td>
                <td>{user.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
