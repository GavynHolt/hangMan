import { useState } from 'react';
import { Link } from 'react-router-dom';

const Leaderboard = ({ userList }) => {
  const [indexOffset, setIndexOffset] = useState(0);

  const changeLeaderboardPage = (offset) => {
    const newIndexOffset = indexOffset + offset;
    if (newIndexOffset >= 0 && newIndexOffset < userList.length) {
      setIndexOffset(newIndexOffset);
    }
  };

  return (
    <div className='leaderboard'>
      <h2>Leaderboard</h2>
      <p>{userList.length} Entries</p>
      <table>
        <thead>
          <tr>
            <th className='username'>Username</th>
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
                <td className='score'>{user.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='pageTurnBox'>
        <button onClick={() => changeLeaderboardPage(-10)}>Prev.</button>
        <button onClick={() => changeLeaderboardPage(10)}>Next</button>
      </div>
      <Link className='buttonLink' to='/'>
        To Home
      </Link>
    </div>
  );
};

export default Leaderboard;
