import db from '../../../lib/db';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [tvshows] = await db.query('SELECT * FROM tv_shows ORDER BY created_at DESC');
      const mapped = tvshows.map(tv => ({
        ...tv,
        name: tv.title,
        first_air_date: tv.release_date
      }));
      res.status(200).json(mapped);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Gagal mengambil data TV Show' });
    }
  } 
  else if (req.method === 'POST') {
    const { tmdb_id } = req.body;
    if (!tmdb_id) {
      return res.status(400).json({ message: 'TMDB ID diperlukan' });
    }
    try {
      const [existing] = await db.query('SELECT id FROM tv_shows WHERE tmdb_id = ?', [tmdb_id]);
      if (existing.length > 0) {
        return res.status(409).json({ message: 'TV Show sudah ada dalam database' });
      }
      const tmdbRes = await axios.get(`https://api.themoviedb.org/3/tv/${tmdb_id}?api_key=${process.env.TMDB_API_KEY}`);
      const tv = tmdbRes.data;
      const [result] = await db.query(
        'INSERT INTO tv_shows (title, poster_path, release_date, rating, tmdb_id, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [tv.name, tv.poster_path, tv.first_air_date, tv.vote_average, tv.id]
      );
      res.status(201).json({
        id: result.insertId,
        message: 'TV Show berhasil ditambahkan',
        tvshow: {
          id: result.insertId,
          title: tv.name,
          poster_path: tv.poster_path,
          release_date: tv.first_air_date,
          rating: tv.vote_average,
          tmdb_id: tv.id,
          name: tv.name,
          first_air_date: tv.first_air_date
        }
      });
    } catch (error) {
      console.error('Error adding TV Show:', error);
      if (error.response?.status === 404) {
        res.status(404).json({ message: 'TV Show tidak ditemukan di TMDB' });
      } else {
        res.status(500).json({ message: 'Gagal menambahkan TV Show' });
      }
    }
  }
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: 'Method tidak diizinkan' });
  }
}
