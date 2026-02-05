import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiMoreVertical, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function UserActionMenu({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !buttonRef.current?.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 4, left: rect.right - 144 });
    }
    setOpen((prev) => !prev);
  };

  const handleAction = (fn) => {
    setOpen(false);
    fn?.();
  };

  const dropdown = open && (
    <div
      ref={dropdownRef}
      className="fixed w-36 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-[100]"
      style={{ top: position.top, left: position.left }}
    >
      <button
        type="button"
        onClick={() => handleAction(onView)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <FiEye className="w-4 h-4" /> View
      </button>
      <button
        type="button"
        onClick={() => handleAction(onEdit)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <FiEdit2 className="w-4 h-4" /> Edit
      </button>
      <button
        type="button"
        onClick={() => handleAction(onDelete)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        <FiTrash2 className="w-4 h-4" /> Delete
      </button>
    </div>
  );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className="p-1 rounded hover:bg-gray-200 text-gray-600"
        aria-label="Actions"
      >
        <FiMoreVertical className="w-5 h-5" />
      </button>
      {createPortal(dropdown, document.body)}
    </div>
  );
}
