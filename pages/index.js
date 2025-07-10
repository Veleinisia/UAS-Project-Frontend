import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import MovieGrid from '../components/MovieGrid';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('movie');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    setItems([]);
    setFilteredItems([]);
    setError('');
    fetchItems();
  }, [activeTab]);

  useEffect(() => {
    sortItems();
  }, [items, sortBy]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const url = activeTab === 'movie' ? '/api/movies' : '/api/tvshows';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Gagal mengambil data');
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Data tidak valid');
      setItems(data);
      setFilteredItems(data);
    } catch (err) {
      setError('Gagal memuat data, coba lagi.');
      setItems([]);
      setFilteredItems([]);
      console.error('FETCH ERROR:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredItems(items);
      return;
    }
    const filtered = items.filter(item =>
      (item.title || item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const sortItems = () => {
    const sorted = [...filteredItems].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date((b.release_date || b.first_air_date)) - new Date((a.release_date || a.first_air_date));
        case 'oldest':
          return new Date((a.release_date || a.first_air_date)) - new Date((b.release_date || b.first_air_date));
        case 'rating':
          return parseFloat(b.rating || b.vote_average || 0) - parseFloat(a.rating || a.vote_average || 0);
        case 'title':
          return (a.title || a.name).localeCompare(b.title || b.name);
        default:
          return 0;
      }
    });
    setFilteredItems(sorted);
  };

  const handleAdd = () => {
    if (activeTab === 'movie') {
      router.push('/add');
    } else {
      router.push('/add-tvshow');
    }
  };

  const handleEdit = (id) => {
    if (activeTab === 'movie') {
      router.push(`/edit/${id}`);
    } else {
      router.push(`/edit/tvshow/${id}`);
    }
  };

  const handleDelete = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#10131a' }}>
      <div style={{ background: '#fff', width: '100%' }}>
        <Header onSearch={handleSearch} />
      </div>
      {/* Sorting */}
      <div style={{
        width: '100%',
        background: '#167387',
        minHeight: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#ffd700', margin: 0, letterSpacing: '0.02em' }}>
          Koleksi {activeTab === 'movie' ? 'Film' : 'TV Show'}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ color: '#ffd700', fontWeight: 600, fontSize: '16px' }}>Urutkan:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #fff',
              borderRadius: '6px',
              background: 'hsla(0, 100.00%, 99.80%, 0.15)',
              color: '#00eaff',
              fontSize: '15px',
              fontWeight: 600
            }}
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="title">Judul A-Z</option>
          </select>
        </div>
      </div>
      {/* Tab Movie/TV Show */}
      <div style={{ width: '100%', background: '#10131a', display: 'flex', justifyContent: 'center', gap: '16px', padding: '24px 0 0 0' }}>
        <button
          className={`btn ${activeTab === 'movie' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ minWidth: 120, fontWeight: 700, fontSize: 18, background: '#167387', borderRadius: 12, color: activeTab === 'movie' ? '#FFD700' : '#FFD700' }}
          onClick={() => setActiveTab('movie')}
        >
          Movie
        </button>
        <button
          className={`btn ${activeTab === 'tvshow' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ minWidth: 120, fontWeight: 700, fontSize: 18, background: '#DAA520', borderRadius: 12,color: activeTab === 'tvshow' ? '#00FFFF' : '#00eaff' }}
          onClick={() => setActiveTab('tvshow')}
        >
          TV Shows
        </button>

      </div>
      {/* Error Message */}
      {error && (
        <div style={{ color: '#ff6b6b', textAlign: 'center', margin: '16px 0', fontWeight: 'bold' }}>
          {error}
        </div>
      )}
      {/* Grid */}
      <div style={{ width: '100%', background: '#10131a', minHeight: '60vh', padding: '40px 0 0 0' }}>
        <main className="container">
          <MovieGrid
            movies={filteredItems}
            onDelete={handleDelete}
            onEdit={handleEdit}
            loading={loading}
            isTVShow={activeTab === 'tvshow'}
          />
        </main>
      </div>
    </div>
  );
}






