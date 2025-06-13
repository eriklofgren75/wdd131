let participantCount = 1;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add");
  const form = document.getElementById("registration-form");
  const summary = document.getElementById("summary");

  addBtn.addEventListener("click", () => {
    participantCount++;
    const sectionHTML = participantTemplate(participantCount);
    addBtn.insertAdjacentHTML("beforebegin", sectionHTML);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const total = totalFees();
    const name = document.getElementById("adult_name").value;
    const message = successTemplate({
      name,
      count: participantCount,
      total
    });

    form.classList.add("hide");
    summary.classList.remove("hide");
    summary.innerHTML = message;
  });
});

function participantTemplate(count) {
  return `
    <section class="participant${count}">
      <p>Participant ${count}</p>
      <div class="item">
        <label for="fname${count}">First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname${count}" required />
      </div>
      <div class="item">
        <label for="activity${count}">Activity #<span>*</span></label>
        <input id="activity${count}" type="text" name="activity${count}" required />
      </div>
      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee${count}" required />
      </div>
      <div class="item">
        <label for="date${count}">Desired Date<span>*</span></label>
        <input id="date${count}" type="date" name="date${count}" required />
      </div>
      <div class="item">
        <label for="grade${count}">Grade</label>
        <select id="grade${count}" name="grade${count}">
          <option value="" disabled selected>Select grade</option>
          <option>1st</option><option>2nd</option><option>3rd</option>
          <option>4th</option><option>5th</option><option>6th</option>
          <option>7th</option><option>8th</option><option>9th</option>
          <option>10th</option><option>11th</option><option>12th</option>
        </select>
      </div>
    </section>
  `;
}

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];
  return feeElements.reduce((sum, el) => {
    const val = parseFloat(el.value);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
}

function successTemplate(info) {
  return `
    <h2>Thank you ${info.name} for registering!</h2>
    <p>You have registered ${info.count} participant(s) and owe $${info.total.toFixed(2)} in fees.</p>
  `;
}