import { doc, updateDoc } from "firebase/firestore";
import MovieCard from "../../components/movieCard/MovieCard";
import { UserContext } from "../../context/UserAuth";
import { db } from "../../firebase";
import "../../components/movieGridCate/movieGrid.scss";
import PageHeader from "../../components/pageHeader/PageHeader";
const Favorite = () => {
  const { user, movies } = UserContext();
  const favorMovieDb = doc(db, "user", `${user?.email}`);

  const filterMovie = async (id) => {
    const result = movies?.filter((movie) => movie.id !== id);
    await updateDoc(favorMovieDb, { favoriteMovie: result });
  };

  return (
    <>
      <PageHeader>Favorite</PageHeader>
      <div className="container height-100vh">
        <div className="section">
          <div className="movie-grid">
            {movies.length === 0 ? (
              <span>No movie</span>
            ) : (
              movies?.map((movie) => (
                <MovieCard
                  key={movie.id}
                  item={movie}
                  filterMovie={filterMovie}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorite;
