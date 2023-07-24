import { Flex, Image } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '~/firebase/clientApp';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex bg='white' height='44px' padding='6px 12px'>
      <Flex align='center'>
        <Image src='/images/redditFace.svg' height='30px' alt='logo icon' />
        <Image src='/images/redditText.svg' height='46px' display={{ base: 'none', md: 'unset' }} alt='logo text' />
      </Flex>
      {/* <Directory /> */}
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
