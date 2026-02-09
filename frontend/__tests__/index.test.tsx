import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

import Home from '../app/page'
import { lightTheme } from '../app/themes'
import ListPage from '@/app/lists/[id]/page'
import { lists } from '../data/lists'

jest.mock('@/components/ItemTable', () => ({
  __esModule: true,
  default: ({ tableData, actions }: any) => (
    <div>
      <div data-testid="item-count">{tableData.length}</div>

      {tableData.map((item: any) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <span data-testid={`price-${item.id}`}>{item.price}</span>
          <button onClick={() => actions.onDelete(item)}>delete</button>
          <button
            onClick={() =>
              actions.onEditPrice?.({ ...item, price: item.price + 10 })
            }
          >
            edit price
          </button>
        </div>
      ))}
    </div>
  ),
}))

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '1' }),
}))

describe('Home', () => {
  it('shows main product card and Buy Now button', () => {
    render(
      <EmotionThemeProvider theme={lightTheme}>
        <Home />
      </EmotionThemeProvider>,
    )

    expect(screen.getByText(/Sony WH-1000XM5/i)).toBeInTheDocument()
  })

  it('renders marketing alert about price drop', () => {
    render(
      <EmotionThemeProvider theme={lightTheme}>
        <Home />
      </EmotionThemeProvider>,
    )

    expect(screen.getByText(/Price Drop Alert!/i)).toBeInTheDocument()
    expect(
      screen.getByText(/AirPods Pro just dropped to lowest price ever\./i),
    ).toBeInTheDocument()
  })
})

describe('ListPage', () => {
  it('shows list name and initial item count', () => {
    const firstList = lists[0]

    render(<ListPage />)

    expect(
      screen.getByRole('heading', { level: 1, name: firstList.name }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Item count:/)).toHaveTextContent('Item count: 2')
  })

  it('removes item when onDelete is called', async () => {
    const user = userEvent.setup()

    render(<ListPage />)


    expect(screen.getByText(/Item count:/)).toHaveTextContent('Item count: 2')

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    await user.click(deleteButtons[0])

    expect(screen.getByText(/Item count:/)).toHaveTextContent('Item count: 1')
  })

  it('updates item price when onEditPrice is used', async () => {
    const user = userEvent.setup()
    const firstList = lists[0]
    const firstItem = firstList.items[0]

    render(<ListPage />)

    const priceDisplay = screen.getByTestId(`price-${firstItem.id}`)
    expect(priceDisplay).toHaveTextContent(String(firstItem.price))

    const editButtons = screen.getAllByRole('button', { name: /edit price/i })
    await user.click(editButtons[0])

    expect(
      screen.getByTestId(`price-${firstItem.id}`),
    ).toHaveTextContent(String(firstItem.price + 10))
  })
})