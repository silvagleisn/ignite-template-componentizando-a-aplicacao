import { useEffect, useState } from 'react';
import { Content } from './components/Content';
import { api } from './services/api';
import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';
import { Sidebar } from 'react-feather';


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SidebarProps {
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}


export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
     <Sidebar selectedGenreId={selectedGenreId} handleClickButton={handleClickButton} />
     <Content selectedGenre={selectedGenre} selectedGenreId={selectedGenreId} />
    </div>
  )
} 