// https://github.com/typicode/json-server#routes Here you can find information on how to sort, order or search the API resource
var employeesAPI = "http://rest.vedinas.ro/employees";

function deserializeResponse(response) {
  // .json() does JSON.parse behind the scenes
  return response.json();
}

function createEmployeeElement(employee) {
  // console.log(employee);

  var employeeElement = document.createElement("li");
  employeeElement.classList.add("employee");
  employeeElement.setAttribute("data-id", employee.id);

  var employeeNameElement = document.createElement("div");
  employeeNameElement.classList.add("name");
  employeeNameElement.innerText = employee.name;

  var pElement = document.createElement("p");

  //<span>Age: 27</span> <span>Salary: 27</span>

  var pInnerHtml = `<span>Age: ${employee.age}</span> <span>Salary: ${employee.salary}</span>`;

  pElement.innerHTML = pInnerHtml;

  var removeElement = document.createElement("button");
  removeElement.classList.add("remove");
  removeElement.innerText = "X";

  employeeElement.appendChild(employeeNameElement);
  employeeElement.appendChild(pElement);
  employeeElement.appendChild(removeElement);

  removeElement.addEventListener("click", removeEmployee);

  return employeeElement;
}

function listEmployees(employees) {
  console.log(employees);
  var agendaElement = document.querySelector(".agenda");
  for (var i = 0; i < employees.length; i++) {
    var employeeElement = createEmployeeElement(employees[i]);
    agendaElement.appendChild(employeeElement);
  }
  hideSpinner();
}

function getEmployees() {
  // We GET employees from API

  fetch(employeesAPI).then(deserializeResponse).then(listEmployees);
}

function postEmployee(employeeData) {
  // post the employee to API and show employee on page

  fetch(employeesAPI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData),
  })
    .then((response) => response.json())
    .then((employee) => {
      console.log(employee);
      employeeElement = createEmployeeElement(employee);
      var agendaElement = document.querySelector(".agenda");
      agendaElement.appendChild(employeeElement);
    });
}

function deleteEmployee(id) {
  console.log(`${employeesAPI}/${id}`);
  fetch(`${employeesAPI}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}

function addEmployee(e) {
  // prevent default action for submit
  e.preventDefault();
  // get name from input:
  var inputName = document.querySelector("#name").value;
  // console.log(inputName);
  // get age from input
  var inputAge = document.querySelector("#age").value;
  // get salary from input
  var inputSalary = document.querySelector("#salary").value;
  // create employee object
  // var id = document.querySelectorAll('.employee').length + 1;
  // console.log(id);
  var employee = {
    name: inputName,
    age: inputAge,
    salary: inputSalary,
    // id:id
  };
  console.dir(employee);
  // POST employeesAPI employee
  postEmployee(employee);
}

function removeEmployee(event) {
  // take event.target // remove button
  var buttonElement = event.target;
  console.log(buttonElement);
  // get remove button parent .parent()
  employeeElement = buttonElement.parentElement;
  console.log(employeeElement);
  // var id = dataset.id from parent https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
  var idEmployee = employeeElement.dataset.id;
  console.log(idEmployee);
  // remove parent .remove()
  employeeElement.remove();
  // DELETE `employeeAPI/${id}`
  deleteEmployee(idEmployee);
}
// show Spinner
function showSpinner() {
  spinner.className = "show";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 3000);
}

//hide Spinner
function hideSpinner() {
  spinner.className = spinner.className.replace("show", "");
}

// serch by Employee id
function search() {
  var searchId = document.querySelector(".search input").value;
  console.log(searchId);
  var employeeElements = document.querySelectorAll(".agenda li");
  console.dir(employeeElements);

  for (i = 0; i < employeeElements.length; i++) {
    var id = employeeElements[i].getAttribute("data-id");
    console.log(id);
    if (searchId === id) {
      employeeElements[i].style.display = "block";
    } else {
      employeeElements[i].style.display = "none";
    }
  }
}

// When the page is finished loading this function is called
function onDOMLoad() {
  var spinner = document.getElementById("spinner");
  showSpinner();
  // we call getEmployees function
  getEmployees();

  var addEmployeeElement = document.querySelector(".add-employee");
  // console.log(addEmployeeElement);
  addEmployeeElement.addEventListener("click", addEmployee);

  var searchButtonElement = document.querySelector(".search button");
  // console.log(searchButtonElement);
  searchButtonElement.addEventListener("click", search);
}

// DOMContentLoaded is triggered when DOM load is complete
// On page load fetch employess from API
document.addEventListener("DOMContentLoaded", onDOMLoad);
