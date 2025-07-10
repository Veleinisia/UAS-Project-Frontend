import MovieCard from './MovieCard';

export default function MovieGrid({ movies, onDelete, loading, isTVShow }) {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const validMovies = (movies || []).filter(
    m => m && m.id && (m.title || m.name)
  );

  if (!validMovies.length) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', color: '#ffd700', textAlign: 'center'
      }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>🎬</div>
        <h2 style={{ fontWeight: 'bold', fontSize: 32, marginBottom: 8, color: '#fff' }}>
          {isTVShow ? 'Belum ada TV Show' : 'Belum ada film'}
        </h2>
        <p style={{ color: '#fff', fontSize: 18, marginBottom: 8 }}>
          {isTVShow
            ? 'Tidak ada data tv show, mau liat apa?? klik tambah tv show nya yuk!'
            : 'Tidak ada data film nih, klik tambah movie yuk!!'}
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
      padding: '20px 0',
      justifyContent: 'center',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      {validMovies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onDelete={onDelete}
          isTVShow={isTVShow}
        />
      ))}
    </div>
  );
}
