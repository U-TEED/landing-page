'use client';

import { useEffect, useState, useRef, RefObject } from 'react';

interface IntroSectionProps {
  sectionRef: RefObject<HTMLElement | null>;
}

const phrases = [
  { text: 'Fast to Act.', sub: '빠르게 행동하고' },
  { text: 'Smart in Action.', sub: '똑똑하게 실행합니다' },
];

export default function IntroSection({ sectionRef }: IntroSectionProps) {
  const [visibleSlides, setVisibleSlides] = useState<boolean[]>(new Array(phrases.length + 1).fill(false));
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    slideRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSlides(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <div ref={sectionRef as RefObject<HTMLDivElement>} className="intro-wrapper" id="intro">
      {phrases.map((phrase, i) => (
        <div
          key={i}
          ref={el => { slideRefs.current[i] = el; }}
          className="intro-slide"
        >
          <div className={`intro-phrase ${visibleSlides[i] ? 'visible' : ''}`}>
            <h1 className="phrase-text">{phrase.text}</h1>
            <p className="phrase-sub">{phrase.sub}</p>
          </div>
          <div className="intro-scroll-indicator">
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      ))}
      
      <div
        ref={el => { slideRefs.current[phrases.length] = el; }}
        className="intro-slide intro-about"
      >
        <div className={`intro-content ${visibleSlides[phrases.length] ? 'visible' : ''}`}>
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
      </div>
    </div>
  );
}
