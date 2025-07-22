// express . url encoder
// it is different from params and query
// params and query are intended to attach in the url and visible to user
// but when we submit some form data or pass it somewhere we use url encoder to
// encode what data says and transfer it to req.body else it is not readable eg form data we pass
/*
POST /register
Content-Type: application/x-www-form-urlencoded

username=ankit&password=secret
*/

// You're sending a POST request to /register.

// The data is sent in the request body, not in the URL.

// The Content-Type tells the server: “Hey, I’m sending form-style data in the body.”

// The body contains: username=ankit&password=secret

// it is not this POST /register?username=ankit&password=secret
// This would be sending data in the URL (query string).

// eg:- <form action="/register" method="POST">
//   <input name="username" value="ankit" />
//   <input name="password" value="secret" />
//   <button type="submit">Register</button>
// </form>

// BODY:- username=ankit&password=secret

app.use(express.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
  console.log(req.body.username); // 'ankit'
  console.log(req.body.password); // 'secret'
});
// if we don't use url encoder we cannot access this like that from body

// if url encoder not used
console.log(req.body.username); // ❌ Error: Cannot read property 'username' of undefined

// async and try catch handler
// promise both are okay .then or .catch
