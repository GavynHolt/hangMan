import { Link } from 'react-router-dom';

const Leaderboard = ({ userList }) => {
  return (
    <div className='leaderboard'>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th className='username'>Username</th>
            <th className='score'>Score</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            return (
              <tr key={user.key}>
                <td className='username'>{user.username}</td>
                <td className='score'>{user.score}</td>
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
