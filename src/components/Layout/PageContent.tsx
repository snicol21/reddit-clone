import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode[];
};

const PageContent = ({ children }: Props) => {
  const [leftPage, rightPage] = children;
  return (
    <Flex justify='center' p='16px 0px' border='1px solid red'>
      <Flex width='95%' justify='center' maxWidth='860px' border='1px solid green'>
        <Flex direction='column' width={{ base: 'full', md: '65%' }} mr={{ base: 0, md: 6 }} border='1px solid blue'>
          {leftPage}
        </Flex>
        <Flex direction='column' display={{ base: 'none', md: 'flex' }} flexGrow={1} border='1px solid orange'>
          {rightPage}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContent;
