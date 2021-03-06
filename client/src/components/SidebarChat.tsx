import React from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Room } from 'types';

const SidebarChat: React.FC<Room> = ({ name, _id }) => {
  return (
    <Link to={`/rooms/${_id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${_id}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>This will be the last message.</p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
