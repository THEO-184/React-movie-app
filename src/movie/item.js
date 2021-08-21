import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import defaultIMG from "../pexels-larissa-farber-7875459.jpg";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function Item() {
	const [movie, setMovie] = useState({});
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	const {
		poster_path,
		adult,
		title,
		status,
		release_date,
		production_companies,
		overview,
		genres,
	} = movie;
	const Url = poster_path && IMGPATH + poster_path;

	const PRODUCERS = [];
	const GENRES = [];
	const producersArr = new Set(production_companies);
	for (let item of producersArr) {
		PRODUCERS.push(item.name);
	}

	const genresArr = new Set(genres);
	for (let item of genresArr) {
		GENRES.push(item.name);
	}

	const getItem = async () => {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=04c35731a5ee918f014970082a0088b1
`
		);
		const data = await res.json();
		if (data) {
			setMovie(data);
			setLoading(false);
		}
	};

	useEffect(() => {
		getItem();
	}, []);

	if (loading) {
		<div className="loading_container">
			<FaSpinner className="spinner" />
		</div>;
	}
	return (
		<>
			<div className="link_container">
				<Link to="/" className="go_home_btn">
					Go Home
				</Link>
			</div>
			<div className="item_container">
				<div className="img_container">
					<img src={Url || defaultIMG} alt="" />
				</div>
				<div className="about_movie">
					<div>
						<span className="headings">Title:</span> {title}
					</div>
					<div>
						<span className="headings">status:</span> {status}
					</div>
					<div>
						<span className="headings">released on:</span> {release_date}
					</div>
					<div className="story">
						<span className="headings">story:</span> {overview}
					</div>
					<p>
						<span className="headings">Producers:</span>
						{PRODUCERS.map((name) => {
							return (
								<span key={Math.random()} className="producers">
									{name}
								</span>
							);
						})}
					</p>
					<p>
						<span className="headings">Genres:</span>
						{GENRES.map((name) => {
							return (
								<span key={Math.random()} className="genres">
									{name}
								</span>
							);
						})}
					</p>
				</div>
			</div>
		</>
	);
}

export default Item;
