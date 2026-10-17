import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { allArtworks } from '../data/artworks';
import { Icon } from './Icons';

interface Props {
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}
const clamp = (x: number, min: number, max: number) => Math.min(max, Math.max(min, x));

export function ArtworkViewer({ index, onClose, onChange }: Props) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [wall, setWall] = useState<'ivory' | 'stone' | 'charcoal'>('ivory');
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ startScale: 1, startDistance: 0, x: 0, y: 0, pointerX: 0, pointerY: 0 });
  const offsetRef = useRef(offset);
  const scaleRef = useRef(scale);
  const active = allArtworks[index];

  useEffect(() => { offsetRef.current = offset; }, [offset]);
  useEffect(() => { scaleRef.current = scale; }, [scale]);
  useEffect(() => { setScale(1); setOffset({ x: 0, y: 0 }); pointers.current.clear(); }, [index]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = oldOverflow; previous?.focus?.(); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % allArtworks.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + allArtworks.length) % allArtworks.length);
      if (e.key === '+' || e.key === '=') setScale(s => clamp(s + 0.25, 1, 3.5));
      if (e.key === '-') setScale(s => clamp(s - 0.25, 1, 3.5));
      if (e.key === '0') { setScale(1); setOffset({ x: 0, y: 0 }); }
      if (e.key === 'Tab') {
        const nodes = document.querySelectorAll<HTMLElement>('.viewer button:not([disabled])');
        if (!nodes.length) return;
        const first = nodes[0]; const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onClose, onChange]);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale(prev => clamp(prev + (e.deltaY < 0 ? 0.16 : -0.16), 1, 3.5));
    };
    node.addEventListener('wheel', wheel, { passive: false });
    return () => node.removeEventListener('wheel', wheel);
  }, []);

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest('button')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      gesture.current = { ...gesture.current, x: offsetRef.current.x, y: offsetRef.current.y, pointerX: e.clientX, pointerY: e.clientY };
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current.startDistance = Math.hypot(a.x - b.x, a.y - b.y);
      gesture.current.startScale = scaleRef.current;
    }
  }
  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (gesture.current.startDistance) setScale(clamp(gesture.current.startScale * distance / gesture.current.startDistance, 1, 3.5));
    } else if (pointers.current.size === 1 && scaleRef.current > 1) {
      setOffset({ x: gesture.current.x + e.clientX - gesture.current.pointerX, y: gesture.current.y + e.clientY - gesture.current.pointerY });
    }
  }
  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 1) {
      const [p] = [...pointers.current.values()];
      gesture.current = { ...gesture.current, x: offsetRef.current.x, y: offsetRef.current.y, pointerX: p.x, pointerY: p.y };
    }
  }
  function zoom(delta: number) {
    setScale(s => {
      const next = clamp(s + delta, 1, 3.5);
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  }
  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label={`Artwork viewer: ${active.title}`}>
      <div className="viewer__head">
        <div className="viewer__identity"><span className="viewer__kicker">THE VIEWING ROOM / {active.index}</span><strong>{active.title}</strong></div>
        <button ref={closeRef} className="viewer__close icon-button" onClick={onClose} aria-label="Close artwork viewer"><Icon name="close" size={21}/></button>
      </div>
      <div className={`viewer__stage viewer__stage--${wall}`} ref={stageRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onDoubleClick={() => zoom(scale < 1.7 ? 0.7 : -0.7)}>
        <img className="viewer__image" src={active.img} draggable={false} alt={active.alt} style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})` }}/>
      </div>
      <div className="viewer__foot">
        <div className="viewer__wall" role="group" aria-label="Gallery wall colour">
          {(['ivory','stone','charcoal'] as const).map(w => <button key={w} type="button" className={`wall-chip wall-chip--${w}${wall === w ? ' is-active' : ''}`} aria-pressed={wall === w} aria-label={`${w} background`} onClick={() => setWall(w)} />)}
          <span className="viewer__hint">WALL</span>
        </div>
        <div className="viewer__tools" aria-label="Viewing controls">
          <button className="icon-button" onClick={() => zoom(-0.25)} aria-label="Zoom out" disabled={scale === 1}><Icon name="minus"/></button>
          <span className="viewer__zoom" aria-live="polite">{Math.round(scale * 100)}%</span>
          <button className="icon-button" onClick={() => zoom(0.25)} aria-label="Zoom in" disabled={scale === 3.5}><Icon name="plus"/></button>
          <button className="icon-button" onClick={() => { setScale(1); setOffset({ x: 0, y: 0 }); }} aria-label="Reset view"><Icon name="reset"/></button>
        </div>
        <div className="viewer__pager">
          <button className="icon-button" aria-label="Previous artwork" onClick={() => onChange((index - 1 + allArtworks.length) % allArtworks.length)}><Icon name="chevron-left"/></button>
          <span>{String(index + 1).padStart(2,'0')} / {String(allArtworks.length).padStart(2,'0')}</span>
          <button className="icon-button" aria-label="Next artwork" onClick={() => onChange((index + 1) % allArtworks.length)}><Icon name="chevron-right"/></button>
        </div>
      </div>
      <span className="viewer__sr sr-only">Use the arrow keys to move between artworks, plus and minus to zoom, zero to reset, and Escape to close.</span>
    </div>
  );
}
