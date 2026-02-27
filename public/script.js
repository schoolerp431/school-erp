async function login() {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })

  const data = await res.json()

  if (data.token) {
    localStorage.setItem('token', data.token)

    if (data.role === 'Admin') {
      window.location = 'admin.html'
    } else if (data.role === 'Teacher') {
      window.location = 'teacher.html'
    } else {
      window.location = 'authority.html'
    }
  } else {
    msg.innerText = 'Login Failed'
  }
}
