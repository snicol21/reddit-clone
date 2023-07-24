import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

interface Props {
  // user;
}

const SearchInput = ({}: Props) => {
  return (
    <Flex flexGrow={1} marginRight={2} align='center'>
      <InputGroup>
        <InputLeftElement pointerEvents='none' height='full'>
          <SearchIcon color='gray.400' />
        </InputLeftElement>
        <Input
          placeholder='Search Reddit'
          fontSize='10pt'
          _placeholder={{ color: 'gray.500' }}
          _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
          _focus={{
            outline: 'none',
            border: '1px solid',
            borderColor: 'blue.500',
          }}
          height='34px'
          bg='gray.50'
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
