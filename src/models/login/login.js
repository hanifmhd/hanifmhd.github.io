class Login {
  constructor (item) {
    this.ticket_id = item.ticket_id
    this.duration = item.duration
    this.token = item.token
    this.refresh_token = item.refresh_token
    this.expire = item.expire
  }
}

export default Login
