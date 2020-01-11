import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Navbar from '../common/Navbar'
import Auth from '../../lib/Auth'

class Profile extends React.Component {

  constructor(){
    super()

    this.state = {
      data: null
    }
  }

  componentDidMount(){

    const token = Auth.getToken()

    axios.get('/api/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.error(err))
  }


  render(){
    if(!this.state.data) return null
    return(
      <main>
        <Navbar />
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <div>
                <Link to="/me/edit">
                  <button className="button">Edit Profile</button>
                </Link>

                <div className="title is-4">Profile</div>
                <label className="label">Username</label>
                <div>{this.state.data.username}</div>

                <label className="label">Email</label>
                <div>{this.state.data.email}</div>
                <hr />

              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

}

export default Profile
