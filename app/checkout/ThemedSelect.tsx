'use client';

/**
 * A themed replacement for <select> on /checkout. The native popup is drawn by
 * the browser / OS and cannot be styled, so this renders its own listbox.
 *
 * ARIA: button[aria-haspopup=listbox] + ul[role=listbox] with
 * aria-activedescendant. Keys: ↑ ↓ Home End Enter Space Esc Tab, and
 * type-ahead by first letters.
 */

import { useCallback, useEffect, useId, useRef, useState } from 'react';

export type SelectOption = { value: string; label: string };

/* Room the docked mobile pay bar takes at the bottom of the viewport. */
const DOCK_PX = 150;
const LIST_MAX_PX = 280;

export function ThemedSelect({
  value,
  options,
  onChange,
  ariaLabel,
  placeholder,
  invalid,
  className,
}: {
  value: string;
  options: SelectOption[];
  onChange: (v: string) => void;
  ariaLabel?: string;
  placeholder?: string;
  invalid?: boolean;
  className?: string;
}) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const [active, setActive] = useState(0);
  const typed = useRef({ text: '', at: 0 });

  const selectedIdx = options.findIndex((o) => o.value === value);
  const selected = selectedIdx >= 0 ? options[selectedIdx] : undefined;

  const openList = useCallback(() => {
    const r = btnRef.current?.getBoundingClientRect();
    if (r) {
      const dock = window.innerWidth < 1000 ? DOCK_PX : 16;
      const below = window.innerHeight - r.bottom - dock;
      setUp(below < Math.min(LIST_MAX_PX, options.length * 44) && r.top > below);
    }
    setActive(selectedIdx >= 0 ? selectedIdx : 0);
    setOpen(true);
  }, [options.length, selectedIdx]);

  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) btnRef.current?.focus();
  }, []);

  const pick = (i: number) => {
    const o = options[i];
    if (o) onChange(o.value);
    close();
  };

  /* Outside click / tap closes without stealing focus. */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open, close]);

  /* Keep the active option in view. */
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const typeAhead = (ch: string) => {
    const now = Date.now();
    const t = typed.current;
    t.text = now - t.at > 700 ? ch : t.text + ch;
    t.at = now;
    const q = t.text.toLowerCase();
    const i = options.findIndex((o) => o.value !== '' && o.label.toLowerCase().startsWith(q));
    if (i >= 0) {
      if (open) setActive(i);
      else onChange(options[i].value);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    const last = options.length - 1;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) openList();
        else setActive((a) => Math.min(last, a + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!open) openList();
        else setActive((a) => Math.max(0, a - 1));
        break;
      case 'Home':
        if (open) { e.preventDefault(); setActive(0); }
        break;
      case 'End':
        if (open) { e.preventDefault(); setActive(last); }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (open) pick(active);
        else openList();
        break;
      case 'Escape':
        if (open) { e.preventDefault(); close(); }
        break;
      case 'Tab':
        if (open) close(false);
        break;
      default:
        if (e.key.length === 1 && /\S/.test(e.key)) typeAhead(e.key);
    }
  };

  return (
    <div ref={rootRef} className={`tsel${open ? ' is-open' : ''}${up ? ' is-up' : ''}${className ? ` ${className}` : ''}`}>
      <button
        ref={btnRef}
        type="button"
        className={`tsel-btn${selected && selected.value !== '' ? '' : ' is-placeholder'}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        aria-activedescendant={open ? `${id}-o${active}` : undefined}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onKey}
      >
        <span className="tsel-val">{selected?.label ?? placeholder ?? ''}</span>
        <svg className="tsel-caret" viewBox="0 0 24 24" aria-hidden width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul ref={listRef} id={`${id}-list`} role="listbox" className="tsel-list" aria-label={ariaLabel} tabIndex={-1}>
          {options.map((o, i) => {
            const isSel = i === selectedIdx;
            return (
              <li
                key={`${o.value}-${i}`}
                id={`${id}-o${i}`}
                data-i={i}
                role="option"
                aria-selected={isSel}
                className={`tsel-opt${i === active ? ' is-active' : ''}${isSel ? ' is-sel' : ''}${o.value === '' ? ' is-placeholder' : ''}`}
                onPointerEnter={() => setActive(i)}
                /* pointerdown would blur first on iOS; click keeps the tap. */
                onClick={() => pick(i)}
              >
                <span>{o.label}</span>
                {isSel && (
                  <svg viewBox="0 0 24 24" aria-hidden width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
