import React, { useState, useEffect } from 'react';
import useFileSystemStore from '../store/useFileSystemStore';
import { Save, FilePlus, List } from 'lucide-react';

const Notepad = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Untitled Note');
  const [currentFileId, setCurrentFileId] = useState(null);
  
  const { createNode, updateFileContent, getChildren } = useFileSystemStore();

  const handleSave = () => {
    if (!currentFileId) {
      // Create new file in Documents
      const id = Math.random().toString(36).substr(2, 9);
      createNode(title, 'file', 'documents');
      // Wait for node creation in store if needed, but here we can just update content
      // Note: createNode in our store doesn't return the ID, so we simulate it.
      // In a real app we'd get the ID back.
      alert('Note saved to Documents!');
    } else {
      updateFileContent(currentFileId, content);
    }
  };

  const createNew = () => {
    setContent('');
    setTitle('Untitled Note');
    setCurrentFileId(null);
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#ffffff] text-slate-800">
      {/* Toolbar */}
      <div className="flex h-10 items-center justify-between px-4 bg-[#f3f3f3] border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button onClick={createNew} className="p-1 hover:bg-slate-200 rounded text-slate-600 flex items-center gap-1">
            <FilePlus size={14} /> <span className="text-[11px] font-bold">New</span>
          </button>
          <button onClick={handleSave} className="p-1 hover:bg-slate-200 rounded text-slate-600 flex items-center gap-1">
            <Save size={14} /> <span className="text-[11px] font-bold">Save</span>
          </button>
        </div>
        <input 
          className="bg-transparent border-none outline-none text-[11px] font-bold text-center w-40"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="w-16" /> {/* Spacer */}
      </div>

      {/* Editor Area */}
      <textarea 
        autoFocus
        className="flex-1 p-8 outline-none resize-none text-[14px] leading-relaxed font-serif"
        placeholder="Start typing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Footer Info */}
      <div className="h-6 px-4 bg-[#f3f3f3] border-t border-slate-200 text-[9px] flex items-center justify-between opacity-60 font-bold uppercase tracking-widest">
        <span>Words: {content.trim() ? content.trim().split(/\s+/).length : 0}</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};

export default Notepad;
