import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronDown } from 'react-icons/fi';

export default function StatusSelect({ value, onChange }) {
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
      setPosition({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
    setOpen((prev) => !prev);
  };

  const options = ['Active', 'InActive'];

  const dropdown = open && (
    <div
      ref={dropdownRef}
      className="fixed w-28 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-[100]"
      style={{ top: position.top, left: position.left }}
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => {
            onChange(opt);
            setOpen(false);
          }}
          className={`w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 ${
            value === opt ? 'bg-gray-50 font-medium' : ''
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-1 px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
      >
        {value || 'Active'}
        <FiChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {createPortal(dropdown, document.body)}
    </div>
  );
}
