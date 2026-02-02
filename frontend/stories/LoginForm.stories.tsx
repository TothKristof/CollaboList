import type { Meta, StoryObj } from '@storybook/react'
import Login from '@/app/login/page'
import { userEvent, within } from '@storybook/testing-library'

const meta: Meta<typeof Login> = {
  title: 'Pages/Login',
  component: Login,
}

export default meta
type Story = StoryObj<typeof Login>

export const EmptyForm: Story = {}

// Pre-filled email only
export const PrefilledEmail: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const emailInput = canvasElement.querySelector<HTMLInputElement>(
      'input[name="email"]'
    )
    if (emailInput) emailInput.value = 'test@example.com'
  },
}

// Wrong credentials
export const WrongCredentials: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emailInput = canvas.getByLabelText('Email')
    const passwordInput = canvas.getByLabelText('Password')
    const button = canvas.getByRole('button', { name: /sign in/i })

    await userEvent.type(emailInput, 'wrong@example.com')
    await userEvent.type(passwordInput, 'wrongpassword')
    await userEvent.click(button)
  },
}

// Success login (user exists)
export const SuccessLogin: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emailInput = canvas.getByLabelText('Email')
    const passwordInput = canvas.getByLabelText('Password')
    const button = canvas.getByRole('button', { name: /sign in/i })

    await userEvent.type(emailInput, 'admin@gmail.com')
    await userEvent.type(passwordInput, 'admin')
    await userEvent.click(button)
  },
}
