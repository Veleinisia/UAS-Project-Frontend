import Link from 'next/link';
import { useState } from 'react';

export default function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header style={{
      background: 'linear-gradient(135deg,rgb(114, 114, 214) 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #72a0f0 100%)',
      backdropFilter: 'blur(10px)',
      padding: '20px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container">
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <Link href="/" style={{
            marginRight: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '28px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg,rgb(221, 255, 29) 0%,rgb(237, 255, 158) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none'
          }}>
            <img src="https://i.ibb.co/CspYD2rp/logo-kampus-removebg-preview.png" alt="Logo" style={{ height: '38px', width: '38px', objectFit: 'contain', marginRight: '4px' }} />
            <span>Veleinsiana Sensa Jawang</span>
          </Link>

          <form onSubmit={handleSearch} style={{
            display: 'flex',
            gap: '10px',
            flex: '1',
            maxWidth: '400px'
          }}>
            <input
              type="text"
              placeholder="Cari film..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: '1',
                padding: '12px 16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '14px'
              }}
            />
            <button type="submit" className="btn btn-primary">
              🔍 Cari
            </button>
          </form>

          <Link href="/add" style={{
            marginLeft: '32px',
            fontSize: '14px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg,rgb(221, 255, 29) 0%,rgb(237, 255, 158) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none'
          }}>
            ➕ Tambah Movie
          </Link>
          <Link href="/add-tvshow" style={{
            marginLeft: '12px',
            fontSize: '14px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg,#00eaff 0%,#baffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none'
          }}>
            ➕ Tambah TV Show
          </Link>

        </nav>
      </div>
    </header>
  );
}
