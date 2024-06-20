import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { fetchImages } from '../../api';
import css from './App.module.css';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    async function fetchImagesAsync() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchImages(searchQuery, page);
        setImages(prev =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImagesAsync();
  }, [page, searchQuery]);

  const handleSearch = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {isError && <ErrorMessage message="There is an error! Try again!" />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
      <Toaster position="top-right" />
    </div>
  );
}
