'use client';

import { useRef, useEffect, useState, MutableRefObject } from 'react';
import Header from '@/components/Header';
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

function MainContent({ sectionRefs }: { sectionRefs: MutableRefObject<HTMLElement | null>[] }) {
  const [scrollY, setScrollY] = useState(0);
  const [footerInView, setFooterInView] = useState(false);
  const [showSurveyPopup, setShowSurveyPopup] = useState(false);
  const footerRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    window.scrollTo(0, 0);
    // 하루 동안 보지 않기 체크 여부 확인
    try {
      const hideUntilStr = window.localStorage.getItem('surveyPopupHideUntil') || '0';
      const hideUntil = parseInt(hideUntilStr, 10);
      if (hideUntil > Date.now()) {
        return;
      }
    } catch {
      // ignore storage errors
    }
    // 페이지 로딩 후 1초 뒤에 팝업 표시
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
  const sectionRefs = [
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
  ];

  const handleNavClick = (id: string) => {
    if (id === 'contact') {
      document.querySelector('.footer-section')?.scrollIntoView({ behavior: 'smooth' });
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
      <MainContent sectionRefs={sectionRefs} />
    </>
  );
}

