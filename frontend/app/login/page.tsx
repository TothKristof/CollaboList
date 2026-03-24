"use client"
import {
  HorizontalAlignment,
  ImageWrapper,
  FormWrapper
} from './login.styles'
import Image from 'next/image'
import { Heading, Password, Input, Button, Toaster, Stack } from '@kinsta/stratus'
import { useState, useEffect } from 'react'
import { User } from '@/types/userType'
import { useRouter } from '@/hooks/useRouter'
import { useAuth } from "@/context/authContext"
import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import { AnimatePresence, motion } from "motion/react"
import { useForm, Controller } from "react-hook-form"
import CustomToaster from '@/components/ErrorToaster'

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user { id email }
    }
  }
`

const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $username: String!) {
    register(email: $email, password: $password, username: $username) {
      id
      email
    }
  }
`

type LoginForm = Pick<User, 'email' | 'password'>
type RegisterForm = Pick<User, 'email' | 'password' | 'username'>

const formVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2, ease: 'easeIn' } }
}



function Login() {
  const router = useRouter()
  const { login } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const [loginForm, setLoginForm] = useState<LoginForm>({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState<RegisterForm>({ email: '', password: '', username: '' })

  const [onLogin, { data, error: loginError }] = useMutation(LOGIN)
  const [onRegister, { data: registerData, error: registerError }] = useMutation(REGISTER, {
    onCompleted: () => {
      setRegisterSuccess(true)
      setTimeout(() => {
        setRegisterSuccess(false)
        setIsRegister(false)
      }, 3000)
    }
  })

  const { handleSubmit, control, formState: { errors } } = useForm<RegisterForm>({
    defaultValues: { email: '', password: '', username: '' },
    mode: 'onChange'
  })

  useEffect(() => {
    if (data?.login?.token) {
      login(data.login.token)
      router?.push("/main")
    }
  }, [data])

  useEffect(() => {
    if (registerData?.register?.id) {
      setIsRegister(false)
    }
  }, [registerData])

  return (
    <HorizontalAlignment>
      <ImageWrapper>
        <Image fill src="/loginpic.jpg" alt="Picture of a shopping bag" />
      </ImageWrapper>

      <FormWrapper>
        <AnimatePresence mode="wait">
          {!isRegister ? (
            <motion.div
              key="login"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Heading size='xl'>Login</Heading>
              <form onSubmit={(e) => {
                e.preventDefault()
                onLogin({ variables: { email: loginForm.email, password: loginForm.password } })
              }}>
                <Stack>
                  <Input
                    id="email"
                    label="Email"
                    name="email"
                    placeholder="Type something"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  />
                  <Password
                    id="password"
                    label='Password'
                    name='password'
                    options={{ hidePasswordText: 'Hide password', revealPasswordText: 'Reveal password' }}
                    placeholder="Type something"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  />
                  <Button htmlType='submit'>Sign in</Button>
                </Stack>
              </form>
              <Button type='secondary' style={{ marginTop: '100px' }} onClick={() => setIsRegister(true)}>
                No account? Register
              </Button>
              {loginError && <CustomToaster
                isOpen={loginError !== undefined}
                text={loginError?.message}
                title='Login Error'
                type='error'
              ></CustomToaster>}
            </motion.div>
          ) : (
            <motion.div
              key="register"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Heading size='xl'>Register</Heading>
              <form onSubmit={handleSubmit((data) => {
                onRegister({ variables: { email: data.email, password: data.password, username: data.username } })
              })}>
                <Stack gap={100}>
                  <Controller
                    name="username"
                    control={control}
                    rules={{
                      required: 'Username is required',
                      minLength: { value: 3, message: 'Username must be at least 3 characters' }
                    }}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        label="Username"
                        placeholder="Type something"
                        hasError={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address'
                      }
                    }}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        label="Email"
                        placeholder="Type something"
                        hasError={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' },
                      validate: {
                        hasUppercase: (v) => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter'
                      }
                    }}
                    render={({ field, fieldState }) => (
                      <Password
                        {...field}
                        label='Password'
                        options={{ hidePasswordText: 'Hide password', revealPasswordText: 'Reveal password' }}
                        placeholder="Type something"
                        hasError={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                  <Button htmlType='submit'>Register</Button>
                </Stack>
              </form>
              <Button type='secondary' style={{ marginTop: '100px' }} onClick={() => setIsRegister(false)}>
                Already have an account? Login
              </Button>
              {registerError && <CustomToaster
                isOpen={registerError !== undefined}
                text={registerError?.message}
                title='Registration Error'
                type='error'
              ></CustomToaster>}
            </motion.div>
          )}
        </AnimatePresence>
        {registerSuccess && <CustomToaster
          isOpen={registerSuccess}
          title='Registration successful'
          text='Your account has been created, please log in.'
          type='success'
        ></CustomToaster>}
      </FormWrapper>
    </HorizontalAlignment >
  )
}

export default Login