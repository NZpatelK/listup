'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const rowSize = 100;

export default function SortableListPage() {
  const containerRef = useRef(null);
  const [items, setItems] = useState(['Alpha', 'Bravo', 'Charlie', 'Delta']);
  const itemRefs = useRef([]);
  const sortables = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.to(container, { autoAlpha: 1, duration: 0.5 });

    // Clear old sortables
    sortables.current = [];

    itemRefs.current.forEach((element, index) => {
      const sortable = createSortable(element, index, items.length, (from, to) => {
        // Update state order
        setItems((prev) => {
          const arr = [...prev];
          const moved = arr.splice(from, 1)[0];
          arr.splice(to, 0, moved);
          return arr;
        });

        // Reorder sortables array
        const movedSortable = sortables.current.splice(from, 1)[0];
        sortables.current.splice(to, 0, movedSortable);

        // Update indexes
        sortables.current.forEach((s, i) => s.setIndex(i));
      });

      sortables.current.push(sortable);
    });
  }, [items.length]);

  useEffect(() => {
    // Update layout on render
    sortables.current.forEach((s, i) => s.setIndex(i));
  }, [items]);

  return (
    <div style={{ padding: '2rem' }}>
      <section
        ref={containerRef}
        className="container"
        style={{ minHeight: rowSize * items.length, position: 'relative' }}
      >
        {items.map((item, index) => (
          <div
            className="list-item"
            key={item}
            ref={(el) => (itemRefs.current[index] = el)}
            style={{ position: 'absolute', left: 0, right: 0 }}
          >
            <div className="item-content text-gray-800" style={{
              background: 'white',
              boxShadow: '0 0 4px rgba(0,0,0,0.1)',
              padding: '1rem',
              borderRadius: '0.5rem',
              display: 'flex',
              gap: '1rem'
            }}>
              <span className="order" style={{ width: '2rem' }}>{index + 1}</span>
              {item}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function createSortable(element, index, total, onIndexChange) {
  const content = element.querySelector('.item-content');
  const order = element.querySelector('.order');

  const sortable = {
    element,
    index,
    setIndex: (i) => {
      sortable.index = i;
      if (order) order.textContent = `${i + 1}`;
      if (!dragger.isDragging) layout(i);
    }
  };

  function layout(i) {
    gsap.to(element, { y: i * rowSize, duration: 0.3 });
  }

  const animation = gsap.to(content, {
    boxShadow: 'rgba(0,0,0,0.2) 0px 16px 32px 0px',
    scale: 1.1,
    duration: 0.3,
    paused: true,
    force3D: true
  });

  const dragger = Draggable.create(element, {
    type: 'y',
    onDragStart: function () {
      animation.play();
      this.update();
    },
    onDrag: function () {
      const newIndex = clamp(Math.round(this.y / rowSize), 0, total - 1);
      if (newIndex !== sortable.index) {
        onIndexChange(sortable.index, newIndex);
      }
    },
    onRelease: function () {
      animation.reverse();
      layout(sortable.index);
    },
    cursor: 'inherit'
  })[0];

  sortable.setIndex(index);
  return sortable;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}
