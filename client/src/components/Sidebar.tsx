import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Add, Chat, MoreVert, SearchOutlined } from '@material-ui/icons';
import { IconButton, Avatar } from '@material-ui/core';
import SidebarChat from './SidebarChat';
import { Room } from 'types';
import pusher, { Channel } from 'config/pusher';
import axios from 'config/axios';
import { useStateValue } from 'context';

const Sidebar: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    axios.get('/api/v1/rooms/sync').then((response) => {
      console.log(response);
      setRooms(response.data);
    });
  }, []);

  useEffect(() => {
    const channel: Channel = pusher.subscribe('rooms');
    channel.bind('inserted', (newRoom: Room) => {
      console.log(newRoom);
      setRooms([...rooms, newRoom]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [rooms]);

  const createChat = () => {
    const roomName: string | null = prompt('Please enter name for chat:');
    if (roomName) {
      axios.post('/api/v1/rooms/new', {
        name: roomName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerLeft">
          <Avatar src={`${user?.photoURL}`} />
        </div>
        <div className="sidebar__headerRight">
          <IconButton onClick={createChat}>
            <Add />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>

      <div className="sidebar__chats">
        {rooms.map((room, index) => (
          <SidebarChat key={`${room._id}__${index}`} {...room} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
