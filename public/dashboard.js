const token = localStorage.getItem('token')

if (!token) {
  window.location = 'login.html'
}

// ========================
// LOGOUT
// ========================
function logout() {
  localStorage.removeItem('token')
  window.location = 'login.html'
}

// ========================
// ADMIN LOAD
// ========================
async function loadAdminData() {
  const res = await fetch('/api/admin/all-announcements', {
    headers: { Authorization: token },
  })

  const data = await res.json()

  document.getElementById('announcementList').innerHTML = data
    .map(
      (a) =>
        `<div style="border:1px solid #ccc;padding:10px;margin:5px;">
        ${a.message}
        ${
          !a.approved
            ? `<button onclick="approve('${a._id}')">Approve</button>`
            : '<strong> Approved</strong>'
        }
      </div>`,
    )
    .join('')
}

// APPROVE
async function approve(id) {
  await fetch(`/api/admin/approve/${id}`, {
    method: 'PUT',
    headers: { Authorization: token },
  })
  loadAdminData()
}

// ========================
// TEACHER LOAD
// ========================
async function loadTeacherData() {
  const res = await fetch('/api/announcements', {
    headers: { Authorization: token },
  })

  const data = await res.json()

  document.getElementById('teacherAnnouncements').innerHTML = data
    .map(
      (a) => `<div>${a.message} (${a.approved ? 'Approved' : 'Pending'})</div>`,
    )
    .join('')
}

// ADD ANNOUNCEMENT
async function addAnnouncement() {
  await fetch('/api/teacher/announcement', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      message: document.getElementById('message').value,
    }),
  })

  loadTeacherData()
}

// ========================
// AUTHORITY LOAD
// ========================
async function loadAuthorityData() {
  const res = await fetch('/api/announcements', {
    headers: { Authorization: token },
  })

  const data = await res.json()

  document.getElementById('authorityAnnouncements').innerHTML = data
    .filter((a) => a.approved)
    .map((a) => `<div>${a.message}</div>`)
    .join('')
}
