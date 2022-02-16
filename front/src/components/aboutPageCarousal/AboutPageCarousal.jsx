import {React,useEffect,useState} from 'react'
import './aboutpagecarousal.css'

export default function AboutPageCarousal() {
	const [counter,setCounter] = useState(1);
	 useEffect(() => {
	  	setTimeout(()=>{
	  		setCounter(counter === 8 ? 1 : counter + 1 );
	  		console.log(`the counter is ${counter}`);
	  	},3000)

	   }, [counter]);

	return (
		<div className="container">
		<div className="row align-middle align-items-center justify-content-center" >
			<div className='img-fluid  align-items-center col-xl-4 justify-content-center '>
	      		<img className=" img-fluid align-items-center" src={`/carousal/carousal${counter}.png`} alt="First slide"/>
	      	</div>
	      	<div className="col-xl-1 seperator" >
	      	</div>
	      	<div className='col-xl-5'>
	      		<h4>Vyapar | व्यापार</h4>
	      		<div className="row data-about align-items-center justify-content-center">
		      		<p className='about-desc'>is Hindi word for business.</p>
		      		<p className='about-desc'>The project is made to showcase Programming skill .</p>
					<table className="align-middle table table-success table-striped table-sm justify-content-center">
					  <thead >
					    <tbody className="justify-content-center align-middle" >
					    	<tr>
					      		<td scope="row fs-5 ">Made with</td>
					    	</tr>
						    <tr>
						      <td scope="row fs-6">Mongo Db</td>
						    </tr>
						    <tr>
						      <td scope="row fs-6">Express Server</td>
						    </tr>
						    <tr>
						      <td scope="row fs-6">React</td>
						    </tr>
						    <tr>
						      <td scope="row  fs-6">Node</td>
						    </tr>
						    <tr>
						      <td scope="row fs-6">Bootstrap</td>
						    </tr>
						    <tr>
						      <td scope="row fs-6">Material-Ui Icons</td>
						    </tr>

						 </tbody>
					  </thead>
					</table>
	      		</div>
	      	</div>
			
		</div>
		</div>
	)
}