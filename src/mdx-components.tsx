import type { MDXComponents } from 'mdx/types';
import React from 'react';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-lg)' }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-md)', marginTop: 'var(--space-2xl)' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.7, marginBottom: 'var(--space-lg)', color: 'var(--color-text)' }}>
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a href={href} style={{ color: 'var(--color-primary-light)', textDecoration: 'none', fontWeight: 500 }}>
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul style={{ marginBottom: 'var(--space-lg)', paddingLeft: 'var(--space-xl)', color: 'var(--color-text)' }}>
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li style={{ marginBottom: 'var(--space-sm)', fontSize: 'var(--text-lg)' }}>
        {children}
      </li>
    ),
    code: ({ children }) => (
      <code style={{ 
        backgroundColor: 'var(--color-surface)', 
        padding: '0.2em 0.4em', 
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.9em',
        fontFamily: 'monospace',
        color: 'var(--color-primary-light)'
      }}>
        {children}
      </code>
    ),
    ...components,
  };
}
