export const validateForm = (data) => {
  const errors = { };

  // Name validation
  if (!data.name) {
    errors.name = "Name is required.";
  } else if (data.name.length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }

  // Email validation
  if (!data.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email address is invalid.";
  }

  // Phone validation
  if (!data.phone) {
    errors.phone = "Phone number is required.";
  } else if (!/^\d{10}$/.test(data.phone)) {
    // assuming a 10-digit phone number
    errors.phone = "Phone number must be a valid 10-digit number.";
  }

  // Username validation (auto-filled and non-editable)
  if (!data.username) {
    errors.username = "Username is required.";
  } else if (data.username.length < 3) {
    errors.username = "Username must be at least 3 characters.";
  }

  // Address validations
  if (!data.address) {
    errors.address = "Address is required.";
  } else {
    if (!data.address.street) {
      errors.street = "Street is required.";
    }
    if (!data.address.city) {
      errors.city = "City is required.";
    }
  }

  // Company name validation (optional)
  if (data.company && data.company.name && data.company.name.length < 3) {
    errors.company = "Company name must be at least 3 characters.";
  }  // Website validation (optional)
  if (data.website && !/^https?:\/\/.+/.test(data.website)) {
    errors.website = "Website must start with http:// or https://.";
  }


  

  return errors;
};
