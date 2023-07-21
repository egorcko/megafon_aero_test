'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import ExitIcon from 'public/icons/exit.svg';

import { getLimits } from '@/api/getLimits';
import { getUserData } from '@/api/getUserData';
import { AUTH_COOKIE } from '@/constants';
import { COOKIES } from '@/utils/cookies';

import { Limit } from '@/types/limit';
import { UserData } from '@/types/user';

import Balance from '../Balance/Balance';
import LimitIndicator from '../LimitIndicator/LimitIndicator';

import styles from './Content.module.scss';

const Content: FC = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [limits, setLimits] = useState<Limit[] | null>(null);

  const loadData = useCallback(async () => {
    const { data: userDataResponse, status: userDataStatus } = await getUserData();
    const { data: limitsResponse, status: limitsStatus } = await getLimits();

    if (userDataResponse && userDataStatus) {
      setUserData(userDataResponse);
    }

    if (limitsResponse && limitsStatus) {
      setLimits(limitsResponse.limits);
    }

    setLoading(false);
  }, []);

  const exit = () => {
    COOKIES.remove(AUTH_COOKIE);
    router.replace('/login');
  };

  useEffect(() => {
    if (!userData) {
      loadData();
    }
  }, [loadData, userData]);

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        {!loading && userData && <p className={styles.phoneNumber}>{userData.phone}</p>}
        {loading && <div className={styles.phoneSkeleton} />}
        <button type="button" onClick={exit} className={styles.exit}>
          <ExitIcon />
        </button>
      </header>
      <div className={styles.content}>
        <Balance value={userData?.balance ?? 0} />
        <p className={styles.limitsTitle}>Остатки по пакетам</p>
        {loading && (
          <>
            <LimitIndicator isSkeleton />
            <LimitIndicator isSkeleton />
          </>
        )}
        {!loading && limits?.map((item) => <LimitIndicator {...item} key={item.id} />)}
      </div>
    </section>
  );
};

export default Content;
