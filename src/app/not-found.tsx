import Link from 'next/link';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-5xl)', paddingBottom: 'var(--space-5xl)', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p style={{ marginBottom: 'var(--space-xl)' }}>
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
}
