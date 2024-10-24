// Filter Villas
function filterVillas() {
    const villaType = document.getElementById('villa-type-filter').value;
    const priceRange = document.getElementById('price-range-filter').value;
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const villaCards = document.querySelectorAll('.villa-card');
    let hasResults = false;

    villaCards.forEach(card => {
        const type = card.getAttribute('data-type');
        const name = card.querySelector('h3').innerText.toLowerCase();
        const priceText = card.querySelector('p').innerText;
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ''));

        // Filter by type
        const typeMatch = villaType === 'all' || type === villaType;

        // Filter by price range
        let priceMatch;
        if (priceRange === 'all') {
            priceMatch = true;
        } else if (priceRange === 'low') {
            priceMatch = price <= 300;
        } else if (priceRange === 'mid') {
            priceMatch = price > 300 && price <= 600;
        } else if (priceRange === 'high') {
            priceMatch = price > 600;
        }

        // Filter by search query
        const searchMatch = name.includes(searchQuery);

        if (typeMatch && priceMatch && searchMatch) {
            card.style.display = 'block';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Show no results message
    document.getElementById('no-results-message').style.display = hasResults ? 'none' : 'block';
}

// Show Villa Details
function showVillaDetails(name, price, description) {
    alert(`Villa: ${name}\nPrice: ${price}\nDescription: ${description}`);
}

// Open Booking Modal
function openBookingModal(villaName, price, description) {
    document.getElementById('booking-title').innerText = villaName;
    document.getElementById('booking-price').innerText = price; // Add this line
    document.getElementById('booking-description').innerText = description; // Add this line
    document.getElementById('booking-modal').style.display = 'block';
}


// Close Booking Modal
function closeBookingModal() {
    document.getElementById('booking-modal').style.display = 'none';
}

// Open About Modal
function openAboutModal() {
    document.getElementById('about-modal').style.display = 'block';
}

// Close About Modal
function closeAboutModal() {
    document.getElementById('about-modal').style.display = 'none';
}

// Open Contact Modal
function openContactModal() {
    document.getElementById('contact-modal').style.display = 'block';
}

// Close Contact Modal
function closeContactModal() {
    document.getElementById('contact-modal').style.display = 'none';
}

// Open Sign In Modal
function openSignInModal() {
    document.getElementById('sign-in-modal').style.display = 'block';
}

// Close Sign In Modal
function closeSignInModal() {
    document.getElementById('sign-in-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modals = [
        document.getElementById('booking-modal'),
        document.getElementById('about-modal'),
        document.getElementById('contact-modal'),
        document.getElementById('sign-in-modal')
    ];
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Confirm booking function (you can modify as needed)
function confirmBooking() {
    alert("Booking confirmed!");
    closeBookingModal();
}
// Open Contact Modal
function openContactModal() {
    document.getElementById('contact-modal').style.display = 'block';
}

// Close Contact Modal
function closeContactModal() {
    document.getElementById('contact-modal').style.display = 'none';
}

function openBookingModal(villaName) {
    document.getElementById('booking-title').innerText = villaName;
    document.getElementById('booking-modal').style.display = 'block';
}

function closeBookingModal() {
    document.getElementById('booking-modal').style.display = 'none';
}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('booking-form').onsubmit = async function(event) {
        event.preventDefault();
        
        // Collect form data
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;  // Correctly gets the selected gender
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const email = document.getElementById('email').value;
        const villaName = document.getElementById('booking-title').innerText; // Updated ID
        const price = document.getElementById('booking-price').innerText; // Updated ID
        const description = document.getElementById('booking-description').innerText; // Updated ID

        // Create a booking object
        const bookingData = {
            name,
            age,
            gender,
            checkin,
            checkout,
            email,
            villaName,
            price,
            description
        };

        try {
            // Send a POST request to the backend
            const response = await fetch('http://localhost:5000/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            // Handle response from backend
            if (response.ok) {
                alert("Booking confirmed!");
                closeBookingModal();
            } else {
                alert("Error confirming booking. Please try again.");
            }
        } catch (err) {
            console.error("Error in booking: ", err);
            alert("An error occurred while confirming your booking.");
        }
    };
});







