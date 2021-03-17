function UserPage() {
  renderUserList = getInitialData
  renderFilteredList = getFilteredData

  return /*html*/ `
  <div class="container mt-5">
  <div>
    <button>Get Users</button>
  </div>

  <label for="users">select user filter</label>

  <select name="user" id="options">
    <option value="name" selected="selected">Name</option>
    <option value="username">Username</option>
    <option value="email">Email</option>
  </select>

  <input id="userinput" placeholder="users" />

  <hr />
  <div class="row">
    <div class="col">
      <h5>Output</h5>
      <section id="output">
      ${renderUserList()}
      </section>
    </div>
    <div class="col">
      <h5>Results</h5>
      <section id="results">
        ${renderFilteredList()}
      </section>
    </div>
  </div>
</div>
  `
}

async function getInitialData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await response.json()

  document.getElementById('output').innerHTML = users.map((user) => `<div>${user.name}</div>`).join('')
}

async function getFilteredData() {
  const state = {
    users: [],
    timer: 0,
    timeout: 300,
    userInput: '',
    options: 'name'
  }

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  state.users = await response.json()

  const filterItems = (users, userInput) => {
    return state.users.filter((el) => el[state.options].toLowerCase().indexOf(userInput.toLowerCase()) !== -1)
  }

  const input = document.getElementById('userinput')
  const results = document.getElementById('results')
  const options = document.getElementById('options')

  options.addEventListener('change', (e) => {
    state.options = e.target.value
  })

  input.addEventListener('keydown', (e) => {
    window.clearTimeout(state.timer)
    state.userInput = e.target.value.trim()
  })

  input.addEventListener('keyup', (e) => {
    window.clearTimeout(state.timer)
    state.timer = window.setTimeout(() => {
      const filtered = filterItems(state.users, state.userInput)
      const renderList = filtered.map((res) => `<div>${res[state.options]}</div>`).join('')
      results.innerHTML = renderList
    }, state.timeout)
  })
}

document.querySelector('body').innerHTML = UserPage()
