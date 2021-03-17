function UserPage() {
  renderUserList = getInitialData
  //renderFilteredList = getFilteredData

  return /*html*/ `
  <div class="container mt-5">
  <h1 id="loading"></h1>
  <div>
    <button>Get Users</button>
  </div>

  <label for="users">select user filter</label>

  <select name="user" id="options" onchange="state.options = this.value">
    <option value="name" selected="selected">Name</option>
    <option value="username">Username</option>
    <option value="email">Email</option>
  </select>

  <input id="userinput" placeholder="users" oninput="setState(this.value)" />

  <hr />
  <div class="row">
    <div class="col">
      <h5>Output</h5>
      <section id="output">
      ${renderUserList()}
      </section>
    </div>
    <div class="col">
      <h5>Filter Results</h5>
      <section id="filteredresults">
       
      </section>
    </div>
  </div>
</div>
  `
}

const state = {
  users: [],
  userInput: '',
  options: 'name',
  t: 0
}

async function getInitialData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await response.json()

  state.users = users

  document.getElementById('output').innerHTML = users.map((user) => `<div>${user.name}</div>`).join('')
  document.getElementById('filteredresults').innerHTML = users.map((user) => `<div>${user.name}</div>`).join('')
}

const filterItems = (users, userInput) => {
  console.log({ state })
  return users.filter((el) => el[state.options].toLowerCase().indexOf(userInput.toLowerCase()) !== -1)
}

function setLoading(value) {
  document.querySelector('#loading').innerHTML = value ? 'Loading...' : ''
}

function render() {
  const results = document.getElementById('filteredresults')
  const filtered = filterItems(state.users, state.userInput)
  const renderList = filtered.map((user) => `<div>${user[state.options]}</div>`).join('')
  results.innerHTML = renderList
  setLoading(false)
}

function setNewTimer() {
  state.t && clearTimeout(state.t)
  setLoading(true)
  //state.t = setTimeout(render, 250)
  render()

  console.log({ t: state.t })
}

function setState(newValue) {
  state.userInput = newValue

  setNewTimer()
}

document.querySelector('body').innerHTML = UserPage()
