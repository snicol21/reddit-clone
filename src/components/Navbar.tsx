import { Flex, Image } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex bg='white' height='44px' padding='6px 12px'>
      <Flex align='center'>
        <Image src='/images/redditFace.svg' height='30px' alt='logo icon' />
        <Image src='/images/redditText.svg' height='46px' display={{ base: 'none', md: 'unset' }} alt='logo text' />
      </Flex>
      {/* <Directory /> */}
      {/* <SearchInput /> */}
      {/* <RightContent /> */}
    </Flex>
  );
};

export default Navbar;
