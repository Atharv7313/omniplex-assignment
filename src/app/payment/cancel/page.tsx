import Link from 'next/link';

export default function PaymentCancelPage() {
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
        style={{ color: '#ef4444', marginBottom: '20px' }}
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827' }}>Payment Canceled</h1>
      <p style={{ fontSize: '1.125rem', color: '#4b5563', marginTop: '1rem', maxWidth: '400px' }}>
        Your payment was not processed. You can return to the chat and try again whenever you're ready.
      </p>
      <Link href="/" style={{
        marginTop: '2.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#4b5563',
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

