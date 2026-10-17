import { useCallback, useEffect, useRef, useState } from 'react';
import { AetherButton } from './components/AetherButton';
import { ArtworkViewer } from './components/ArtworkViewer';
import { Icon } from './components/Icons';
import { allArtworks, panels, triptych } from './data/artworks';

type Wall = 'ivory' | 'stone' | 'charcoal';
const wallNames: Record<Wall,string> = { ivory:'Warm ivory', stone:'Soft stone', charcoal:'Deep charcoal' };

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <a href="#top" className={`brand${inverse ? ' brand--inverse' : ''}`} aria-label="Aether Gallery — back to top">
    <span className="brand__mark" aria-hidden="true"><span/></span>
    <span className="brand__word">AETHER</span>
    <span className="brand__sub">GALLERY</span>
  </a>;
}

function Header({ onExplore }: { onExplore: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); }; window.addEventListener('keydown',onKey); return () => window.removeEventListener('keydown',onKey); },[]);
  return <header className="header">
    <div className="header__inner page-shell">
      <Brand/>
      <nav className={`header__nav${menuOpen ? ' is-open' : ''}`} id="primary-nav" aria-label="Primary navigation">
        <a href="#collection" onClick={() => setMenuOpen(false)}>The collection</a>
        <a href="#story" onClick={() => setMenuOpen(false)}>The exhibition</a>
        <a href="#viewing-room" onClick={() => setMenuOpen(false)}>Viewing room</a>
        <a href="#notes" onClick={() => setMenuOpen(false)}>Field notes</a>
      </nav>
      <div className="header__right">
        <AetherButton className="header__cta" onClick={onExplore}>Enter gallery</AetherButton>
        <button className="header__menu icon-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(s => !s)}><Icon name={menuOpen ? 'close' : 'menu'} size={22}/></button>
      </div>
    </div>
  </header>;
}

function Hero({ onExplore }: { onExplore: () => void }) {
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero__editorial">
      <div className="hero__editorial-inner">
        <div className="eyebrow eyebrow--pale"><span className="eyebrow__diamond"/>AETHER / EXHIBITION 001</div>
        <h1 id="hero-title">The language <em>of the soul.</em></h1>
        <p className="hero__lead">A quiet encounter with three expressions of remembrance, composed in calligraphy, light and marbled colour.</p>
        <AetherButton onClick={onExplore}>Explore the exhibition</AetherButton>
        <div className="hero__index"><span>01 / 03</span><span className="hairline"/><span>THE LANGUAGE OF REMEMBRANCE</span></div>
      </div>
    </div>
    <div className="hero__gallery">
      <div className="hero__image-wrap"><img src={triptych.img} alt={triptych.alt} fetchPriority="high" /></div>
      <div className="hero__caption"><span>FIG. 01 / COMPLETE ENSEMBLE</span><span>THE LANGUAGE OF REMEMBRANCE</span></div>
      <span className="hero__rule hero__rule--left" aria-hidden="true"/><span className="hero__rule hero__rule--right" aria-hidden="true"/>
    </div>
  </section>;
}

function SectionHeading({ number, eyebrow, title, description, id }: { number:string; eyebrow:string; title:string; description?:string; id?:string }) {
  return <div className="section-heading"><div className="section-heading__meta"><span>{number} / {eyebrow}</span><span className="section-heading__line"/></div><div className="section-heading__content"><h2 id={id}>{title}</h2>{description && <p>{description}</p>}</div></div>;
}

function Collection({ onOpen }: { onOpen: (index: number) => void }) {
  return <section className="collection section" id="collection" aria-labelledby="collection-title">
    <div className="page-shell">
      <SectionHeading id="collection-title" number="01" eyebrow="SELECTED WORKS" title="Three expressions. One reflection." description="An intimate three-part study, presented as individual works and as a complete ensemble."/>
      <div className="collection__grid">
        {panels.map((art,i) => <button className="art-card" key={art.id} type="button" onClick={() => onOpen(i + 1)} aria-label={`View ${art.title} in the artwork viewer`}>
          <div className="art-card__image"><img loading="lazy" src={art.img} alt={art.alt}/><span className="art-card__hover"><Icon name="expand" size={20}/><span>EXAMINE WORK</span></span></div>
          <div className="art-card__footer"><div><span className="art-card__number">WORK {art.index} / 03</span><h3>{art.title}</h3><p>{art.gloss}</p></div><span className="art-card__arrow"><Icon name="arrow-right" size={18}/></span></div>
        </button>)}
      </div>
      <div className="collection__foot"><span>THREE PANELS / ONE COMPOSITION</span><button className="text-link" onClick={() => onOpen(0)}>VIEW THE COMPLETE ENSEMBLE <Icon name="arrow" size={16}/></button></div>
    </div>
  </section>;
}

function Story() {
  return <section className="story" id="story">
    <div className="story__image"><img src="/artworks/material-detail.webp" loading="lazy" alt="Authentic close-up crop of the central artwork showing calligraphic contours, translucent marble-like tones and gold-coloured flecks."/><span className="story__image-index">DETAIL STUDY / 002</span></div>
    <div className="story__copy"><div className="eyebrow eyebrow--pale">02 / THE EXHIBITION</div><h2>There is meaning <em>in the details.</em></h2><p>Across the three canvases, warm veining, pale translucent forms and gold-toned marks surround the lettering. The composition rewards a slower kind of looking.</p><p className="story__secondary">What appears as texture and metallic detail is described here as visible appearance. Actual substrate, print process and finishes have not been independently verified.</p><a className="underlined-link" href="#viewing-room">ENTER THE VIEWING ROOM <Icon name="arrow" size={17}/></a><span className="story__number">II.</span></div>
  </section>;
}

function ViewingRoom({ onOpen }: { onOpen: (index: number) => void }) {
  const [wall, setWall] = useState<Wall>('stone');
  const [selected, setSelected] = useState(0);
  const active = allArtworks[selected];
  return <section className="room section" id="viewing-room">
    <div className="page-shell">
      <SectionHeading number="03" eyebrow="PRIVATE VIEWING ROOM" title="A place to look closer." description="Change the surrounding wall, examine the original composition, and explore individual panels without changing the artwork itself."/>
      <div className="room__layout">
        <div className={`room__stage room__stage--${wall}`}><div className={`room__mount${selected === 0 ? ' room__mount--wide' : ''}`}><img src={active.img} alt={active.alt}/></div><span className="room__wall-label">WALL / {wallNames[wall].toUpperCase()}</span></div>
        <aside className="room__console"><div className="room__console-top"><span className="eyebrow">GALLERY CONTROLS / 001</span><h3>Examine the <em>work.</em></h3><p>Switch views and backgrounds. The image remains true to the supplied source.</p></div>
          <div className="control-block"><span className="control-block__label">01 / COMPOSITION</span><div className="composition-list" role="group" aria-label="Select artwork view">{allArtworks.map((art,i) => <button key={art.id} className={`composition-option${selected===i?' is-active':''}`} onClick={() => setSelected(i)} aria-pressed={selected===i}><span>{art.index}</span>{art.type === 'ensemble' ? 'Complete triptych' : art.title}<Icon name="arrow-right" size={15}/></button>)}</div></div>
          <div className="control-block"><span className="control-block__label">02 / WALL SURFACE</span><div className="surface-choices" role="group" aria-label="Select gallery wall surface">{(['ivory','stone','charcoal'] as const).map(w => <button key={w} className={`surface-choice surface-choice--${w}${wall===w?' is-active':''}`} aria-label={wallNames[w]} aria-pressed={wall===w} onClick={() => setWall(w)}><span className="surface-choice__dot"/><span>{wallNames[w]}</span></button>)}</div></div>
          <AetherButton className="room__open" onClick={() => onOpen(selected)}>Open artwork viewer</AetherButton>
        </aside>
      </div>
    </div>
  </section>;
}

function Notes() {
  return <section className="notes section" id="notes"><div className="page-shell notes__layout"><div><span className="eyebrow">04 / FIELD NOTES</span><h2>Art, not <em>an interface.</em></h2></div><div className="notes__content"><p>For this exhibition, the original three-canvas photograph is the authoritative visual reference. Every artwork image shown here is either that photograph or a pixel-preserving crop of it.</p><p>More detailed documentation, artist attribution, physical dimensions and production specifications can be added when verified. Until then, the gallery makes no claims it cannot support.</p><div className="notes__signature"><span className="notes__line"/><span>AETHER / CURATORIAL STUDY 001</span></div></div></div></section>;
}

function Footer() { return <footer className="footer"><div className="page-shell footer__top"><div><span className="eyebrow eyebrow--pale">AN ONLINE EXHIBITION</span><h2>Look a little <em>closer.</em></h2><p>Thoughtful viewing, without the noise.</p></div><AetherButton href="#top">Back to the beginning</AetherButton></div><div className="page-shell footer__bottom"><Brand inverse/><span>CONCEPT STUDY / THE LANGUAGE OF REMEMBRANCE</span><span>© {new Date().getFullYear()} AETHER GALLERY</span></div></footer>; }

export default function App() {
  const [viewerIndex, setViewerIndex] = useState<number|null>(null);
  const openViewer = useCallback((index: number) => setViewerIndex(index), []);
  const onClose = useCallback(() => setViewerIndex(null), []);
  const onChange = useCallback((index: number) => setViewerIndex(index), []);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!('IntersectionObserver' in window)) return; const elements = rootRef.current?.querySelectorAll('.section-heading, .art-card, .story__copy, .notes__layout'); if (!elements) return; const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); } }), { threshold:0.08 }); elements.forEach(el => { el.classList.add('reveal');observer.observe(el); }); return () => observer.disconnect(); },[]);
  return <div ref={rootRef} className="site"><a href="#collection" className="skip-link">Skip to artworks</a><Header onExplore={() => openViewer(0)}/><main><Hero onExplore={() => openViewer(0)}/><Collection onOpen={openViewer}/><Story/><ViewingRoom onOpen={openViewer}/><Notes/></main><Footer/>{viewerIndex !== null && <ArtworkViewer index={viewerIndex} onChange={onChange} onClose={onClose}/>}</div>;
}
