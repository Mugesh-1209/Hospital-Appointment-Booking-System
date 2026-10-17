const doctors = [
  {
    id: 1,
    name: " 🧑‍⚕️Dr. Dr. Prathap C. Reddy 🩺",
    speciality: "Cardiologist",
    experience: "25 years",
    fee: 700,
    image: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTYORKXOc2561u2_8qFp2HC4S_oPHPsh8lRowihjB0r3f8LbtqizLigsinutqnuGIIkcdYK8Jvs4J0zick",
    description: "Specialist in heart health and cardiovascular care."
  },
  {
    id: 2,
    name: " 🧑‍⚕️Dr. S. S. Badrinath 🩺",
    speciality: "Ophthalmology",
    experience: "20 years",
    fee: 500,
    image: "https://www.bmfawards.org/img/guest4.jpg",
    description: "Specialist in eye health and vision care."
  },
  {
    id: 3,
    name: "🧑‍⚕️ Dr. T.V. Rajagopal 🩺",
    speciality: "Pulmonologist",
    experience: "15 years",
    fee: 800,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFYcWsw8_BKCpvZ0HZiZlp1fzpUI60oepu_fyrMkZ5JcEqHdbxq01ESw&s=10",
    description: "Specialist in lung and respiratory health."
  },
  {
    id: 4,
    name: "🧑‍⚕️ Dr. K. Sri Hari Prashanth 🩺",
    speciality: "urologist and andrologist ",
    experience: "12 years",
    fee: 450,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE6nsPDqE9qU9KsF3G9i7oNuLmkae8TR2gV4VBSe5aYg&s=10",
    description: "Specialist in urinary tract and male reproductive health."
  },
  {
    id: 5,
    name: "🧑‍⚕️ Dr. N.S. Vimalathithan 🩺",
    speciality: "oncologist",
    experience: "12 years",
    fee: 650,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUt_y36ef4rBDuwoT1YxNERl7014UNEVfc2KoWt_jvBA&s=10",
    description: "Specialist in cancer diagnosis and treatment."
  },
  {
    id: 6,
    name: "🧑‍⚕️ Dr. Anmika N. 🩺",
    speciality: "dermatologist and cosmetologist",
    experience: "7 years",
    fee: 600,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKn3X1Jit6Y-LL9q0vY_aZYkRcwp0g9fOtCFLhrHmSKA&s=10",
    description: "Specialist in skin health, skincare, and cosmetic treatments."
  },
  {
    id: 7,
    name: "🧑‍⚕️ Dr. Prakash Kumar 🩺",
    speciality: " Orthopedic surgeo ",
    experience: "9 years",
    fee: 400,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS44gY0YkHjF5dFKZkvdL_y3PkPIl5GrzAvPPyLDsHRnQ&s=10",
    description: "Specialist in bone, joint, and musculoskeletal health."
  },
  {
    id: 8,
    name: "🧑‍⚕️ Dr. Padma Priya 🩺",
    speciality: "Gastroenterologist",
    experience: "4 years",
    fee: 350,
    image: "https://irp.cdn-website.com/69c0b277/dms3rep/multi/opt/Dr.+Padma+Reddy+-+Best+Female+Gastroenterologist-+Hepatologist-+EUS+Specialist+in+Hyderabad+India-640w.jpg",
    description: "Specialist in digestive system and gut health."
  },
  {
    id: 9,
    name: "🧑‍⚕️ Dr. N.Sathian 🩺",
    speciality: "Ophthalmologist",
    experience: "14 years",
    fee: 550,
    image: "https://threebestrated.in/images/DrSathianNagamalaiMBBSMSEYETRUSTHOSPITAL-Coimbatore-TN.jpeg",
    description: "Specialist in eye health and vision care."
  }
];

const STORAGE_KEY = "careplus_appointments";

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM"
];

const doctorList = document.getElementById("doctorList");
const doctorSearch = document.getElementById("doctorSearch");
const specialityFilter = document.getElementById("specialityFilter");
const doctorSelect = document.getElementById("doctorSelect");
const appointmentDate = document.getElementById("appointmentDate");
const appointmentTime = document.getElementById("appointmentTime");
const appointmentForm = document.getElementById("appointmentForm");
const appointmentList = document.getElementById("appointmentList");
const consultationFee = document.getElementById("consultationFee");
const toast = document.getElementById("toast");

let toastTimer;

// Escape user-provided values before inserting HTML.
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

// Use local date instead of UTC to avoid date differences.
function getLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Read saved appointments safely.
function getAppointments() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter(item =>
      item &&
      typeof item === "object" &&
      Number.isFinite(item.id) &&
      Number.isFinite(item.doctorId) &&
      typeof item.date === "string" &&
      typeof item.time === "string"
    ) : [];
  } catch {
    return [];
  }
}

// Save appointments to browser storage.
function saveAppointments(appointments) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    return true;
  } catch {
    showToast("Unable to save. Please check browser storage.");
    return false;
  }
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Populate the speciality filter and doctor selector.
function initializeFilters() {
  const specialities = [...new Set(
    doctors.map(doctor => doctor.speciality)
  )];

  specialities.forEach(speciality => {
    const option = document.createElement("option");
    option.value = speciality;
    option.textContent = speciality;
    specialityFilter.appendChild(option);
  });

  doctors.forEach(doctor => {
    const option = document.createElement("option");
    option.value = doctor.id;
    option.textContent = `${doctor.name} - ${doctor.speciality}`;
    doctorSelect.appendChild(option);
  });
}

// Display doctor cards.
function renderDoctors() {
  const searchText = doctorSearch.value.trim().toLowerCase();
  const selectedSpeciality = specialityFilter.value;

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchText) ||
      doctor.speciality.toLowerCase().includes(searchText);

    const matchesSpeciality =
      selectedSpeciality === "All" ||
      doctor.speciality === selectedSpeciality;

    return matchesSearch && matchesSpeciality;
  });

  if (filteredDoctors.length === 0) {
    doctorList.innerHTML = `
      <div class="empty-state">
        No doctors found. Try another search.
      </div>
    `;
    return;
  }

  doctorList.innerHTML = filteredDoctors.map(doctor => `
    <article class="doctor-card">
      <img
        src="${escapeHTML(doctor.image)}"
        alt="${escapeHTML(doctor.name)}"
        loading="lazy"
        onerror="this.style.display='none'"
      >

      <div class="doctor-details">
        <h3>${escapeHTML(doctor.name)}</h3>

        <span class="speciality">
          ${escapeHTML(doctor.speciality)}
        </span>

        <p class="doctor-description">
          ${escapeHTML(doctor.description)}
        </p>

        <div class="doctor-meta">
          <span>Experience: ${escapeHTML(doctor.experience)}</span>
          <strong>₹${doctor.fee}</strong>
        </div>

        <button
          class="book-btn"
          type="button"
          data-doctor-id="${doctor.id}"
        >
          Book Appointment
        </button>
      </div>
    </article>
  `).join("");
}

// Select a doctor from a card and move to the booking form.
doctorList.addEventListener("click", event => {
  const button = event.target.closest("[data-doctor-id]");
  if (!button) return;

  doctorSelect.value = button.dataset.doctorId;
  updateConsultationFee();
  updateTimeSlots();

  document.getElementById("booking").scrollIntoView({
    behavior: "smooth"
  });
});

// Update consultation fee when the doctor changes.
function updateConsultationFee() {
  const doctor = doctors.find(
    item => item.id === Number(doctorSelect.value)
  );

  consultationFee.textContent = doctor
    ? `₹${doctor.fee}`
    : "Select a doctor";
}

// Check whether a time slot is in the past.
function isPastTime(date, time) {
  const [clock, period] = time.split(" ");
  let [hours, minutes] = clock.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const selectedDateTime = new Date(
    `${date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`
  );

  return selectedDateTime <= new Date();
}

// Update available slots for the selected doctor and date.
function updateTimeSlots() {
  const doctorId = Number(doctorSelect.value);
  const date = appointmentDate.value;
  const previousTime = appointmentTime.value;

  appointmentTime.innerHTML =
    '<option value="">Select time</option>';

  if (!doctorId || !date || date < getLocalDate()) {
    return;
  }

  const appointments = getAppointments();

  const availableSlots = timeSlots.filter(time => {
    const alreadyBooked = appointments.some(appointment =>
      appointment.doctorId === doctorId &&
      appointment.date === date &&
      appointment.time === time
    );

    const inPast = date === getLocalDate() && isPastTime(date, time);

    return !alreadyBooked && !inPast;
  });

  availableSlots.forEach(time => {
    const option = document.createElement("option");
    option.value = time;
    option.textContent = time;
    appointmentTime.appendChild(option);
  });

  if (availableSlots.includes(previousTime)) {
    appointmentTime.value = previousTime;
  }

  if (availableSlots.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No slots available";
    option.disabled = true;
    appointmentTime.appendChild(option);
  }
}

// Check whether a booking is upcoming.
function isUpcoming(appointment) {
  const [clock, period] = appointment.time.split(" ");
  let [hours, minutes] = clock.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const dateTime = new Date(
    `${appointment.date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`
  );

  return dateTime >= new Date();
}

// Display all saved appointments.
function renderAppointments() {
  const appointments = getAppointments();

  document.getElementById("totalBookings").textContent =
    appointments.length;

  document.getElementById("upcomingBookings").textContent =
    appointments.filter(isUpcoming).length;

  if (appointments.length === 0) {
    appointmentList.innerHTML = `
      <div class="empty-state">
        <h3>No appointments yet</h3>
        <p>Book your first appointment with one of our doctors.</p>
      </div>
    `;
    return;
  }

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = `${a.date} ${a.time}`;
    const dateB = `${b.date} ${b.time}`;
    return dateA.localeCompare(dateB);
  });

  appointmentList.innerHTML = sortedAppointments.map(appointment => {
    const doctor = doctors.find(
      item => item.id === appointment.doctorId
    );

    const doctorName = doctor ? doctor.name : "Doctor unavailable";
    const speciality = doctor ? doctor.speciality : "";
    const fee = doctor ? doctor.fee : 0;
    const formattedDate = new Date(
      `${appointment.date}T12:00:00`
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const status = isUpcoming(appointment) ? "Upcoming" : "Completed / Past";

    return `
      <article class="appointment-card">
        <h3>${escapeHTML(appointment.patientName)}</h3>
        <span class="status">${status}</span>

        <p><strong>Doctor:</strong> ${escapeHTML(doctorName)}</p>
        <p><strong>Speciality:</strong> ${escapeHTML(speciality)}</p>
        <p><strong>Date:</strong> ${escapeHTML(formattedDate)}</p>
        <p><strong>Time:</strong> ${escapeHTML(appointment.time)}</p>
        <p><strong>Phone:</strong> ${escapeHTML(appointment.phone)}</p>
        <p><strong>Fee:</strong> ₹${fee}</p>
        <p><strong>Reason:</strong> ${escapeHTML(appointment.reason || "Not specified")}</p>

        <button
          type="button"
          class="cancel-btn"
          data-cancel-id="${appointment.id}"
        >
          Cancel Appointment
        </button>
      </article>
    `;
  }).join("");
}

// Book an appointment.
appointmentForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!appointmentForm.reportValidity()) return;

  const patientName = document.getElementById("patientName").value.trim();
  const age = Number(document.getElementById("patientAge").value);
  const gender = document.getElementById("patientGender").value;
  const phone = document.getElementById("patientPhone").value.trim();
  const doctorId = Number(doctorSelect.value);
  const date = appointmentDate.value;
  const time = appointmentTime.value;
  const reason = document.getElementById("reason").value.trim();

  const doctor = doctors.find(item => item.id === doctorId);

  if (!doctor) {
    showToast("Please select a valid doctor.");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    showToast("Enter a valid 10-digit Indian mobile number.");
    return;
  }

  if (age < 1 || age > 120) {
    showToast("Please enter a valid age.");
    return;
  }

  if (!date || date < getLocalDate()) {
    showToast("Please select today or a future date.");
    return;
  }

  if (!time || !timeSlots.includes(time)) {
    showToast("Please select an available time slot.");
    return;
  }

  if (date === getLocalDate() && isPastTime(date, time)) {
    showToast("That time has already passed.");
    updateTimeSlots();
    return;
  }

  const appointments = getAppointments();

  const duplicate = appointments.some(appointment =>
    appointment.doctorId === doctorId &&
    appointment.date === date &&
    appointment.time === time
  );

  if (duplicate) {
    showToast("This slot is already booked. Choose another time.");
    updateTimeSlots();
    return;
  }

  const newAppointment = {
    id: Date.now(),
    patientName,
    age,
    gender,
    phone,
    doctorId,
    date,
    time,
    reason,
    fee: doctor.fee,
    createdAt: new Date().toISOString()
  };

  appointments.push(newAppointment);

  if (!saveAppointments(appointments)) return;

  appointmentForm.reset();
  appointmentDate.min = getLocalDate();
  appointmentDate.value = "";
  appointmentTime.innerHTML =
    '<option value="">Select time</option>';
  consultationFee.textContent = "Select a doctor";

  renderAppointments();
  showToast("Appointment booked successfully!");

  document.getElementById("my-appointments").scrollIntoView({
    behavior: "smooth"
  });
});

// Cancel a booking after confirmation.
appointmentList.addEventListener("click", event => {
  const button = event.target.closest("[data-cancel-id]");
  if (!button) return;

  const appointmentId = Number(button.dataset.cancelId);
  const appointments = getAppointments();

  const appointment = appointments.find(
    item => item.id === appointmentId
  );

  if (!appointment) return;

  if (!confirm(`Cancel the appointment for ${appointment.patientName}?`)) {
    return;
  }

  const updatedAppointments = appointments.filter(
    item => item.id !== appointmentId
  );

  if (!saveAppointments(updatedAppointments)) return;

  renderAppointments();
  updateTimeSlots();
  showToast("Appointment cancelled.");
});

// Event listeners.
doctorSearch.addEventListener("input", renderDoctors);
specialityFilter.addEventListener("change", renderDoctors);
doctorSelect.addEventListener("change", () => {
  updateConsultationFee();
  updateTimeSlots();
});
appointmentDate.addEventListener("change", updateTimeSlots);

// Initialize the application.
function initializeApp() {
  appointmentDate.min = getLocalDate();
  document.getElementById("currentYear").textContent =
    new Date().getFullYear();

  initializeFilters();
  renderDoctors();
  renderAppointments();
  updateTimeSlots();
}

initializeApp();