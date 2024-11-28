// Array to store bookings
let bookings = [];

// Elements
const addBookingBtn = document.getElementById("addBookingBtn");
const editBookingBtn = document.getElementById("editBookingBtn");
const deleteBookingBtn = document.getElementById("deleteBookingBtn");
const bookingsTable = document.getElementById("bookings-list");
const bookingForm = document.getElementById("bookingForm");
const formTitle = document.getElementById("formTitle");

// Form fields
const nameInput = document.getElementById("name");
const contactInput = document.getElementById("contact");
const locationInput = document.getElementById("location");
const checkinInput = document.getElementById("checkin");
const checkoutInput = document.getElementById("checkout");

let editingIndex = null; // Track which booking is being edited

// Function to render bookings in the table
function renderBookings() {
  bookingsTable.innerHTML = ""; // Clear existing rows
  bookings.forEach((booking, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${booking.name}</td>
      <td>${booking.contact}</td>
      <td>${booking.location}</td>
      <td>${booking.checkin}</td>
      <td>${booking.checkout}</td>
    `;
    row.onclick = () => selectBooking(index); // Select booking for editing/deletion
    bookingsTable.appendChild(row);
  });
}

// Function to handle adding or editing a booking
function saveBooking(event) {
  event.preventDefault();
  const booking = {
    name: nameInput.value,
    contact: contactInput.value,
    location: locationInput.value,
    checkin: checkinInput.value,
    checkout: checkoutInput.value,
  };

  if (editingIndex !== null) {
    // Update existing booking
    bookings[editingIndex] = booking;
    editingIndex = null; // Reset editing state
    formTitle.textContent = "Add Booking";
  } else {
    // Add new booking
    bookings.push(booking);
  }

  bookingForm.reset(); // Clear form
  bookingForm.style.display = "none"; // Hide form
  renderBookings(); // Update table
}

// Function to handle selecting a booking for editing or deletion
function selectBooking(index) {
  editingIndex = index;
  const booking = bookings[index];
  nameInput.value = booking.name;
  contactInput.value = booking.contact;
  locationInput.value = booking.location;
  checkinInput.value = booking.checkin;
  checkoutInput.value = booking.checkout;
  bookingForm.style.display = "block"; // Show form
  formTitle.textContent = "Edit Booking";
}

// Function to delete selected booking
function deleteBooking() {
  if (editingIndex !== null) {
    bookings.splice(editingIndex, 1); // Remove selected booking
    editingIndex = null; // Reset editing state
    bookingForm.reset(); // Clear form
    bookingForm.style.display = "none"; // Hide form
    renderBookings(); // Update table
  } else {
    alert("Please select a booking to delete.");
  }
}

// Event listeners
addBookingBtn.addEventListener("click", () => {
  editingIndex = null; // Clear editing state
  bookingForm.reset(); // Clear form
  bookingForm.style.display = "block"; // Show form
  formTitle.textContent = "Add Booking";
});

editBookingBtn.addEventListener("click", () => {
  if (editingIndex === null) {
    alert("Please select a booking to edit.");
  }
});

deleteBookingBtn.addEventListener("click", deleteBooking);
bookingForm.addEventListener("submit", saveBooking);

// Initial render
renderBookings();