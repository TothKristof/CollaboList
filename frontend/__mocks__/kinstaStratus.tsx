const react = require('react');

function Display({ size, children, ...props }) {
  // Keep tests simple: treat large sizes as h1
  if (size === 'l' || size === 'xl' || size === 'xxl') {
    return react.createElement('h1', props, children);
  }
  return react.createElement('p', props, children);
}

function Heading({ size, children, ...props }) {
  if (size === 'l' || size === 'xl' || size === 'xxl') {
    return react.createElement('h1', props, children);
  }
  return react.createElement('h2', props, children);
}

function Button({ children, ...props }) {
  return react.createElement('button', props, children);
}

function Card({ children, ...props }) {
  return react.createElement('div', props, children);
}

function Stack({ children }) {
  return react.createElement('div', null, children);
}

function Tooltip({ children }) {
  return react.createElement('div', null, children);
}

function Table({ children }) {
  return react.createElement('table', null, children);
}

// TableColumnDef csak típus, runtime-ban elég egy placeholder
const TableColumnDef = {};

const breakpoints = {
  m: { up: '@media (min-width: 768px)' },
  xl: { up: '@media (min-width: 1280px)' },
};

const borderRadius = {
  s: '0.25rem',
  m: '0.5rem',
  l: '0.75rem',
  50: '9999px',
};

const space = {
  200: '0.5rem',
  400: '1rem',
};

const color = {
  anthracite: '#111827',
  text: {
    neutral: { subtle: '#6b7280' },
    positive: { disabled: '#166534' },
  },
  bg: {
    action: {
      neutral: { activeSubtlestConstant: '#e5e7eb' },
    },
  },
};

module.exports = {
  Button,
  Card,
  Display,
  Heading,
  Stack,
  Tooltip,
  Table,
  TableColumnDef,
  breakpoints,
  borderRadius,
  space,
  color,
};
