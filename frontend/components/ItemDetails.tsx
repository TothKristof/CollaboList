import React from 'react'
import { css } from '@emotion/react'
import {
    ExternalLinkIcon,
    CalendarIcon,
    ListIcon,
    TagIcon,
    ClockIcon,
} from 'lucide-react'
import { Item } from '@/types/itemType'

interface ItemDetailsProps {
    item: Item
}

const styles = {
    container: css`
    background: white;
    border-radius: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    border: 1px solid #e2e8f0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
    header: css`
    padding: 1.5rem;
    border-bottom: 1px solid #f1f5f9;
    background: rgba(248, 250, 252, 0.5);
  `,
    priceLabel: css`
    font-size: 0.75rem;
    font-weight: 500;
    color: #64748b;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
    price: css`
    font-size: 2.25rem;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.025em;
  `,
    body: css`
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
    grid: css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 640px) {
      grid-template-columns: 1fr 1fr;
    }
  `,
    field: css`
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  `,
    fieldLabel: css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #64748b;

    svg {
      width: 1rem;
      height: 1rem;
    }
  `,
    fieldValue: css`
    color: #0f172a;
    font-weight: 500;
  `,
    categoryValue: css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
    categoryDot: (color: string) => css`
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    background-color: ${color};
    flex-shrink: 0;
  `,
    notAssigned: css`
    color: #94a3b8;
    font-style: italic;
  `,
    footer: css`
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid #f1f5f9;
  `,
    link: css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.875rem 1rem;
    background: #0f172a;
    color: white;
    border-radius: 0.75rem;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.15s ease, transform 0.1s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    outline: none;

    svg {
      width: 1rem;
      height: 1rem;
    }

    &:hover {
      background: #1e293b;
    }

    &:active {
      transform: scale(0.98);
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px #e2e8f0;
    }
  `,
}

export function ItemDetails({ item }: ItemDetailsProps) {
    const formatPrice = (price: number) => {
        return price.toLocaleString('hu-HU') + ' Ft'
    }

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(dateString))
    }

    return (
        <div css={styles.container}>
            <div css={styles.header}>
                <p css={styles.priceLabel}>Current Price</p>
                <div css={styles.price}>{formatPrice(item.price)}</div>
            </div>

            <div css={styles.body}>
                <div css={styles.grid}>
                    {/* Category */}
                    <div css={styles.field}>
                        <div css={styles.fieldLabel}>
                            <TagIcon />
                            Category
                        </div>
                        <div css={styles.categoryValue}>
                            <span css={styles.categoryDot(item.category)} />
                            <span css={styles.fieldValue}>{item.category.name}</span>
                        </div>
                    </div>

                    {/* List */}
                    <div css={styles.field}>
                        <div css={styles.fieldLabel}>
                            <ListIcon />
                            List
                        </div>
                        <div css={styles.fieldValue}>
                            {item.list ? (
                                item.list.name
                            ) : (
                                <span css={styles.notAssigned}>Not assigned</span>
                            )}
                        </div>
                    </div>

                    {/* Added Date */}
                    <div css={styles.field}>
                        <div css={styles.fieldLabel}>
                            <CalendarIcon />
                            Added
                        </div>
                        <div css={styles.fieldValue}>{formatDate(item.addDate)}</div>
                    </div>

                    {/* Last Updated */}
                    <div css={styles.field}>
                        <div css={styles.fieldLabel}>
                            <ClockIcon />
                            Last Updated
                        </div>
                        <div css={styles.fieldValue}>{formatDate(item.lastUpdatedDate)}</div>
                    </div>
                </div>

                <div css={styles.footer}>
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        css={styles.link}
                    >
                        View Original Item
                        <ExternalLinkIcon />
                    </a>

                </div>
            </div >
        </div>
    )
}