import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '~/atoms/authModalAtom';

interface Props {}

const Login = ({}: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // firebase logic
  const onSubmit = () => {};

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        name='email'
        required
        placeholder='email'
        type='email'
        onChange={onChange}
        mb={2}
        fontSize='10pt'
        _placeholder={{ color: 'gray.500' }}
        _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
        _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
        bg='gray.50'
      />
      <Input
        name='password'
        required
        placeholder='password'
        type='password'
        onChange={onChange}
        mb={2}
        fontSize='10pt'
        _placeholder={{ color: 'gray.500' }}
        _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
        _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
        bg='gray.50'
      />
      <Button type='submit' width='full' height='36px' mt={2} mb={2}>
        Log In
      </Button>
      <Flex fontSize='9pt' justifyContent='center'>
        <Text mr={1}>New Here?</Text>
        <Text
          color='blue.500'
          fontWeight={700}
          cursor='pointer'
          onClick={() => setAuthModalState((prev) => ({ ...prev, view: 'signup' }))}
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
