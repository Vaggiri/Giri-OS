import React from 'react';
import useFileSystemStore from '../../store/useFileSystemStore';
import useDesktopStore from '../../store/useDesktopStore';

const ContextMenu = ({ x, y, type, targetId, closeMenu }) => {
  const { createNode } = useFileSystemStore();
  const { removeShortcut } = useDesktopStore();

  const actions = {
    desktop: [
      { label: 'New Folder', onClick: () => createNode('New Folder', 'folder', 'desktop') },
      { label: 'Get Info', onClick: () => console.log('Info') },
      { label: 'Change Wallpaper', onClick: () => console.log('Wallpaper') },
    ],
    folder: [
      { label: 'Open', onClick: () => console.log('Open') },
      { label: 'Delete', onClick: () => console.log('Delete') },
      { label: 'Rename', onClick: () => console.log('Rename') },
    ],
    shortcut: [
      { label: 'Open App', onClick: () => console.log('Open') },
      { label: 'Remove from Desktop', onClick: () => {
        removeShortcut(targetId);
        closeMenu();
      }},
    ]
  };

  const currentActions = actions[type] || actions.desktop;

  return (
    <div 
      className="liquid-glass fixed z-[2000] w-48 overflow-hidden rounded-lg py-1 shadow-2xl backdrop-blur-3xl"
      style={{ top: y, left: x }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {currentActions.map((action, i) => (
        <div
          key={i}
          onClick={action.onClick}
          className="cursor-pointer px-4 py-1.5 text-xs text-white hover:bg-blue-500 transition-colors"
        >
          {action.label}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
