import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Navbar from '../common/Navbar'
import Auth from '../../lib/Auth'

class Login extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        console.log(res.data.token)
        this.props.history.push('/home')
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <main>
        <div className="login">
          <section className="section">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-half-desktop is-two-thirds-tablet gradient">
                  <div className="title is-3">Login</div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input
                          className="input"
                          name="email"
                          placeholder="eg: leela@planetexpress.nnyc"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control">
                        <input
                          className="input"
                          name="password"
                          type="password"
                          placeholder="eg: ••••••••"
                          onChange={this.handleChange}
                        />
                      </div>

                      {this.state.error && <div className="help is-danger">{this.state.error}</div>}
                    </div>

                    <button className="button">Submit</button>
                  </form>
                  <div className="section has-text-centered">
                    <p className="is-size-5">New to us? <Link to='/register'>Create an account</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    )
  }
}

export default Login
