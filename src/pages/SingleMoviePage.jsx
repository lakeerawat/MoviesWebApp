import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleMovieCard from "../components/SingleMovieCard";
// import MoviesListCard from "../components/MoviesListCard";

export default function SingleMoviePage(){
    const {id}=useParams();

    const BASE_URL = "https://api.tvmaze.com";

    const [movie,setMovie]=useState({})
    useEffect(() => {
        const fetchData = async () => {
          const res = await axios.get(`${BASE_URL}/shows/${id}`);
          setMovie(res.data);
        };
        fetchData();
      }, [id]);

      console.log(movie);

    return(
        <div>
            <SingleMovieCard title={movie?.name} image={movie?.image?.original} description={movie?.summary} />
            {/* <MoviesListCard id={movie?.id} title={movie?.name} image={movie?.image?.original} premiered={movie?.premiered} /> */}
        </div>
    )
}