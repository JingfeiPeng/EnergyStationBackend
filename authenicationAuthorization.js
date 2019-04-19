//Authenication: check if user has right credentials
//Authorization : see permissions for user A

// New Endpoints:
// Register: Post /api/users {name: email: password}
// Login: Post /api/logins // Creating new login request/command


email:{
    type: String,
    unique: true,
}