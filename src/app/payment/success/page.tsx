import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f9fafb',
    }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: '#10b981', marginBottom: '20px' }}
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827' }}>Payment Successful!</h1>
      <p style={{ fontSize: '1.125rem', color: '#4b5563', marginTop: '1rem', maxWidth: '400px' }}>
        Thank you for your purchase. You now have access to the Pro features.
      </p>
      <Link href="/" style={{
        marginTop: '2.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#2563eb',
        color: 'white',
        fontWeight: '500',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        transition: 'background-color 0.2s',
      }}>
        Return to Chat
      </Link>
    </div>
  );
}

