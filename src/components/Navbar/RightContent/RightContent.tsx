import { Flex } from '@chakra-ui/react';
import AuthModal from '~/components/Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';

const RightContent = () => {
  return (
    <>
      <AuthModal />
      <Flex justifyContent='center' alignItems='center'>
        <AuthButtons />
      </Flex>
    </>
  );
};

export default RightContent;
