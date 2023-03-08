import { useNavigate } from 'react-router-dom';
import './MoviesListCard.css';

export default function MoviesListCard({id,image,title,premiered}){
    const navigate=useNavigate()
          return (
    <div className="movie-card">
      <div className="movie-card__img-container">
        <img onClick={()=>navigate(`/${id}`)} className="movie-card__img" src={image} alt={image} />
      </div>
      <div className="movie-card__content">
        <h2 onClick={()=>navigate(`/${id}`)} className="movie-card__title">{title}</h2>
        <p className="movie-card__release-date">Release date: {premiered}</p>
      </div>
    </div>
          );
        };
