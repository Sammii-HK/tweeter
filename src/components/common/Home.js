import React from 'react'

import Navbar from './Navbar'

import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Home extends React.Component {


  constructor(){
    super()

    this.state = {

    }
  }


  render() {
    return (
      <main>
        <Navbar />
        <h1>Hello Universe</h1>
      </main>

    )
  }
}

export default Home
