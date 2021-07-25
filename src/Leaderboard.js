import { useState, useEffect } from 'react';
import firebase from './firebaseConfig.js';

const Leaderboard = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (snapshot) => {
      const myData = snapshot.val();
      console.log(myData);

      const newArray = [];
      for (let dataKey in myData) {
        const userObject = {
          key: dataKey,
          username: myData[dataKey],
        };
        newArray.push(userObject);
      }
      setUserList(newArray);
    });
  }, []);
  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {userList.map((user) => {
          return <li key={user.key}>{user.username}</li>;
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;
