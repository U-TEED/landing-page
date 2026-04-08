'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface HeaderProps {
  onNavClick: (id: string) => void;
}

export default function Header({ onNavClick }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isDetailPage = pathname?.startsWith('/detail');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <span 
          className="header-logo" 
          style={{ cursor: 'pointer' }} 
          onClick={handleLogoClick}
        >
          U-TEED
        </span>
        <nav className="header-nav">
          <div 
            className="header-dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="header-dropdown-btn">서비스</button>
            {showDropdown && (
              <div className="header-dropdown-menu">
                <div className="header-dropdown-menu-inner">
                  <button onClick={() => { router.push('/detail/1'); setShowDropdown(false); }}>
                    SITE
                    <span className="dropdown-desc">픽업게임 운영 플랫폼</span>
                  </button>
                  <button onClick={() => { router.push('/detail/2'); setShowDropdown(false); }}>
                    BeepBeep
                    <span className="dropdown-desc">경도인지장애 조기 발견</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          {isDetailPage ? (
            <>
              <button onClick={() => onNavClick('beta')}>베타</button>
              <button onClick={() => onNavClick('partner')}>파트너</button>
            </>
          ) : (
            <button onClick={() => onNavClick('section-2')}>프로젝트 의뢰하기</button>
          )}
        </nav>
        <div className="header-cta">
          <a
            className="header-cta-btn"
            href="mailto:site@u-teed.co.kr"
          >
            이메일 보내기
          </a>
        </div>
      </div>
    </header>
  );
}

