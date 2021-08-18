import React from "react";
import { Link } from "react-router-dom";

function Error() {
	return (
		<div className="error">
			<Link to="/" className="error_link">
				{" "}
				<h1>Go back</h1>
			</Link>
			<h1>Error Page</h1>
		</div>
	);
}

export default Error;
