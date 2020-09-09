import React from 'react';
import './Sidebar.css';
import { Add, Chat, MoreVert, SearchOutlined } from '@material-ui/icons';
import { IconButton, Avatar } from '@material-ui/core';
import SidebarChat from './SidebarChat';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerLeft">
          <Avatar />
        </div>
        <div className="sidebar__headerRight">
          <IconButton>
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
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
