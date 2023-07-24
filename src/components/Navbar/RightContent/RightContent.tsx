import { Button, Flex } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import AuthModal from '~/components/Modal/Auth/AuthModal';
import { auth } from '~/firebase/clientApp';
import AuthButtons from './AuthButtons';

interface Props {
  user: any;
}

const RightContent = ({ user }: Props) => {
  return (
    <>
      <AuthModal />
      <Flex justifyContent='center' alignItems='center'>
        {user ? <Button onClick={() => signOut(auth)}>Logout</Button> : <AuthButtons />}
      </Flex>
    </>
  );
};

export default RightContent;
