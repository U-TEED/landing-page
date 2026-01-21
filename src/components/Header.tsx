'use client';

import { useRouter, usePathname } from 'next/navigation';

interface HeaderProps {
  onNavClick: (id: string) => void;
}

const BETA_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSePB2wt08eZymrTUKA3ZDGZV5vu5DTVhDH9kOCsEcGan6TcEQ/viewform?pli=1';

export default function Header({ onNavClick }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isDetailPage = pathname?.startsWith('/detail');

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
        {isDetailPage ? (
          <>
            <nav className="header-nav">
              <button onClick={() => onNavClick('service')}>서비스</button>
              <button onClick={() => onNavClick('beta')}>베타</button>
              <button onClick={() => onNavClick('partner')}>파트너</button>
            </nav>
            <div className="header-cta">
              <a
                className="header-cta-btn"
                href="mailto:site@u-teed.co.kr?subject=%5BSITE%5D%20%ED%8C%8C%ED%8A%B8%EB%84%88%20%EB%AF%B8%ED%8C%85%20%EC%9A%94%EC%B2%AD"
              >
                파트너 미팅 요청
              </a>
            </div>
          </>
        ) : (
          <nav className="header-nav">
            <button onClick={() => onNavClick('section-1')}>SITE</button>
            <button onClick={() => onNavClick('section-2')}>프로젝트 의뢰하기</button>
            <button onClick={() => onNavClick('section-3')}>팀 소개</button>
            <a
              className="header-nav-link"
              href="https://accounts.zoho.com/signin?servicename=VirtualOffice&signupurl=https://www.zoho.com/mail/zohomail-pricing.html&serviceurl=https://mail.zoho.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              이메일 바로가기
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

