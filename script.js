window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Countdown Timer
const countdownDate = new Date("May 20, 2025 09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
    }
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// Form Submission
// Form Submission with Loading Indicator
document.getElementById('event-registration').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    const country = document.getElementById('country').value;
    const sector = document.getElementById('sector').value;
    console.log({ full_name:name, email, phone, organization:company, sector, country });
    
    // Show loading indicator
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading-spinner"></span> Processing...';
    
    
    try {
        // Make API call
        const res = await fetch('https://arm.yamltech.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ full_name:name, email, phone, organization:company, sector, country })
        });
        
        const data = await res.json();
        console.log(res, data);
        
        // Show success message
        alert(data?.message);
        
        // Reset form
        this.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert(data?.message);
    } finally {
        // Hide loading indicator and restore button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Add this code to your existing script.js file

// Function to fetch countries and populate dropdown
async function populateCountryDropdown() {
    const countryDropdown = document.getElementById('country');
    
    // Show loading state
    countryDropdown.innerHTML = '<option value="">Loading countries...</option>';
    
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        
        // Sort countries alphabetically by name
        countries.sort((a, b) => {
            const nameA = a.name.common.toUpperCase();
            const nameB = b.name.common.toUpperCase();
            return nameA.localeCompare(nameB);
        });
        
        // Create default option
        let options = '<option value="">Select Your Country</option>';
        
        // Add all countries to dropdown
        countries.forEach(country => {
            options += `<option value="${country.name.common}">${country.name.common}</option>`;
        });
        
        // Update dropdown
        countryDropdown.innerHTML = options;
    } catch (error) {
        console.error('Error fetching countries:', error);
        countryDropdown.innerHTML = '<option value="">Error loading countries</option>';
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    populateCountryDropdown();
    
    // The rest of your existing DOMContentLoaded code can remain here
});