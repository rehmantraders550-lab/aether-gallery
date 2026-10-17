export interface Artwork {
  id: string;
  title: string;
  romanization: string;
  gloss: string;
  img: string;
  alt: string;
  index: string;
  note: string;
  type: 'panel' | 'ensemble';
}

export const triptych: Artwork = {
  id: 'triptych',
  title: 'The Language of Remembrance',
  romanization: 'A three-part study',
  gloss: 'Three expressions of remembrance',
  img: '/artworks/triptych-study.webp',
  alt: 'Three vertically oriented canvas artworks with Arabic calligraphy, beige marbling and gold-toned detailing, photographed together on a white background.',
  index: '00',
  note: 'The complete three-canvas ensemble, cropped from the original supplied photograph without alteration to its visible artwork.',
  type: 'ensemble',
};

export const panels: Artwork[] = [
  {
    id: 'subhan-allah',
    title: 'Subhan Allah',
    romanization: 'Subḥān Allāh',
    gloss: 'Glory be to God',
    img: '/artworks/subhan-allah-study.webp',
    alt: 'Left canvas of the original triptych, bearing Subhan Allah calligraphy over cream marble-like artwork and gold-toned detailing.',
    index: '01',
    note: 'The first panel introduces fine veins, gold-toned accents and expressive calligraphic movement.',
    type: 'panel',
  },
  {
    id: 'alhamdulillah',
    title: 'Alhamdulillah',
    romanization: 'Al-ḥamdu lillāh',
    gloss: 'Praise be to God',
    img: '/artworks/alhamdulillah-study.webp',
    alt: 'Central canvas of the original triptych, bearing Alhamdulillah calligraphy in warm brown and gold-toned outlines.',
    index: '02',
    note: 'The central panel gathers the most pronounced movement in its layered, marble-like composition.',
    type: 'panel',
  },
  {
    id: 'allahu-akbar',
    title: 'Allahu Akbar',
    romanization: 'Allāhu akbar',
    gloss: 'God is greatest',
    img: '/artworks/allahu-akbar-study.webp',
    alt: 'Right canvas of the original triptych with Allahu Akbar Arabic calligraphy, beige marbling and gold-toned accents.',
    index: '03',
    note: 'The closing panel balances bold lettering with a light, open surface.',
    type: 'panel',
  },
];

export const allArtworks: Artwork[] = [triptych, ...panels];
