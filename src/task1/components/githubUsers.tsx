import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { User } from "../types/user";
import './gitHubUsers.scss';

function GitHubUsers() {
  const { data, loading, error } = useFetch<User[]>('https://api.github.com/users');
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <div className="loading">Loading users...</div>;

  if (error) return <div className="error">Error: {error.message}</div>;

  if (!data) return <div className="no-data">No users found</div>;

  // Filter users based on search term
  const filteredUsers = data.filter(user =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="github-users">
      <h1>GitHub Users</h1>
      <p className="total">Total: {data.length}</p>

      <input
        type="text"
        placeholder="Search by username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filteredUsers.length === 0 ? (
        <p className="no-results">No users found matching "{searchTerm}"</p>
      ) : (
        <div className="users-list">
          {filteredUsers.map((user: User) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar_url} alt={user.login} />
              <div className="user-info">
                <h3>{user.login}</h3>
                <p className="user-id">ID: {user.id}</p>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GitHubUsers;