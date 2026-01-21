'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import styles from './site.module.css';

const EMAIL = 'site@u-teed.co.kr';
const BETA_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSePB2wt08eZymrTUKA3ZDGZV5vu5DTVhDH9kOCsEcGan6TcEQ/viewform?pli=1';

// 섹션 정의
const sections = [
  { id: 'top', label: 'Intro' },
  { id: 'service', label: '서비스' },
  { id: 'beta', label: '베타' },
  { id: 'partner', label: '파트너' },
  { id: 'team', label: '팀' },
];

// 팀원 정보 (역할별 그룹화)
const teamGroups = [
  {
    category: '기획 / 마케팅',
    members: [
      { name: '임태호', role: '대표 / 기획', desc: '서비스 총괄 및 기획', school: '연세대학교', major: '신학과', profileImage: '/images/team/임태호.png' },
      { name: '홍예찬', role: '마케팅', desc: '마케팅 전략 및 커뮤니티 운영', school: '연세대학교', major: '물리학과', profileImage: '/images/team/홍예찬.png' },
    ],
  },
  {
    category: '개발',
    members: [
      { name: '김재윤', role: 'Frontend', desc: '프론트엔드 개발, 유저 앱 개발', school: '고려대학교', major: '인공지능사이버보안학과', profileImage: '/images/team/김재윤.png' },
      { name: '정민규', role: 'Frontend', desc: '프론트엔드 개발, 관리자용 앱 개발', school: '홍익대학교', major: '소프트웨어융합학과', profileImage: '/images/team/정민규.png' },
      { name: '김진영', role: 'Backend', desc: '백엔드 개발, 서버 관리 및 운영', school: '고려대학교', major: '인공지능사이버보안학과', profileImage: '/images/team/김진영.png' },
      { name: '김명준', role: 'Backend', desc: '백엔드 개발', school: '고려대학교', major: '인공지능사이버보안학과', profileImage: '/images/team/김명준.png' },
      { name: '윤효빈', role: 'Backend', desc: '백엔드 개발', school: '고려대학교', major: '인공지능사이버보안학과', profileImage: '/images/team/윤효빈.png', inactive: true, inactiveReason: '군복무로 휴직' }
    ],
  },
  {
    category: '디자인',
    members: [
      { name: '최수진', role: 'UI/UX', desc: 'UI/UX 디자인', school: '홍익대학교', major: '시각디자인학과', profileImage: '/images/team/최수진.png' },
    ],
  },
];

export default function SiteLandingPage() {
  const footerRef = useRef<HTMLElement>(null!);
  const [activeSection, setActiveSection] = useState<string>('top');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
  };

  // Section observer for indicator
  useEffect(() => {
    if (!mounted) return;

    const sectionElements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0.1, 0.3, 0.5] }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Reveal animation - CSS 클래스 기반으로 변경
  useEffect(() => {
    if (!mounted) return;

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // reveal 클래스를 가진 모든 요소 선택
    const revealElements = document.querySelectorAll(`.${styles.reveal}`);

    if (prefersReduced) {
      revealElements.forEach((el) => el.classList.add(styles.revealIn));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealIn);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div className={styles.scrollContainer}>
      <Header onNavClick={handleNavClick} />
      <div className={styles.siteWrapper}>
        {/* Hero Section */}
      <main id="top" className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={`${styles.reveal}`} >


            <h1 className={styles.heroTitle}>
              운동할 사람과 장소를 한 번에. <br />SITE
            </h1>

            <p className={styles.sub}>
              픽업게임(게스트 모집)과 시설 탐색·예약, 운영자 관리까지
              <br />
              운동 경험을 한 흐름으로 연결합니다.
            </p>

            <div className={styles.ctaRow}>
              <a
                className={`${styles.btn} ${styles.btnPrimary}`}
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="베타 소식 미리 보기"
              >
                베타 소식 보기
                <span className={styles.hint}>↗</span>
              </a>
              <a
                className={styles.btn}
                href={`mailto:${EMAIL}?subject=${encodeURIComponent('[SITE] 간단 문의')}`}
                aria-label="간단 문의 보내기"
              >
                가볍게 문의하기
                <span className={styles.hint}>↗</span>
              </a>
            </div>

            <div className={styles.tiny}>
              지금은 베타를 준비 중이고, 3월쯤 첫 버전을 공개할 예정입니다.
            </div>
          </div>
        </div>
      </main>

      {/* Service Overview Section */}
      <section id="service" className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={`${styles.container} ${styles.sectionContent}`}>
          <div className={styles.reveal} >
            <p className={styles.eyebrow}>서비스</p>
            <h2 className={styles.h2}>서비스 한눈에</h2>

            <div className={styles.features}>
              <div className={`${styles.f} ${styles.reveal}`} >
                <h3 className={styles.fTitle}>픽업게임</h3>
                <p className={styles.fDesc}>내 주변/시간대 기준으로 찾고 신청</p>
              </div>
              <div className={`${styles.f} ${styles.reveal}`} >
                <h3 className={styles.fTitle}>시설 예약(추후)</h3>
                <p className={styles.fDesc}>나중에 시설 탐색/예약 확장</p>
              </div>
              <div className={`${styles.f} ${styles.reveal}`} >
                <h3 className={styles.fTitle}>운영자 도구(추후)</h3>
                <p className={styles.fDesc}>나중에 관리자 기능 확장</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Section */}
      <section id="beta" className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={`${styles.container} ${styles.sectionContent}`}>
          <div className={styles.reveal} >
            <p className={styles.eyebrow}>베타</p>
            <h2 className={styles.h2}>베타(3월 예정)</h2>
            <p className={styles.lead}>
              완성형으로 가기 전, 픽업게임 중심의 작은 베타부터 시작합니다.
              <br />
              예약/관리자 기능은 반응을 보며 다음 단계에서 확장합니다.
            </p>

            <div className={styles.ctaRow}>
              <a
                className={`${styles.btn} ${styles.btnPrimary}`}
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="베타 소식 남기기"
              >
                베타 소식 남기기
                <span className={styles.hint}>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section id="partner" className={styles.section}>
        <div className={`${styles.container} ${styles.sectionContent}`}>
          <div className={styles.reveal} >
            <p className={styles.eyebrow}>파트너</p>
            <h2 className={styles.h2}>시설/운영업체 파트너</h2>
            <p className={styles.lead}>
              운영 현장을 이해하기 위해, 여러 운영업체들과 이야기를 나누고 있어요.
              <br />
              베타/파일럿을 거친 뒤 예약·관리자 기능을 자연스럽게 확장할 계획입니다.
            </p>

            <div className={styles.ctaRow}>
              <a
                className={`${styles.btn} ${styles.btnPrimary}`}
                href={`mailto:${EMAIL}?subject=${encodeURIComponent('[SITE] 파트너 관련 문의')}`}
                aria-label="파트너 관련 문의하기"
              >
                파트너 얘기 나눠보기
                <span className={styles.hint}>↗</span>
              </a>
              <a
                className={styles.btn}
                href={`mailto:${EMAIL}?subject=${encodeURIComponent('[SITE] 간단 문의')}`}
                aria-label="간단 문의 보내기"
              >
                가볍게 문의하기
                <span className={styles.hint}>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={`${styles.container} ${styles.sectionContent}`}>
          <div className={styles.reveal}>
            <p className={styles.eyebrow}>Our Team</p>
            <h2 className={styles.h2}>함께 만들어가는 사람들</h2>
            <p className={styles.lead}>
              SITE는 스포츠를 사랑하는 팀원들이 모여 만들고 있습니다.
              각자의 전문성을 바탕으로 더 나은 스포츠 경험을 설계합니다.
            </p>

            {/* 기획/마케팅과 디자인을 한 행에 배치 */}
            <div className={styles.teamSplitRow}>
              {/* 왼쪽: 기획/마케팅 */}
              <div className={styles.teamGroup}>
                <h3 className={styles.teamCategoryTitle}>기획 / 마케팅</h3>
                <div className={`${styles.teamGrid} ${styles.teamGridTwo}`}>
                  {teamGroups[0].members.map((member, index) => (
                    <div key={index} className={`${styles.teamCard} ${styles.reveal}`}>
                      <div
                        className={`${styles.teamAvatar} ${member.profileImage ? styles.teamAvatarWithImage : ''}`}
                      >
                        {member.profileImage ? (
                          <Image
                            src={member.profileImage}
                            alt={`${member.name} 프로필`}
                            width={64}
                            height={64}
                            className={styles.teamAvatarImg}
                          />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </div>
                      <div className={styles.teamInfo}>
                        <b className={styles.teamName}>{member.name}</b>
                        <span className={styles.teamRole}>{member.role}</span>
                      </div>
                      <p className={styles.teamDesc}>{member.desc}</p>
                      <div className={styles.teamSchool}>
                        <span className={styles.schoolName}>{member.school}</span>
                        <span className={styles.majorName}>{member.major}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 오른쪽: 디자인 */}
              <div className={styles.teamGroup}>
                <h3 className={styles.teamCategoryTitle}>디자인</h3>
                <div className={`${styles.teamGrid} ${styles.teamGridTwo}`}>
                  {teamGroups[2].members.map((member, index) => (
                    <div key={index} className={`${styles.teamCard} ${styles.reveal}`}>
                      <div
                        className={`${styles.teamAvatar} ${member.profileImage ? styles.teamAvatarWithImage : ''}`}
                      >
                        {member.profileImage ? (
                          <Image
                            src={member.profileImage}
                            alt={`${member.name} 프로필`}
                            width={64}
                            height={64}
                            className={styles.teamAvatarImg}
                          />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </div>
                      <div className={styles.teamInfo}>
                        <b className={styles.teamName}>{member.name}</b>
                        <span className={styles.teamRole}>{member.role}</span>
                      </div>
                      <p className={styles.teamDesc}>{member.desc}</p>
                      <div className={styles.teamSchool}>
                        <span className={styles.schoolName}>{member.school}</span>
                        <span className={styles.majorName}>{member.major}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 개발 그룹 */}
            <div className={styles.teamGroup}>
              <h3 className={styles.teamCategoryTitle}>{teamGroups[1].category}</h3>
              <div className={styles.teamGrid}>
                {teamGroups[1].members.map((member, index) => (
                  <div
                    key={index}
                    className={`${styles.teamCard} ${styles.reveal} ${
                      member.inactive ? styles.teamCardInactive : ''
                    }`}
                    data-inactive-reason={member.inactive ? member.inactiveReason : undefined}
                  >
                    <div
                      className={`${styles.teamAvatar} ${member.profileImage ? styles.teamAvatarWithImage : ''}`}
                    >
                      {member.profileImage ? (
                        <Image
                          src={member.profileImage}
                          alt={`${member.name} 프로필`}
                          width={64}
                          height={64}
                          className={styles.teamAvatarImg}
                        />
                      ) : (
                        member.name.charAt(0)
                      )}
                    </div>
                    <div className={styles.teamInfo}>
                      <b className={styles.teamName}>{member.name}</b>
                      <span className={styles.teamRole}>{member.role}</span>
                    </div>
                    <p className={styles.teamDesc}>{member.desc}</p>
                    <div className={styles.teamSchool}>
                      <span className={styles.schoolName}>{member.school}</span>
                      <span className={styles.majorName}>{member.major}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>

      {/* Section Indicator */}
      <nav className={styles.indicator} aria-label="섹션 네비게이션">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`${styles.indicatorDot} ${activeSection === section.id ? styles.indicatorDotActive : ''}`}
            onClick={() => scrollToSection(section.id)}
            data-label={section.label}
            aria-label={`${section.label} 섹션으로 이동`}
            aria-current={activeSection === section.id ? 'true' : undefined}
          />
        ))}
      </nav>
      
      {/* Footer - 메인 페이지와 동일 */}
      <div className={styles.footerSnap}>
        <FooterSection visible={true} footerRef={footerRef} />
      </div>
    </div>
  );
}
