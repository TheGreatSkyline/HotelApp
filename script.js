document.getElementById("booking-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;

  if (name && email && checkin && checkout) {
    alert("Booking successful! We will contact you soon.");
  } else {
    alert("Please fill in all fields.");
  }
});