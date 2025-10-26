
import React from 'react';
import { User } from '@/types/user';
import SecurityScore from './Security/SecurityScore';
import PasswordManagement from './Security/PasswordManagement';
import ConnectedAccounts from './Security/ConnectedAccounts';
import LoginActivity from './Security/LoginActivity';

const SecuritySettings = ({ user }: { user: User | null }) => {
  return (
    <>
      <SecurityScore />
      <PasswordManagement />
      <ConnectedAccounts user={user} />
      <LoginActivity />
    </>
  );
};

export default SecuritySettings;
