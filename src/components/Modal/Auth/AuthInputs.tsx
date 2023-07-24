import { Flex } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { authModalState } from '~/atoms/authModalAtom';
import Login from './Login';
import SignUp from './SignUp';

const AuthInputs = () => {
  const modalState = useRecoilValue(authModalState);

  return (
    <Flex direction='column' alignItems='center' width='full' mt={4}>
      {modalState.view === 'login' && <Login />}
      {modalState.view === 'signup' && <SignUp />}
    </Flex>
  );
};

export default AuthInputs;
