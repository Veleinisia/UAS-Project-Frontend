import Link from 'next/link';
import { useState } from 'react';

export default function MovieCard({ movie, onDelete, isTVShow }) {
  console.log('movie:', movie); 
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = await new Promise(resolve => {
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.7); display: flex;
        justify-content: center; align-items: center; z-index: 1000;
      `;
      modal.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
          padding: 30px; border-radius: 15px; text-align: center;
          color: white; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          max-width: 400px; width: 90%;
        ">
          <p style="font-size: 18px; margin-bottom: 25px;">Yakin ingin menghapus ${isTVShow ? 'TV Show' : 'film'} ini?</p>
          <button id="confirmYes" style="
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
            color: white; padding: 12px 25px; border: none; border-radius: 8px;
            cursor: pointer; font-size: 16px; margin: 0 10px;
            transition: all 0.3s ease;
          ">Ya</button>
          <button id="confirmNo" style="
            background: rgba(255,255,255,0.1); color: white;
            padding: 12px 25px; border: 1px solid rgba(255,255,255,0.2);
            border-radius: 8px; cursor: pointer; font-size: 16px; margin: 0 10px;
            transition: all 0.3s ease;
          ">Tidak</button>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('confirmYes').onclick = () => {
        document.body.removeChild(modal);
        resolve(true);
      };
      document.getElementById('confirmNo').onclick = () => {
        document.body.removeChild(modal);
        resolve(false);
      };
    });

    if (!confirmed) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/${isTVShow ? 'tvshows' : 'movies'}/${movie.id}`, { method: 'DELETE' });
      if (res.ok) {
        onDelete(movie.id);
      } else {
        const messageModal = document.createElement('div');
        messageModal.style.cssText = `
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-color: rgba(0,0,0,0.7); display: flex;
          justify-content: center; align-items: center; z-index: 1000;
        `;
        messageModal.innerHTML = `
          <div style="
            background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
            padding: 30px; border-radius: 15px; text-align: center;
            color: white; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            max-width: 400px; width: 90%;
          ">
            <p style="font-size: 18px; margin-bottom: 25px;">Gagal menghapus ${isTVShow ? 'TV Show' : 'film'}</p>
            <button id="messageOk" style="
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white; padding: 12px 25px; border: none; border-radius: 8px;
              cursor: pointer; font-size: 16px;
              transition: all 0.3s ease;
            ">OK</button>
          </div>
        `;
        document.body.appendChild(messageModal);
        document.getElementById('messageOk').onclick = () => document.body.removeChild(messageModal);
      }
    } catch (error) {
      const messageModal = document.createElement('div');
      messageModal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.7); display: flex;
        justify-content: center; align-items: center; z-index: 1000;
      `;
      messageModal.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
          padding: 30px; border-radius: 15px; text-align: center;
          color: white; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          max-width: 400px; width: 90%;
        ">
          <p style="font-size: 18px; margin-bottom: 25px;">Terjadi kesalahan</p>
          <button id="messageOk" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; padding: 12px 25px; border: none; border-radius: 8px;
            cursor: pointer; font-size: 16px;
            transition: all 0.3s ease;
          ">OK</button>
        </div>
      `;
      document.body.appendChild(messageModal);
      document.getElementById('messageOk').onclick = () => document.body.removeChild(messageModal);
    }
    setIsDeleting(false);
  };

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.jpg';

  return (
    <div className="movie-card fade-in" style={{
      background: 'linear-gradient(135deg,rgb(114, 114, 214) 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #72a0f0 100%)',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(139, 223, 29, 0.83)',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(63, 183, 219, 0.5)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <div style={{ position: 'relative', paddingBottom: '150%' }}>
        {!imageError ? (
          movie.tmdb_id ? (
            <a
              href={`https://www.themoviedb.org/${isTVShow ? 'tv' : 'movie'}/${movie.tmdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Lihat di TMDB"
              style={{ display: 'block' }}
            >
              <img
                src={posterUrl}
                alt={isTVShow ? movie.name : movie.title}
                onError={() => setImageError(true)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </a>
          ) : (
            <img
              src={posterUrl}
              alt={isTVShow ? movie.name : movie.title}
              onError={() => setImageError(true)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.5,
                cursor: 'not-allowed'
              }}
              title="TMDB ID tidak tersedia"
            />
          )
        ) : (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px'
          }}>
            {isTVShow ? '📺' : '🎬'}
          </div>
        )}
        
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(39, 84, 95, 0.8)',
          color: 'gold',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          ⭐ {isTVShow ? (movie.rating || movie.vote_average ? parseFloat(movie.rating || movie.vote_average).toFixed(1) : 'N/A') : (movie.rating ? parseFloat(movie.rating).toFixed(1) : 'N/A')}
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '8px',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {isTVShow ? movie.name : movie.title}
        </h3>

        <p style={{
          color: 'rgb(255, 255, 255)',
          fontSize: '14px',
          marginBottom: '16px'
        }}>
          📅 {isTVShow ? (movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : 'Unknown') : (movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown')}
        </p>

        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          <Link href={`/${isTVShow ? 'edit/tvshow' : 'edit'}/${movie.id}`} className="btn btn-secondary" style={{ flex: '1', minWidth: '80px', justifyContent: 'center' }}>
            ✏️ Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn btn-danger"
            style={{ flex: '1', minWidth: '80px', justifyContent: 'center' }}
          >
            {isDeleting ? '⏳' : '🗑️'} Hapus
          </button>
        </div>
      </div>
    </div>
  );
}