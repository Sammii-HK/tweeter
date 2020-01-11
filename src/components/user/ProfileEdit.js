import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Navbar from '../common/Navbar'
import Auth from '../../lib/Auth'

class ProfileEdit extends React.Component {

  constructor(){
    super()

    this.state = {
      data: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){

    const token = Auth.getToken()

    axios.get('/api/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        const data = { ...res.data, ['status']: 'pending' }
        this.setState({ data })
    })
      .catch(err => console.error(err))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
    console.log(this.state.data)
  }

  handleSubmit(e) {
   e.preventDefault()


   const token = Auth.getToken()

   axios.put('/api/me', this.state.data, {
     headers: { 'Authorization': `Bearer ${token}` }
   })
     .then(() => this.props.history.push('/me'))
     .catch(err => this.setState({ errors: err.response.data.errors }))
 }


  render(){
    if(!this.state.data) return null
    return(
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12">
              <Link to="/me">
                <button className="button">Back</button>
              </Link>
            </div>
            <div className="column is-half-desktop is-two-thirds-tablet">
              <div className="title is-4">Profile</div>
              <label className="label">Username</label>
              <div>{this.state.data.username}</div>

              <label className="label">Email</label>
              <div>{this.state.data.email}</div>
              <hr />
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">Location</label>
                  <div className="control">
                    <input
                      className="input"
                      name="location"
                      placeholder="eg: United Kingdom"
                      onChange={this.handleChange}
                      value={this.state.data.location || ''}
                    />
                  </div>
                  {this.state.errors.location && <div className="help is-danger">{this.state.errors.location}</div>}
                </div>


                <button className="button is-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default ProfileEdit
