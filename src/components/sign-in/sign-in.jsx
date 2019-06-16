import React from "react";
import PropTypes from "prop-types";

export class SignInComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      password: ``
    };

    this._handleChangeEmail = this._handleChangeEmail.bind(this);
    this._handleChangePassword = this._handleChangePassword.bind(this);
  }

  _handleChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  _handleChangePassword(e) {
    this.setState({password: e.target.value});
  }

  render() {
    const {onSubmitHandler} = this.props;

    return <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={(e) => onSubmitHandler(e, this.state)}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" required onChange={this._handleChangeEmail}/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password" required onChange={this._handleChangePassword}/>
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
      </div>
    </main>;
  }
}

SignInComponent.propTypes = {
  onSubmitHandler: PropTypes.func
};
