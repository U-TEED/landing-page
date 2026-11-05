import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { privacyPage } from '@/content/privacy';
import { requestCopy } from '@/content/request';
import { meta } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import { tidy } from '@/lib/typography';
import styles from './privacy.module.css';

export const metadata = pageMetadata({ title: meta.privacyTitle, description: meta.privacyDescription, path: '/privacy' });

export default function PrivacyPage() {
  const notice = requestCopy.privacyNotice;

  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <div className="container">
          <article className={styles.article} aria-labelledby="privacy-title">
            <h1 id="privacy-title" className={styles.title}>
              {privacyPage.h1}
            </h1>

            {/*
              [직접 작성] 개인정보 처리방침 본문은 회사가 작성해 이 자리에 넣는다.
              개인정보 보호법 제30조 기재 사항(처리 목적, 처리·보유 기간, 제3자 제공, 처리 위탁,
              파기 절차, 정보주체 권리, 안전성 확보 조치, 개인정보 보호책임자와 문의처 등)을 담는다.
              의뢰 데이터는 Google 스프레드시트·Apps Script·메일로 처리되므로
              처리 위탁·국외 이전 기재가 필요한지 검토한다.
              아래 블록은 의뢰 폼에 이미 보이는 안내를 같은 원문으로 다시 보여 줄 뿐이다.
            */}

            <section aria-labelledby="privacy-form-title" className={styles.block}>
              <h2 id="privacy-form-title" className={styles.blockTitle}>
                {privacyPage.formNoticeTitle}
              </h2>
              <dl className="row-list">
                {notice.rows.map(([term, detail]) => (
                  <div key={term} className={styles.row}>
                    <dt>{term}</dt>
                    <dd>{tidy(detail)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter current="privacy" />
    </>
  );
}
