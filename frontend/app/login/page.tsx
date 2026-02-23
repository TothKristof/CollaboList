"use client"

import {
  HorizontalAlignment,
  ImageWrapper,
  FormWrapper
} from './login.styles'
import Image from 'next/image'
import { Heading, Password, Input, Button, Toaster } from '@kinsta/stratus'
import { useState, useEffect } from 'react'
import { User } from '@/types/userType'
import { useRouter } from '@/hooks/useRouter'
import { useAuth } from "@/context/authContext";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

type LoginForm = Pick<User, 'email' | 'password'>;

function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [onLogin, { data, loading, error }] = useMutation(LOGIN);

  useEffect(() => {
    if (data?.login?.token) {
      login(data.login.token);
      router?.push("/main");
    }
  }, [data]);

  return (
    <HorizontalAlignment>
      <ImageWrapper>
        <Image
          fill
          src="/loginpic.jpg"
          alt="Picture of a shopping bag"
        />
      </ImageWrapper>

      <FormWrapper>
        <Heading size='xl'>Login</Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin({ variables: { email: form.email, password: form.password } });
          }}
        >
          <Input
            id="email"
            label="Email"
            name="email"
            placeholder="Type something"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <Password
            id="password"
            label='Password'
            name='password'
            options={{
              hidePasswordText: 'Hide password',
              revealPasswordText: 'Reveal password'
            }}
            placeholder="Type something"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <Button htmlType='submit'>Sign in</Button>
        </form>
        <Toaster
          closeButtonAriaLabel='2'
          title='Login Error'
          type='error'
          isOpen={error !== undefined}
          text={error?.message}
        >
        </Toaster>
      </FormWrapper>
    </HorizontalAlignment>
  )
}

export default Login
