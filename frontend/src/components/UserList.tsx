import React from 'react';

interface User {
  username: string;
  status: 'online' | 'offline';
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Active Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="mb-1 flex items-center">
            <span className={`w-2 h-2 rounded-full mr-2 ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
