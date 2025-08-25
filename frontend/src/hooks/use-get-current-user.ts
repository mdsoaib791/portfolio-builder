import { UserDto } from '@/dtos/user-dto';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useMemo } from 'react';

const useGetCurrentUser = () => {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState<UserDto | undefined>(undefined);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setCurrentUser(session.user);
    }
  }, [status, session]);

  const memoizedCurrentUser = useMemo(() => currentUser, [currentUser]);

  return memoizedCurrentUser;
};

export default useGetCurrentUser;
