import { useEffect } from 'react';
import useNasaStore from './store/useNasaStore';

function App() {
  const { 
    filteredPhotos, 
    loading, 
    fetchNasaPhotos, 
    searchTerm, 
    setSearchTerm 
  } = useNasaStore();

  useEffect(() => {
    fetchNasaPhotos();
  }, [fetchNasaPhotos]);

  return (
    <div className="min-h-screen bg-space-900 text-white p-6 md:p-12 font-sans">
      
      {/* Header Alanı */}
      <header className="mb-10 border-b border-gray-700 pb-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-wider text-space-accent mb-2">
          AEROSPACE DASHBOARD
        </h1>
        <p className="text-gray-400">NASA APOD (Astronomy Picture of the Day) - Derin Uzay Keşif Verileri</p>
      </header>

      {/* Arama Alanı (Eski Filtrenin Yerini Aldı) */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between bg-space-800 p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <label className="text-gray-400 font-medium whitespace-nowrap">Görsel Adında Ara:</label>
          <input 
            type="text"
            placeholder="Galaxy, star, moon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-space-900 text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-space-accent transition-colors w-full md:w-64"
          />
        </div>
        
        <div className="mt-4 md:mt-0 text-gray-400">
          Gösterilen Sonuç: <span className="text-space-accent font-bold">{filteredPhotos.length}</span>
        </div>
      </div>

      {/* Yükleniyor Durumu */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-space-accent"></div>
        </div>
      ) : (
        /* Veri Izgarası */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="bg-space-800 rounded-xl overflow-hidden shadow-lg hover:shadow-space-accent/20 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={photo.img_src} 
                  alt={photo.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <span className="bg-space-accent/20 text-space-accent text-xs px-2 py-1 rounded border border-space-accent/30 font-mono">
                    APOD Görevi
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                {/* Uzun başlıkları tek satırla sınırla (line-clamp-1) */}
                <h3 className="font-bold text-lg mb-1 line-clamp-1" title={photo.title}>{photo.title}</h3>
                <p className="text-sm text-gray-400 mb-3">Tarih: {photo.date}</p>
                {/* Açıklama metnini iki satırla sınırla (line-clamp-2) */}
                <div className="text-xs text-gray-500 border-t border-gray-700 pt-3 line-clamp-2" title={photo.explanation}>
                  {photo.explanation}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hiç sonuç bulunamazsa */}
      {!loading && filteredPhotos.length === 0 && (
        <div className="text-center text-gray-400 py-20 bg-space-800 rounded-lg">
          Arama kriterinize uygun uzay görseli bulunamadı. Lütfen başka bir kelime deneyin.
        </div>
      )}
    </div>
  );
}

export default App;