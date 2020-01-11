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
  }

  componentDidMount(){

    const token = Auth.getToken()

    axios.get('/api/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.error(err))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
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
            <div className="column is-half-desktop is-two-thirds-tablet">
              <Link to="/me">
                <button className="button">Back</button>
              </Link>
            </div>
            <div className="column is-half-desktop is-two-thirds-tablet">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">email</label>
                  <div className="control">
                    <input
                      className="input"
                      name="name"
                      placeholder="eg: Rosé"
                      onChange={this.handleChange}
                      value={this.state.data.email || ''}
                    />
                  </div>
                  {this.state.errors.email && <div className="help is-danger">{this.state.errors.email}</div>}
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
