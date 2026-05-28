import React from 'react';

export interface SupportSlideData {
  id: number;
  title: React.ReactNode;
  image: string;
  bottomText: string;
  imageScale?: string;
}

export const SUPPORT_SLIDES: SupportSlideData[] = [
  {
    id: 0,
    title: (
      <h2 className="text-[2.2rem] md:text-[2.5rem] tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
        <span className="text-[#34c759]">you are not </span>
        <span className="text-[#5B81A8]">alone</span>
      </h2>
    ),
    image: "https://i.postimg.cc/Z5WGJxxG/photo-2026-05-14-14-47-46.jpg",
    bottomText: "we're here to support you anytime",
    imageScale: "scale-[1.05] pb-2"
  },
  {
    id: 1,
    title: (
      <h2 className="text-[2.1rem] md:text-[2.25rem] tracking-wide text-[#5B81A8]" style={{ fontFamily: 'var(--font-playfair)' }}>
        start your healing journey
      </h2>
    ),
    image: "https://i.postimg.cc/RFds7WTR/photo-2026-05-14-14-47-38.jpg",
    bottomText: "",
    imageScale: "scale-[1.05]"
  },
  {
    id: 2,
    title: <div className="h-[2.5rem] md:h-[3rem]" aria-hidden="true" />,
    image: "https://i.postimg.cc/HsRS9DQs/photo-2026-05-14-14-47-29.jpg",
    bottomText: "Energy needs direction, not suppression",
    imageScale: "scale-[0.95] md:scale-[0.85] pb-2"
  }
];
