const students = [];

document.getElementById("addStudentBtn").onclick = function () {
  const name = document.getElementById("studentName").value.trim();
  const marks = parseInt(document.getElementById("studentMarks").value);

  if (!name || isNaN(marks)) {
    alert("Please enter valid student name and marks.");
    return;
  }

  const student = { name, marks };
  students.push(student);
  displayStudents();
  calculateAverage();
};

function displayStudents() {
  const list = document.getElementById("studentList");
  list.innerHTML = "";

  students.forEach((student, index) => {
    const li = document.createElement("li");
    li.textContent = `${student.name} - ${student.marks}`;

    if (student.marks < 40) {
      li.style.color = "red";
    }

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = function () {
      students.splice(index, 1);
      displayStudents();
      calculateAverage();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function calculateAverage() {
  if (students.length === 0) {
    document.getElementById("averageMarks").textContent = "Average: 0";
    return;
  }

  const total = students.reduce((sum, s) => sum + s.marks, 0);
  const avg = total / students.length;
  document.getElementById("averageMarks").textContent = `Average: ${avg.toFixed(2)}`;
}
