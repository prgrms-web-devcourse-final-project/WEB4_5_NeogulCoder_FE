import { Dispatch, SetStateAction } from 'react';

export type VerifyEmailModalProps = {
  onClose: () => void;
  timeLeft: number;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  email: string;
  setEmailVerified: Dispatch<SetStateAction<boolean>>;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
};
