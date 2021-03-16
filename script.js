// PAIR PROGRAMMING EXERCISE.
//       1 DRIVER, 1 NAVIGATOR.

//       1 Exercise each. Use GitHub to share the code.

//       Less exercise, more complicated.

//       Ex1) Retrieve and display, using async / await pattern the users from: https://jsonplaceholder.typicode.com/users
//       Ex2) Create a dropdown (<select>) that allows the user to select between name, username and email.
//            Create then a filter. When the user types in something, you should filter the user based on the input and on the value of the select.
//            Es.: select on NAME. Filter input = Glenna, only user id number 9 should remain

//       Ex3) Create a function that, from the list of users, extracts only the name
//       Ex4) Create a function that, from the list of users, creates an array of addresses as string and not as an object. Like:
//               {
//               "street": "Victor Plains",
//               "suite": "Suite 879",
//               "city": "Wisokyburgh",
//               "zipcode": "90566-7771",
//               "geo": {
//                 "lat": "-43.9509",
//                 "lng": "-34.4618"
//               }
//           Should become Victor Plains, Suite 879, Wisokyburgh (90566-7771)

//       Ex5) Add a button that sorts the list by name ascending / descending (ONE button)
//       Ex6) Add a link on each user, when clicked it must go to a detail page, where to user information are presented (from the API)

//       EXTRA)
//       Visualize on a Google Map plugin all the users (using lat & lng)
const input = document.querySelector("input");
const selectOption = document.querySelector("#selectoption");
const button = document.querySelector("button");
window.onload = async () => {
  input.value = "";
  selectOption.value = "username";

  // input.addEventListener("onkeyup", result);
  button.onclick = result;

  // selectOption.addEventListener("change", (e) => {
  //   option = e.target.value;
  //   console.log(option);
  // });

  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json().catch((err) => console.log(err));
  console.log(users);

  // const filterName = () => {
  //   console.log(users.filter((user) => user.name === option));
  // };

  // const filterUsername = () => {
  //   console.log(users.filter((user) => user.email === "Sincere@april.biz"));
  // };

  // const filterEmail = () => {
  //   console.log(users.filter((user) => user.email === "Sincere@april.biz"));
  // };

  // filterName();

  function result(
    e,
    selectedOption = selectOption.value,
    inputU = input.value.toLowerCase()
  ) {
    let filter = users.map((user) => {
      if (user[selectedOption].toLowerCase().includes(inputU)) {
        console.log(user[selectedOption]);
        return user[selectedOption];
      }
    });
  }
};
