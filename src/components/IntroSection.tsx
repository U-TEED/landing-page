'use client';

import { useEffect, useState, RefObject } from 'react';

interface IntroSectionProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export default function IntroSection({ sectionRef }: IntroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section 
      ref={sectionRef as RefObject<HTMLElement>}
      className="intro-section"
      id="intro"
    >
      <div className={`intro-content ${isVisible ? 'visible' : ''}`}>
        <span className="intro-eyebrow">About U-TEED</span>
        <h1 className="intro-title">
          기술로 일상의 문제를<br />
          해결합니다
        </h1>
        <p className="intro-description">
          U-TEED는 사람들의 일상 속 불편함을 기술로 해결하는 팀입니다.<br />
          스포츠, 헬스케어 등 다양한 영역에서 실질적인 가치를 만들어갑니다.
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
