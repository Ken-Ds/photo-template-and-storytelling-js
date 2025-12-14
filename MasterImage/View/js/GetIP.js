async function fetchUserIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    const userIP = data.ip;
    console.log("Your Public IP Address:", userIP);
    
    // You can return the IP address to be used elsewhere in your application
    return userIP;
  } catch (error) {
    console.error("Could not fetch IP address:", error);
    // Return null or throw the error if the IP is critical for your logic
    return null; 
  }
}

// Example usage:
fetchUserIP().then(ip => {
  if (ip) {
    // You can now display the IP in your HTML or use it for other logic
    document.getElementById('ip-display').textContent = `Client IP: ${ip}`;
  } else {
    document.getElementById('ip-display').textContent = 'Unable to retrieve IP address.';
  }
});