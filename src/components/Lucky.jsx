import React from "react";
import axios from "axios";
import "./Lucky.css";
const baseImg = "https://image.tmdb.org/t/p/w92";
const indexAleatoirePage = Math.floor(Math.random()*15+1);

class Lucky extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		series: [],
		isLoaded: false,		
	}}
getSeries = () => {
	const {series} = this.state;
	axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=590e90c03c55c8852b1ed2de7215607f&language=fr&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${indexAleatoirePage}&vote_count.gte=500`)
	.then(res => {
		const randomSeries=[];
		const results = res.data.results;
		for (let i = 0; i < 5; i++) {
			const randomNumber = Math.floor(Math.random()*results.length);
			randomSeries.push(results.splice(randomNumber,1)[0])
			console.log(randomNumber, randomSeries);
		}
		console.log(randomSeries)			
		this.setState({series: randomSeries, isLoaded: true})		
	})}	
	render(){		
		const {series} = this.state;
		console.log("Serie : ", this.state.series)
	return (
		<>
		<div className="LuckySection">
			<h2 className="LuckyTitle"> Ou tentez notre bouton magique</h2>
			<button className="luckyBtn" onClick={this.getSeries} type="button">J'ai de la chance</button>
			<div className="reco5">							
				{ series.map((serie, index) => 
					<div key={index}>				
						<img src={baseImg + serie.poster_path} alt={serie.name} />				
						<p>{serie.name}</p>				
					</div>)	}							
			</div>
		</div>	
    	</>
		)
    }
}
export default Lucky;