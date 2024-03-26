import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>Welcome to Tune Valley 🎹

<Link to='/register' ><button>Sign in</button></Link>

    </div>
   
  )
}

export default Home