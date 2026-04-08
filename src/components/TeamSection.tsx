import { MutableRefObject } from 'react';
import Image from 'next/image';
import styles from './TeamSection.module.css';

const siteTeamGroups = [
  {
    category: '기획 / 마케팅',
    members: [
      {
        name: '임태호',
        role: '대표 / 기획',
        desc: '서비스 총괄 및 기획',
        school: '연세대학교',
        major: '신학과',
        profileImage: '/images/team/임태호.png',
      },
      {
        name: '홍예찬',
        role: '마케팅',
        desc: '마케팅 전략 및 커뮤니티 운영',
        school: '연세대학교',
        major: '물리학과',
        profileImage: '/images/team/홍예찬.png',
      },
    ],
  },
  {
    category: '개발',
    members: [
      {
        name: '김재윤',
        role: 'Frontend',
        desc: '프론트엔드 개발, 유저 앱 개발',
        school: '고려대학교',
        major: '인공지능사이버보안학과',
        profileImage: '/images/team/김재윤.png',
      },
      {
        name: '정민규',
        role: 'Frontend',
        desc: '프론트엔드 개발, 관리자용 앱 개발',
        school: '홍익대학교',
        major: '소프트웨어융합학과',
        profileImage: '/images/team/정민규.png',
      },
      {
        name: '김진영',
        role: 'Backend',
        desc: '백엔드 개발, 서버 관리 및 운영',
        school: '고려대학교',
        major: '인공지능사이버보안학과',
        profileImage: '/images/team/김진영.png',
      },
      {
        name: '김명준',
        role: 'Backend',
        desc: '백엔드 개발',
        school: '고려대학교',
        major: '인공지능사이버보안학과',
        profileImage: '/images/team/김명준.png',
      },
      {
        name: '윤효빈',
        role: 'Backend',
        desc: '백엔드 개발',
        school: '고려대학교',
        major: '인공지능사이버보안학과',
        profileImage: '/images/team/윤효빈.png',
        inactive: true,
        inactiveReason: '군복무로 휴직',
      },
    ],
  },
  {
    category: '디자인',
    members: [
      {
        name: '최수진',
        role: 'UI/UX',
        desc: 'UI/UX 디자인',
        school: '홍익대학교',
        major: '시각디자인학과',
        profileImage: '/images/team/최수진.png',
      },
      {
        name: '박혜원',
        role: 'SNS 마케팅',
        desc: 'SNS 마케팅 자료 제작',
        school: '경희대학교',
        major: '시각디자인학과',
        profileImage: '/images/team/박혜원.png',
      },
    ],
  },
];

const beepbeepTeamGroups = [
  {
    category: '기획 / 마케팅',
    members: [
      {
        name: '임태호',
        role: '공동대표 / 기획',
        desc: '서비스 총괄 및 기획',
        school: '연세대학교',
        major: '신학과',
        profileImage: '/images/team/임태호.png',
      },
      {
        name: '박규원',
        role: '공동대표',
        desc: '서비스 총괄',
        school: '연세대학교',
        major: '불어불문학과',
        profileImage: '/images/team/박규원.png',
      },
      {
        name: '홍예찬',
        role: '마케팅',
        desc: '마케팅 전략 및 커뮤니티 운영',
        school: '연세대학교',
        major: '물리학과',
        profileImage: '/images/team/홍예찬.png',
      },
    ],
  },
  {
    category: '개발',
    members: [
      {
        name: '김재윤',
        role: 'Frontend',
        desc: '프론트엔드 개발, 유저 앱 개발',
        school: '고려대학교',
        major: '인공지능사이버보안학과',
        profileImage: '/images/team/김재윤.png',
      },
      {
        name: '정민규',
        role: 'Frontend',
        desc: '프론트엔드 개발, 관리자용 앱 개발',
        school: '홍익대학교',
        major: '소프트웨어융합학과',
        profileImage: '/images/team/정민규.png',
      },
    ],
  },
  {
    category: '디자인',
    members: [
      {
        name: '최수진',
        role: 'UI/UX',
        desc: 'UI/UX 디자인',
        school: '홍익대학교',
        major: '시각디자인학과',
        profileImage: '/images/team/최수진.png',
      },
      {
        name: '박혜원',
        role: 'SNS 마케팅',
        desc: 'SNS 마케팅 자료 제작',
        school: '경희대학교',
        major: '시각디자인학과',
        profileImage: '/images/team/박혜원.png',
      },
    ],
  },
];

const teamGroupsByProject = {
  site: siteTeamGroups,
  beepbeep: beepbeepTeamGroups,
};

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  school: string;
  major: string;
  profileImage?: string;
  inactive?: boolean;
  inactiveReason?: string;
}

interface TeamGroup {
  category: string;
  members: TeamMember[];
}

interface TeamSectionProps {
  sectionRef?: MutableRefObject<HTMLElement | null>;
  id: string;
  project?: 'site' | 'beepbeep';
}

const projectDescriptions = {
  site: 'SITE는 스포츠를 사랑하는 팀원들이 모여 만들고 있습니다. 각자의 전문성을 바탕으로 더 나은 스포츠 경험을 설계합니다.',
  beepbeep: 'BeepBeep은 가족을 소중히 여기는 팀원들이 모여 만들고 있습니다. 각자의 전문성을 바탕으로 더 따뜻한 케어 경험을 설계합니다.',
};

export default function TeamSection({ sectionRef, id, project = 'site' }: TeamSectionProps) {
  const teamGroups = teamGroupsByProject[project];
  const [planningMarketing, development, design] = teamGroups as TeamGroup[];

  return (
    <section
      className={`${styles.section} ${styles.sectionSoft} team-section ${styles.teamSection}`}
      ref={(el) => {
        if (sectionRef) sectionRef.current = el;
      }}
      id={id}
    >
      <div className={`${styles.container} ${styles.sectionContent}`}>
        <div className={styles.reveal}>
          <p className={styles.eyebrow}>Our Team</p>
          <h2 className={styles.h2}>함께 만들어가는 사람들</h2>
          <p className={styles.lead}>
            {projectDescriptions[project]}
          </p>

          <div className={styles.teamSplitRow}>
            <div className={styles.teamGroup}>
              <h3 className={styles.teamCategoryTitle}>{planningMarketing.category}</h3>
              <div className={`${styles.teamGrid} ${styles.teamGridTwo}`}>
                {planningMarketing.members.map((member, index) => (
                  <div key={index} className={`${styles.teamCard} ${styles.reveal}`}>
                    <div
                      className={`${styles.teamAvatar} ${
                        member.profileImage ? styles.teamAvatarWithImage : ''
                      }`}
                    >
                      {member.profileImage ? (
                        <Image
                          src={member.profileImage}
                          alt={`${member.name} 프로필`}
                          width={200}
                          height={200}
                          quality={100}
                          unoptimized
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

            <div className={styles.teamGroup}>
              <h3 className={styles.teamCategoryTitle}>{design.category}</h3>
              <div className={`${styles.teamGrid} ${styles.teamGridTwo}`}>
                {design.members.map((member, index) => (
                  <div key={index} className={`${styles.teamCard} ${styles.reveal}`}>
                    <div
                      className={`${styles.teamAvatar} ${
                        member.profileImage ? styles.teamAvatarWithImage : ''
                      }`}
                    >
                      {member.profileImage ? (
                        <Image
                          src={member.profileImage}
                          alt={`${member.name} 프로필`}
                          width={200}
                          height={200}
                          quality={100}
                          unoptimized
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

          <div className={styles.teamGroup}>
            <h3 className={styles.teamCategoryTitle}>{development.category}</h3>
            <div className={styles.teamGrid}>
              {development.members.map((member, index) => (
                <div
                  key={index}
                  className={`${styles.teamCard} ${styles.reveal} ${
                    member.inactive ? styles.teamCardInactive : ''
                  }`}
                  data-inactive-reason={member.inactive ? member.inactiveReason : undefined}
                >
                  <div
                    className={`${styles.teamAvatar} ${
                      member.profileImage ? styles.teamAvatarWithImage : ''
                    }`}
                  >
                    {member.profileImage ? (
                      <Image
                        src={member.profileImage}
                        alt={`${member.name} 프로필`}
                        width={200}
                        height={200}
                        quality={100}
                        unoptimized
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
  );
}
