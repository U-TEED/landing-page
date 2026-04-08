'use client';

import { useRef, useEffect, useState, MutableRefObject, useCallback } from 'react';
import Header from '@/components/Header';
import IntroSection from '@/components/IntroSection';
import ParallaxSection from '@/components/ParallaxSection';
import FooterSection from '@/components/FooterSection';
import SurveyPopup from '@/components/SurveyPopup';
import { Section } from '@/types';

const sections: Section[] = [
  {
    title: 'Your Game, Our SITE',
    highlight: 'SITE',
    hashtag: '#농구_픽업게임을_앱에서_손쉽게 #농구_대회_찾을_때는_SITE',
    image: null,
    detailLink: '/detail/1',
  },
  {
    title: 'AI 음성 통화 기반 경도인지장애 케어',
    highlight: 'BeepBeep',
    hashtag: '#고령_부모님의_인지기능_관리 #AI_음성_모니터링',
    image: null,
    detailLink: '/detail/2',
  },
];

function MainContent({ sectionRefs, introRef }: { sectionRefs: MutableRefObject<HTMLElement | null>[], introRef: MutableRefObject<HTMLElement | null> }) {
  const [scrollY, setScrollY] = useState(0);
  const [footerInView, setFooterInView] = useState(false);
  const [showSurveyPopup, setShowSurveyPopup] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const footerRef = useRef<HTMLElement>(null!);

  const getAllSections = useCallback(() => {
    const introSlides = document.querySelectorAll('.intro-slide');
    const parallaxSections = document.querySelectorAll('.parallax-section');
    const footer = document.querySelector('.footer-section');
    
    const allSections: Element[] = [];
    introSlides.forEach(el => allSections.push(el));
    parallaxSections.forEach(el => allSections.push(el));
    if (footer) allSections.push(footer);
    
    return allSections;
  }, []);

  const getCurrentSectionIndex = useCallback(() => {
    const allSections = getAllSections();
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    
    for (let i = 0; i < allSections.length; i++) {
      const rect = allSections[i].getBoundingClientRect();
      if (rect.top >= -windowHeight / 2 && rect.top < windowHeight / 2) {
        return i;
      }
    }
    return 0;
  }, [getAllSections]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const allSections = getAllSections();
      const currentIndex = getCurrentSectionIndex();
      
      let nextIndex = currentIndex;
      if (e.deltaY > 0 && currentIndex < allSections.length - 1) {
        nextIndex = currentIndex + 1;
      } else if (e.deltaY < 0 && currentIndex > 0) {
        nextIndex = currentIndex - 1;
      }

      if (nextIndex !== currentIndex) {
        e.preventDefault();
        setIsScrolling(true);
        allSections[nextIndex].scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
          setIsScrolling(false);
        }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isScrolling, getAllSections, getCurrentSectionIndex]);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const hideUntilStr = window.localStorage.getItem('surveyPopupHideUntil') || '0';
      const hideUntil = parseInt(hideUntilStr, 10);
      if (hideUntil > Date.now()) {
        return;
      }
    } catch {
      // ignore storage errors
    }
    const timer = setTimeout(() => {
      setShowSurveyPopup(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const closeSurveyPopup = () => {
    setShowSurveyPopup(false);
  };

  return (
    <div className="App snap-container">
      <SurveyPopup isOpen={showSurveyPopup} onClose={closeSurveyPopup} />
      <IntroSection sectionRef={introRef} />
      {sections.map((sec, i) => (
        <ParallaxSection
          key={i}
          {...sec}
          index={i}
          scrollY={scrollY}
          sectionRef={sectionRefs[i]}
          id={i === 0 ? 'service' : `section-${i + 1}`}
        />
      ))}
      <FooterSection visible={footerInView} footerRef={footerRef} />
    </div>
  );
}

export default function Home() {
  const introRef = useRef<HTMLElement | null>(null);
  const sectionRefs = [
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
  ];

  const handleNavClick = (id: string) => {
    if (id === 'contact') {
      document.querySelector('.footer-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (id === 'intro') {
      introRef?.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (id === 'service') {
      sectionRefs[0]?.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    sectionRefs[0]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header onNavClick={handleNavClick} />
      <MainContent sectionRefs={sectionRefs} introRef={introRef} />
    </>
  );
}

