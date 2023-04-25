import { useEffect, useState } from 'react';
import Auth from './components/Auth';
import { db, auth, storage } from './firebase.ts';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

type Movie = {
  id: string;
  title: string;
  releaseYear: number;
  oscar: boolean;
};

function App() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const moviesColRef = collection(db, 'movies');

  const [title, setTitle] = useState<string>('');
  const [releaseYear, setReleaseYear] = useState<number>(0);
  const [oscar, setOscar] = useState<boolean>(false);

  const [updatedTitle, setUpdatedTitle] = useState<string>('');

  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const handleSubmitMovie = async () => {
    try {
      await addDoc(moviesColRef, {
        title: title,
        releaseYear: releaseYear,
        oscar: oscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesColRef);
      const filteredData = data.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Movie;
      });
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id: string) => {
    const movieDoc = doc(db, 'movies', id);
    try {
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const updateMovieTitle = async (id: string) => {
    const movieDoc = doc(db, 'movies', id);
    try {
      await updateDoc(movieDoc, { title: updatedTitle });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFolder/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieList();
    console.log(auth.currentUser?.uid);
  }, []);

  return (
    <div>
      <h1>My App</h1>
      <div>
        <Auth />
      </div>

      <div>
        <h2>Add Movie</h2>
        <label htmlFor="title">Title </label>
        <input
          id="title"
          type="text"
          placeholder="Title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="releaseYear">Release Year </label>
        <input
          id="releaseYear"
          type="number"
          placeholder="Release year..."
          onChange={(e) => setReleaseYear(Number(e.target.value))}
        />
        <br />
        <label htmlFor="oscar">Received Oscar? </label>
        <input
          id="oscar"
          type="checkbox"
          onChange={(e) => setOscar(e.target.checked)}
        />
        <br />
        <button onClick={handleSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => {
          return (
            <div key={movie.id}>
              <h2>{movie.title}</h2>
              <p>Release Year: {movie.releaseYear}</p>
              <p>Received Oscar: {movie.oscar ? '✅' : '❌'}</p>
              <br />
              <button onClick={() => deleteMovie(movie.id)}>
                Delete Movie
              </button>
              <br />
              <input
                type="text"
                placeholder="New title..."
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button onClick={() => updateMovieTitle(movie.id)}>
                Update Title
              </button>
            </div>
          );
        })}
      </div>
      <br />

      <div>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files !== null) {
              setFileUpload(e.target.files[0]);
            }
          }}
        />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
