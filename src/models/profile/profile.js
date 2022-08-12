class Profile {
  constructor (item) {
    this.id = item.id
    this.email = item.email
    this.fullname = item.fullname
    this.phone_no = item.phone_no
    this.code_role = item.current_role.code
    this.code_id = item.current_role.id
    this.profile_picture = item.profile_picture
    this.default_role_picture = item.default_role_picture
    this.flag = item.flag
  }
}

export default Profile
