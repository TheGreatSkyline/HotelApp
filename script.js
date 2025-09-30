const bookingForm = document.getElementById('booking-form');
const confirmationMessage = document.getElementById('confirmation-message');
const accessCodeElement = document.getElementById('access-code');

bookingForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form from actually submitting

  // Collect form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const checkinDate = document.getElementById('checkin').value;
  const checkoutDate = document.getElementById('checkout').value;

  // Generate a unique access code (simple random string for now)
  const accessCode = generateAccessCode();

  // Display confirmation message with access code
  confirmationMessage.style.display = 'block';
  accessCodeElement.textContent = accessCode;

  // Optionally, you can send this data to a backend system to store bookings
  console.log('Booking Details:', { name, email, checkinDate, checkoutDate, accessCode });

  // You could also send the access code via email here if you have backend integration.
});

// Function to generate a unique access code
function generateAccessCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let accessCode = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    accessCode += characters.charAt(randomIndex);
  }
  return accessCode;
}
localStorage.setItem('userAccessCode', accessCode);
// Function to handle the reservation form submission
async function submitReservation(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone_number = document.getElementById('phone_number').value;
  const checkin_date = document.getElementById('checkin').value;
  const checkout_date = document.getElementById('checkout').value;
  const room_type = 'Deluxe Room'; // For example

  try {
    const response = await fetch('http://localhost:3000/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone_number,
        checkin_date,
        checkout_date,
        room_type,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      alert(`Reservation successful! Your access code is: ${data.accessCode}`);
    } else {
      alert('Error making reservation: ' + data.message);
    }
  } catch (err) {
    console.error(err);
    alert('Failed to make reservation');
  }
}
