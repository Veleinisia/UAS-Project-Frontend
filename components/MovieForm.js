import { useState, useEffect } from 'react';

export default function MovieForm({ movieData = {}, onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    poster_path: '',
    release_date: '',
    rating: ''
  });

  const [errors, setErrors] = useState({});

useEffect(() => {
  if (movieData) {
    setFormData({
      title: movieData.title || movieData.name || '', 
      poster_path: movieData.poster_path || '',
      release_date: movieData.release_date || '',
      rating: movieData.rating || movieData.vote_average || ''
    });
  }
}, [movieData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Judul harus diisi';
    if (!formData.release_date) newErrors.release_date = 'Tanggal rilis harus diisi';
    if (formData.rating && (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 10)) {
      newErrors.rating = 'Rating harus berupa angka antara 0-10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div style={{
      background: 'rgba(20, 171, 209, 0.12)',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid rgba(163, 226, 14, 0.8)',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600',  color: 'white' }}>
            Judul Film *
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Masukkan judul film"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${errors.title ? '#ff6b6b' : 'rgba(229, 255, 0, 0.84)'}`,
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '16px'
            }}
          />
          {errors.title && <p style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '4px' }}>{errors.title}</p>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600',  color: 'white' }}>
            Poster Path
          </label>
          <input
            name="poster_path"
            value={formData.poster_path}
            onChange={handleChange}
            placeholder="/path/to/poster.jpg"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${errors.title ? '#ff6b6b' : 'rgba(229, 255, 0, 0.84)'}`,
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600',  color: 'white' }}>
            Tanggal Rilis *
          </label>
          <input
            name="release_date"
            type="date"
            value={formData.release_date}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${errors.title ? '#ff6b6b' : 'rgba(229, 255, 0, 0.84)'}`,
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '16px'
            }}
          />
          {errors.release_date && <p style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '4px' }}>{errors.release_date}</p>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600',  color: 'white' }}>
            Rating (0-10)
          </label>
          <input
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={formData.rating}
            onChange={handleChange}
            placeholder="8.5"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${errors.title ? '#ff6b6b' : 'rgba(229, 255, 0, 0.84)'}`,
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '16px'
            }}
          />
          {errors.rating && <p style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '4px' }}>{errors.rating}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{
            padding: '16px',
            fontSize: '16px',
            fontWeight: 'bold',
            justifyContent: 'center'
          }}
        >
          {loading ? '⏳ Menyimpan...' : '💾 Update Film'}
        </button>
      </form>
    </div>
  );
}