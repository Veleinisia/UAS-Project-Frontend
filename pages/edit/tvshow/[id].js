import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../../components/Header';
import MovieForm from '../../../components/MovieForm';

export default function EditTVShowPage() {
  const router = useRouter();
  const { id } = router.query;
  const [tvshow, setTVShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchTVShow();
  }, [id]);

  const fetchTVShow = async () => {
    try {
      const res = await fetch(`/api/tvshows/${id}`);
      if (res.ok) {
        const data = await res.json();
        setTVShow(data);
      } else {
        setError('TV Show tidak ditemukan');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat mengambil data TV Show');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/tvshows/${id}` , {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        router.push('/?updated=true');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Gagal memperbarui TV Show');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat memperbarui TV Show');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#10131a' }}>
        <Header onSearch={() => {}} />
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error && !tvshow) {
    return (
      <div style={{ minHeight: '100vh', background: '#10131a' }}>
        <Header onSearch={() => {}} />
        <main className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>
          <div style={{ color: '#ffffff', fontSize: '18px', marginBottom: '20px' }}>
            {error}
          </div>
          <Link href="/" className="btn btn-primary" style={{
                    flex: '1',
                    minWidth: '80px',
                    justifyContent: 'center',
                    color: 'white' 
                  }}>
            ← Kembali ke Beranda
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#10131a' }}>
      <Header onSearch={() => {}} />
      <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '12px', color: '#fff' }}>
              Edit TV Show
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px' }}>
              Perbarui informasi TV Show "{tvshow?.name || tvshow?.title}"
            </p>
          </div>

          {error && (
            <div style={{
              background: 'rgba(255, 107, 107, 0.1)',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              borderRadius: '8px',
              padding: '12px',
              color: '#ff6b6b',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <MovieForm 
            movieData={tvshow} 
            onSubmit={handleUpdate}
            loading={saving}
          />

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/" className="btn btn-secondary" style={{
                    flex: '1',
                    minWidth: '80px',
                    justifyContent: 'center',
                    color: 'gold' 
                  }}>
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
