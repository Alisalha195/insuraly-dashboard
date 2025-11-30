// import React, { useState, useRef } from 'react';
// import { CSSTransition } from 'react-transition-group';
// import './Popover.css'; // Import CSS for animations

// interface PopoverProps {
//    content: React.ReactNode;
//    children: React.ReactNode;
//    position?: 'top' | 'bottom' | 'left' | 'right';
//    trigger?: 'click' | 'hover';
// }

// const Popover: React.FC<PopoverProps> = ({
//    content,
//    children,
//    position = 'bottom',
//    trigger = 'click',
// }) => {
//    const [isVisible, setIsVisible] = useState(false);
//    const popoverRef = useRef<HTMLDivElement>(null);

//    const togglePopover = () => {
//       setIsVisible((prev) => !prev);
//    };

//    const handleMouseEnter = () => {
//       if (trigger === 'hover') setIsVisible(true);
//    };

//    const handleMouseLeave = () => {
//       if (trigger === 'hover') setIsVisible(false);
//    };

//    return (
//       <div
//          className="popover-container"
//          onMouseEnter={handleMouseEnter}
//          onMouseLeave={handleMouseLeave}
//       >
//          <div
//             onClick={trigger === 'click' ? togglePopover : undefined}
//             className="popover-trigger"
//          >
//             {children}
//          </div>
//          <CSSTransition
//             in={isVisible}
//             timeout={300}
//             classNames="popover"
//             unmountOnExit
//             nodeRef={popoverRef}
//          >
//             <div
//                ref={popoverRef}
//                className={`popover-content popover-${position}`}
//             >
//                {content}
//             </div>
//          </CSSTransition>
//       </div>
//    );
// };

// export default Popover;

import React, { useState, useRef, useEffect } from 'react';
import './Popover.css';

const Popover = ({ toggleText, children, placement = 'bottom' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target) &&
          toggleRef.current && !toggleRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const positionPopover = () => {
    if (!toggleRef.current || !popoverRef.current) return;

    const toggleRect = toggleRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();

    let top = toggleRect.bottom + window.scrollY;
    let left = toggleRect.left + window.scrollX;

    if (placement === 'bottom') {
      top = toggleRect.bottom + window.scrollY + 8;
      left = toggleRect.left + window.scrollX;
    } else if (placement === 'top') {
      top = toggleRect.top + window.scrollY - popoverRect.height - 8;
      left = toggleRect.left + window.scrollX;
    }

    // Keep within viewport
    if (left + popoverRect.width > window.innerWidth) {
      left = window.innerWidth - popoverRect.width - 16;
    }

    popoverRef.current.style.top = `${top}px`;
    popoverRef.current.style.left = `${left}px`;
  };

  useEffect(() => {
    if (isOpen) {
      positionPopover();
    }
  }, [isOpen]);

  return (
    <div className="popover-wrapper">
      <button
        ref={toggleRef}
        className="popover-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {toggleText}
      </button>
      
      {isOpen && (
        <div
          ref={popoverRef}
          className={`popover ${placement}`}
          data-placement={placement}
        >
          <div className="popover-arrow"></div>
          <div className="popover-content">
            {children}
            <button
              className="popover-close"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;



