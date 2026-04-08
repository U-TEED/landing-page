'use client';

import { useEffect, useState, RefObject } from 'react';

interface IntroSectionProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export default function IntroSection({ sectionRef }: IntroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [sectionRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight * 0.5)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRef]);

  const showSecondPhrase = scrollProgress > 0.5;

  return (
    <section 
      ref={sectionRef as RefObject<HTMLElement>}
      className="intro-section"
      id="intro"
    >
      <div className={`intro-content ${isVisible ? 'visible' : ''}`}>
        <div className="catchphrase-container">
          <div className={`catchphrase-text ${!showSecondPhrase ? 'active' : ''}`}>
            <span className="catchphrase-main">Fast to Act.</span>
          </div>
          <div className={`catchphrase-text ${showSecondPhrase ? 'active' : ''}`}>
            <span className="catchphrase-main">Smart in Action.</span>
          </div>
        </div>
        <p className="intro-description">
          U-TEED는 빠른 실행력과 스마트한 기술로<br />
          일상의 문제를 해결합니다.
        </p>
        <div className="intro-stats">
          <div className="intro-stat">
            <span className="stat-number">2+</span>
            <span className="stat-label">서비스 운영 중</span>
          </div>
          <div className="intro-stat">
            <span className="stat-number">6+</span>
            <span className="stat-label">팀원</span>
          </div>
          <div className="intro-stat">
            <span className="stat-number">2024</span>
            <span className="stat-label">설립년도</span>
          </div>
        </div>
      </div>
      <div className="intro-scroll-indicator">
        <span>스크롤하여 서비스 보기</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
}
