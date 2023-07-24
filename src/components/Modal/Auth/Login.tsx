import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '~/atoms/authModalAtom';
import { auth } from '~/firebase/clientApp';
import { FIREBASE_ERRORS } from '~/firebase/errors';

interface Props {}

const Login = ({}: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  // firebase logic
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

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
      <Text textAlign='center' color='red' fontSize='10pt'>
        {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button type='submit' width='full' height='36px' mt={2} mb={2} isLoading={loading}>
        Log In
      </Button>
      <Flex fontSize='9pt' justifyContent='center' mb={2}>
        <Text mr={1}>Forgot your password?</Text>
        <Text
          color='blue.500'
          fontWeight={700}
          cursor='pointer'
          onClick={() => setAuthModalState((prev) => ({ ...prev, view: 'resetPassword' }))}
        >
          RESET
        </Text>
      </Flex>
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
