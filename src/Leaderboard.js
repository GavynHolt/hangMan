import { Link } from 'react-router-dom';

const Leaderboard = ({ userList }) => {
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
