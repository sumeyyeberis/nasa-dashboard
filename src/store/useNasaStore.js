import { create } from 'zustand';

// API çöktüğünde devreye girecek Hardcoded Mock Data (Fallback)
const MOCK_DATA = [
  {
    id: 1,
    img_src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop",
    title: "Andromeda Galaxy",
    date: "2023-11-01",
    explanation: "Derin uzayda yer alan devasa sarmal galaksinin nefes kesici görünümü."
  },
  {
    id: 2,
    img_src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    title: "Earth from Orbit",
    date: "2023-11-02",
    explanation: "Uluslararası Uzay İstasyonu'ndan çekilmiş, mavi gezegenimizin atmosferini gösteren büyüleyici kare."
  },
  {
    id: 3,
    img_src: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1000&auto=format&fit=crop",
    title: "Milky Way Stars",
    date: "2023-11-03",
    explanation: "Kendi galaksimiz Samanyolu'nun merkezine doğru uzanan milyonlarca yıldız kümesi."
  },
  {
    id: 4,
    img_src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop",
    title: "Deep Space Nebula",
    date: "2023-11-04",
    explanation: "Yeni yıldızların doğduğu, kozmik gaz ve tozlardan oluşan renkli bulutsu (nebula) yapısı."
  }
];

const useNasaStore = create((set, get) => ({
  photos: [],
  filteredPhotos: [],
  loading: false,
  searchTerm: '',

  fetchNasaPhotos: async () => {
    set({ loading: true });
    try {
      const API_KEY = 'XOc0W3yPB7aIpmcFbZQNSlAx5s3qhsiSxacEj6Im'; 
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=12`);
      
      // NASA 503 veya 404 dönerse direkt Error fırlat ki catch bloğuna düşsün
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.length > 0) {
        const formattedData = data
          .filter(item => item.media_type === 'image')
          .map((item, index) => ({
            id: index,
            img_src: item.url,
            title: item.title,
            date: item.date,
            explanation: item.explanation
          }));

        set({ photos: formattedData, filteredPhotos: formattedData, loading: false });
      } else {
        // Veri boş gelirse Fallback devreye girsin
        set({ photos: MOCK_DATA, filteredPhotos: MOCK_DATA, loading: false });
      }
    } catch (error) {
      console.error("API Outage Detected. Fallback to Mock Data:", error);
      // Catch bloğu: Gerçek sunucu çöktüğünde State'i Mock Data ile güncelle
      set({ loading: false, photos: MOCK_DATA, filteredPhotos: MOCK_DATA });
    }
  },

  setSearchTerm: (term) => {
    const { photos } = get();
    const lowercasedTerm = term.toLowerCase();
    set({
      searchTerm: term,
      filteredPhotos: photos.filter(photo => 
        photo.title.toLowerCase().includes(lowercasedTerm)
      )
    });
  }
}));

export default useNasaStore;
