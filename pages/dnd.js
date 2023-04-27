import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from 'immutability-helper';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useEffect } from "react";

const Box = ({ id, color, index, moveBox }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "box",
    item: { id, index, type: "box" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "box",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveBox(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop: () => ({ index }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  const ref = React.useRef(null);
  drag(drop(ref));

  return (
    <div
      className="box"
      ref={ref}
      style={{ backgroundColor: color, opacity }}
    />
  );
};

export default function DnD() {
  const [boxes, setBoxes] = useState([
    { id: 1, color: "red" },
    { id: 2, color: "green" },
    { id: 3, color: "blue" },
    { id: 4, color: "orange" },
    { id: 5, color: "purple" },
  ]);

  const moveBox = (dragIndex, hoverIndex) => {
    const draggedBox = boxes[dragIndex];
    setBoxes(
      update(boxes, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedBox],
        ],
      })
    );
  };

  //Current bug:
  //On prod, on mobile DnD is not working
  //It defaults to the HTML5Backend because of the 1st render
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    console.log("isMobile:" + isMobile)
  }, [isMobile])


  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="container">
        {boxes.map((box, index) => (
          <Box
            key={box.id}
            id={box.id}
            color={box.color}
            index={index}
            moveBox={moveBox}
          />
        ))}
      </div>
    </DndProvider>
  );
}