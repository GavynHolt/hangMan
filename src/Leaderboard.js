import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faHome } from '@fortawesome/free-solid-svg-icons';

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
            <th className='word'>Word</th>
            <th className='date'>Date</th>
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
                <td className='date'>{user.date}</td>
                <td className='score'>{user.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='pageTurnBox'>
        <button onClick={() => changeLeaderboardPage(-10)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button onClick={() => changeLeaderboardPage(10)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <Link className='buttonLink' to='/'>
        <FontAwesomeIcon icon={faArrowLeft} /> <FontAwesomeIcon icon={faHome} />
      </Link>
    </div>
  );
};

export default Leaderboard;
