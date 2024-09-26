document.getElementById('accommodationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const price = document.getElementById('price').value;

    const response = await fetch('/api/accommodations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, location, price })
    });

    const data = await response.json();
    displayAccommodation(data);

    document.getElementById('accommodationForm').reset();
});

async function fetchAccommodations() {
    const response = await fetch('/api/accommodations');
    const accommodations = await response.json();
    accommodations.forEach(displayAccommodation);
}

function displayAccommodation(accommodation) {
    const accommodationList = document.getElementById('accommodationList');
    const listItem = document.createElement('li');
    listItem.textContent = `${accommodation.name} - ${accommodation.location} - $${accommodation.price}`;
    accommodationList.appendChild(listItem);
}

// Fetch accommodations on page load
fetchAccommodations();

