import React, { useState, useEffect, useRef, useContext } from "react";
import { FaSpinner } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";
import defaultIMG from "../pexels-larissa-farber-7875459.jpg";

const numbers = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24, 25, 26, 27, 28, 29, 30,
];

const PAGENUM = numbers[Math.floor(Math.random() * numbers.length)].toString();
const APIURL =
	"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=" +
	PAGENUM;

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
	"https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const MovieContext = React.createContext({});
// Movie component
function Movie() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [inputText, setInputText] = useState("");
	// HOOKS
	const inputRef = useRef(null);

	// load movies
	const getMovies = async () => {
		try {
			const res = await fetch(APIURL);
			let data;
			if (res.ok) {
				data = await res.json();
			}
			if (data.results) {
				setMovies(data.results);
				setLoading(false);
			}
			throw new Error("Request failed");
		} catch (error) {
			console.log(error);
		}
	};

	// get movies by Search
	const getMovieBySearch = async (searchTerm) => {
		setLoading(true);
		try {
			const res = await fetch(SEARCHAPI + searchTerm);
			let data;
			if (res.ok) {
				data = await res.json();
			}
			const results = data.results;

			if (results.length > 0) {
				setMovies(results);
				setLoading(false);
				setInputText("");
			} else {
				getMovies();
				setInputText("");
			}
			throw new Error("Request failed");
		} catch (error) {
			console.log(error);
		}
	};

	// handle submit
	const handleSubmit = (e) => {
		e.preventDefault();
		getMovieBySearch(inputText);
	};

	// get rating
	const getRating = (rating) => {
		return rating >= 8.0 ? "green" : rating >= 6.0 ? "orange" : "red";
	};

	useEffect(() => {
		getMovies();
		inputRef.current.focus();
	}, []);
	return (
		<MovieContext.Provider value={{ getRating }}>
			<div className="main_container">
				<h1 className="title">Search Movies</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="e.g Batman"
						ref={inputRef}
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
					/>
					<button type="submit" onclick={handleSubmit}>
						<BiSearchAlt2 className="search_btn" />
					</button>
				</form>

				<div className="movies_container">
					{loading ? (
						<div className="loading_container">
							<FaSpinner className="spinner" />
						</div>
					) : (
						<>
							{movies.map((movie) => {
								return (
									<Link
										className="read_more_link"
										to={`/item/${movie.id}`}
										key={movie.id}
									>
										<MovieItem {...movie} key={movie.id} />
									</Link>
								);
							})}
						</>
					)}
				</div>
			</div>
		</MovieContext.Provider>
	);
}

const MovieItem = (props) => {
	const { id, poster_path, title, vote_average } = props;
	const { getRating } = useContext(MovieContext);
	const Url = poster_path && IMGPATH + poster_path;
	return (
		<>
			<div className="movie_item" key={id}>
				<img src={Url || defaultIMG} alt={title} />
				<div className="movie_title">
					<h3>{title.length > 17 ? title.slice(0, 17) + "..." : title}</h3>
					<span className={`rating ${getRating(vote_average)}`}>
						{vote_average.toFixed(1)}
					</span>
				</div>
			</div>
		</>
	);
};

export default Movie;
