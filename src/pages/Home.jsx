import axios from "axios";
import { useEffect, useState } from "react";
import MoviesListCard from "../components/MoviesListCard";
import './pages.css';

export default function Home(){
    const BASE_URL = "https://api.tvmaze.com";

    const genres=["Drama","Science-Fiction","Thriller","Crime","Comedy","Fantasy","Romance","Action","Crime","Mystery","Adventure"];

    const [movies, setMovies] = useState([]);
    const [searchedMovie,setSearchedMovie]=useState([])

    const [query, setQuery] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
    setSearchedMovie(res.data);
  }
  console.log("searchedMovie",searchedMovie);
  function handleChange(event) {
    setQuery(event.target.value);
  }

    useEffect(() => {
        const fetchData = async () => {
          const res = await axios.get(`${BASE_URL}/shows`);
          setMovies(res.data);
        };
        fetchData();
      }, []);
      console.log("check",movies);

    return(
    <>
    <form className="formDiv" onSubmit={handleSubmit}>
      <input
        style={{padding:"10px 20px"}}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button style={{padding:"10px 20px"}} type="submit">Search</button>
    </form>
    {
        genres.map((e,i)=>
        searchedMovie.length===0 ? 
        <div className="generContainer">
                        <h1>{e}</h1>
        <div key={i} style={{display:"grid", gridTemplateColumns:"repeat(5,1fr)",gap:"25px",marginTop:"50px"}}>
            {movies.map((movie,i)=>{
            if(movie.genres?.includes(e)){
                return(
                <MoviesListCard id={movie.id} key={movie.id} title={movie.name} image={movie.image?.original} premiered={movie.premiered} />
                )
            }
            return null;
            })}
        </div>
        </div>:
        <div style={{display:"grid", gridTemplateColumns:"repeat(5,1fr)",gap:"25px"}}>
        {searchedMovie.length!==0 && searchedMovie.map((movie,i)=>{
        return(
        <MoviesListCard id={movie.show?.id} key={movie.show?.id} title={movie.show?.name} image={movie.show?.image?.original} premiered={movie.show?.premiered} />
        )
        })}
    </div>        
        )
    }   
    </>
    )
}