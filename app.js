function UserPage() {
  renderUserList = getInitialData;
  renderFilteredList = getFilteredData;

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
  `;
}

async function getInitialData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  document.getElementById("output").innerHTML = users
    .map((user) => `<div>${user.name}</div>`)
    .join("");
}

async function getFilteredData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  let option = document.getElementById("options");

  let timer;
  const timeout = 1000;
  let userInput = "";

  const input = document.getElementById("userinput");
  const results = document.getElementById("results");

  input.addEventListener("keydown", (e) => {
    window.clearTimeout(timer);
    console.log("typing...");
  });

  input.addEventListener("keyup", (e) => {
    const filterItems = (users, userInput, options = option.value) => {
      return users.filter(
        (el) =>
          el[options].toLowerCase().indexOf(userInput.toLowerCase()) !== -1
      );
    };
    window.clearTimeout(timer);
    userInput = e.target.value;

    timer = window.setTimeout(() => {
      let options = option.value;
      // filer list logic
      const filtered = filterItems(users, userInput);

      results.innerHTML = filtered
        .map((res) => `<div>${res[options]}</div>`)
        .join("");
    }, timeout);
  });

  // console.log(input);
}

document.querySelector("body").innerHTML = UserPage();
