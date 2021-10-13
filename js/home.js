window.addEventListener("DOMContentLoaded", (event) => {
  createInnerHtml();
});

const createInnerHtml = () => {
  const headerHtml = `<tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Actions</th>
  </tr>`;
  let empPayrollData = createEmployeePayrollJSON()[0];
  const innerHtml = `${headerHtml}
          <tr>
            <td>
              <img
                class="profile"
                alt=""
                src="${empPayrollData._profilePic}"
              />
            </td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>
              <div class="dept-label">${empPayrollData._department[0]}</div>
              <div class="dept-label">${empPayrollData._department[1]}</div>
            </td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
              <img
                name="1"
                onclick="remove(this)"
                alt="delete"
                src="../assets/icons/delete-black-18dp.svg"
              />
              <img
                id="1"
                alt="edit"
                onclick="update(this)"
                src="../assets/icons/create-black-18dp.svg"
              />
            </td>
          </tr>
    `;
  document.querySelector("#table-display").innerHTML = innerHtml;
};

const createEmployeePayrollJSON = () => {
  let employeePayrollListLocal = [
    {
      _name: "Narayan Mahadevan",
      _gender: "Male",
      _department: ["Finance", "Engineering"],
      _salary: "5000000",
      _startDate: "29 Oct, 2020",
      _note: "",
      _id: new Date().getTime(),
      _profilePic: "../assets/profile-images/Ellipse -2.png",
    },
    {
      _name: "ABC",
      _gender: "Female",
      _department: ["Sales", "Engineering"],
      _salary: "750000",
      _startDate: "17 Dec 2019",
      _note: "",
      _id: new Date().getTime() + 1,
      _picture: "../assets/profile-images/Ellipse -7.png",
    },
  ];

  return employeePayrollListLocal;
};

const getDeptHtml = (departmentList) => {
  let deptHtml = "";
  for (const dept of departmentList) {
    deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`;
  }
  return deptHtml;
};
