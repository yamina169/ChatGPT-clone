import './Card.css'
import React from 'react'
import {Profil ,Button} from '../index';
import { Link} from 'react-router-dom';


const Card = () => {
  return (
    <div>
        <div class="d-flex justify-content-center">
  <div class="card">
    <div class="card-body">
 <div className='gauche '>
  
 <Profil fontSize={11} />


</div>
<div  className='droite'>
  <Link to="/Edit">
<Button  className="btn btn-light"width={160}  height={40}  marginTop={-120}  p="Edit my profile"    Link="EditProfil"/>
</Link>
</div>

    </div>
  </div>
</div>
    </div>
  )
}

export default Card