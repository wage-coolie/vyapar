import React from 'react'
import "./about.css"
import AboutPageCarousal from '../../components/aboutPageCarousal/AboutPageCarousal'

export default function About() {
	return (
		<div className="container aboutContainer row align-middle text-center justify-content-center">
			<div className="col-xl-8  mx-auto  border-white text-white border aboutTitle">
				About page
			</div>
			<div className="col-xl-10  mx-auto  border-white text-white border aboutTitle">
				<AboutPageCarousal />
			</div>
		</div>
	)
}