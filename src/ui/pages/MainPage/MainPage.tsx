import { FC, useCallback, useEffect, useState } from 'react';

import LogoIcon from 'public/icons/logo.svg';

import { getLimits } from '@/api/getLimits';
import { getUserData } from '@/api/getUserData';

import { Limit } from '@/types/limit';
import { UserData } from '@/types/user';

import Balance from './components/Balance/Balance';
import LimitIndicator from './components/LimitIndicator/LimitIndicator';

import styles from './MainPage.module.scss';

const MainPage: FC = () => {
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

  useEffect(() => {
    if (!userData) {
      loadData();
    }
  }, [loadData, userData]);

  return (
    <div className={styles.root}>
      <LogoIcon className={styles.logo} />
      <div className={styles.contentWrapper}>
        {!loading && userData && <p className={styles.phoneNumber}>{userData.phone}</p>}
        {loading && <div className={styles.phoneSkeleton} />}
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
      </div>
    </div>
  );
};

export default MainPage;
