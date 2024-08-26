// Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Sidebar.css";

const Sidebar = () => {
  const defaultWidth = 250; // Default width of the sidebar when expanded
  const defaultMinWidth = 80; //Deafult minimum width of the sidebar when collapsed
  const [isCollapsed, setIsCollapsed] = useState(false); // State to track if the sidebar is collapsed
  const [width, setWidth] = useState(defaultWidth); // State to track the current width of the sidebar

  // Function to handle the toggle button click
  const handleToggle = () => {
    if (isCollapsed && width === defaultMinWidth) {
      // If the sidebar is collapsed and its width is defaultMinWidthpx, reset to default width
      setWidth(defaultWidth);
    }
    // Toggle the collapsed state
    setIsCollapsed(!isCollapsed);
  };

  // Function to handle the start of the mouse drag
  const handleMouseDown = (e) => {
    // Prevent text selection during dragging
    document.body.style.userSelect = "none";

    // Start listening to mouse movement and mouse up events
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Function to handle the mouse movement during dragging
  const handleMouseMove = (e) => {
    // Calculate the new width based on the mouse position
    const newWidth = e.clientX > defaultMinWidth ? e.clientX : defaultMinWidth;
    setWidth(newWidth);

    // Automatically expand the sidebar if the width is more than defaultMinWidthpx
    if (newWidth > defaultMinWidth) {
      setIsCollapsed(false);
    } else if (newWidth === defaultMinWidth) {
      // Collapse the sidebar if the width is exactly defaultMinWidthpx
      setIsCollapsed(true);
    }
  };

  // Function to handle the end of the mouse drag
  const handleMouseUp = () => {
    // Allow text selection again after dragging
    document.body.style.userSelect = "auto";

    // Stop listening to mouse movement and mouse up events
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Function to handle double-click on the resizer
  const handleDoubleClick = () => {
    // Reset the width to the default value and expand the sidebar
    setWidth(defaultWidth);
    setIsCollapsed(false);
  };

  return (
    <div
      className="sidebar"
      style={{
        width: isCollapsed ? `${defaultMinWidth}px` : `${width}px`, // Set the width based on whether the sidebar is collapsed or not
        transition: "width 0.3s", // Smooth transition when width changes
      }}
    >
      <div className="sidebar-content">
        <Button
          variant="light"
          className="toggle-btn w-auto"
          onClick={handleToggle}
        >
          <img src="/menu.svg" alt="menu" height={28} />{" "}
          {/* Toggle button to collapse or expand the sidebar */}
        </Button>
        <div className="content">
          {!isCollapsed ? (
            <>
              {/* Full Sidebar Content */}
              <img
                src="https://picsum.photos/256"
                alt="Logo"
                className="full-logo"
              />
              <p>Sidebar Content</p>
            </>
          ) : (
            <>
              {/* Collapsed Sidebar Content */}
              <img
                src="https://picsum.photos/256"
                alt="Logo"
                className="collapsed-logo"
              />
            </>
          )}
        </div>
      </div>
      <div
        className="resizer"
        onMouseDown={handleMouseDown} // Start resizing on mouse down
        onDoubleClick={handleDoubleClick} // Reset to default width on double-click
      />
    </div>
  );
};

export default Sidebar;
