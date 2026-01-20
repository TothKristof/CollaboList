"use client"

import {
  HorizontalAlignment,
  ImageWrapper,
  FormWrapper
} from './login.styles'
import Image from 'next/image'
import { Heading, Password, Input, Button, Toaster } from '@kinsta/stratus'
import { useState } from 'react'
import { User } from '@/types/userType'
import { users } from '@/data/users'
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/authContext";
import { useEffect } from 'react'


type LoginForm = Pick<User, 'email' | 'password'>;

function Login() {
  const router = useRouter();
  const { login } = useAuth();


  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/main");
    }
  }, [isAuthenticated]);

  function onLogin() {
    const user = users.find(
      (u) =>
        u.email === form.email &&
        u.password === form.password
    );

    if (!user) {
      setError('Wrong email or password');
      return;
    }

    login({
      id: user.id,
      email: user.email,
    });

    router.push('/main');
  }

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
        <div>
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
            label='Password'
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
        </div>
        <Toaster
          closeButtonAriaLabel='2'
          title='Login Error'
          type='error'
          isOpen={error !== null}
          onCancel={() => setError(null)}
          text={error}
        >
        </Toaster>
        <Button onClick={onLogin}>Sign in</Button>
      </FormWrapper>
    </HorizontalAlignment>
  )
}

export default Login
