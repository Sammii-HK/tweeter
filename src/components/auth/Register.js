import React from 'react'
import axios from 'axios'

import Navbar from '../common/Navbar'


class Register extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
    console.log(data)
  }

  handleSelect(inputValue) {
    const data = { ...this.state.data, [inputValue.name]: inputValue.value }
    this.setState({ data })
    console.log(data)
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
      .then(() => console.log('errors', this.state.errors))
  }


  render() {
    return (
      <main>
        <div className="register">
          <section className="section">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-half-desktop is-two-thirds-tablet gradient">
                  <div className="title is-3">Register</div>
                  <form onSubmit={this.handleSubmit}>

                    <div className="field">
                      <label className="label">Username *</label>
                      <div className="control">
                        <input
                          className="input"
                          name="username"
                          placeholder="eg: leela3000"
                          onChange={this.handleChange}
                          value={this.state.data.username || ''}
                        />
                      </div>
                      {this.state.errors.username && <div className="help is-danger">{this.state.errors.username}</div>}
                    </div>
                    <div className="field">
                      <label className="label">Email *</label>
                      <div className="control">
                        <input
                          className="input"
                          name="email"
                          placeholder="eg: r.smith@email.com"
                          onChange={this.handleChange}
                          value={this.state.data.email || ''}
                        />
                      </div>
                      {this.state.errors.email && <div className="help is-danger">{this.state.errors.email}</div>}
                    </div>
                    <div className="field">
                      <label className="label">Password *</label>
                      <div className="control">
                        <input
                          className="input"
                          name="password"
                          type="password"
                          placeholder="eg: ••••••••"
                          onChange={this.handleChange}
                          value={this.state.data.password || ''}
                        />
                      </div>
                      {this.state.errors.password && <div className="help is-danger">{this.state.errors.password}</div>}
                    </div>
                    <div className="field">
                      <label className="label">Password Confirmation *</label>
                      <div className="control">
                        <input
                          className="input"
                          name="passwordConfirmation"
                          type="password"
                          placeholder="eg: ••••••••"
                          onChange={this.handleChange}
                          value={this.state.data.passwordConfirmation || ''}
                        />
                      </div>
                      {this.state.errors.passwordConfirmation && <div className="help is-danger">{this.state.errors.passwordConfirmation}</div>}
                    </div>
                    <button className="button">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    )
  }
}

export default Register
