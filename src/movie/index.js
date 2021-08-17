import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Movie from "./movie";
import Item from "./item";
import Error from "./Error";
function Index() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Movie />
				</Route>
				<Route path="/item/:id" children={<Item />}></Route>
				<Route path="*">
					<Error />
				</Route>
			</Switch>
		</Router>
	);
}

export default Index;
