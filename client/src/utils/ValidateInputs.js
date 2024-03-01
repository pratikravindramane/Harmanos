export const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!values.name) {
    errors.name = "name is required!";
  }
  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }
  if (!values.phone) {
    errors.phone = "phone is required";
  } else if (values.phone.length < 4) {
    errors.phone = "phone must be more than 4 characters";
  } else if (values.phone.length > 10) {
    errors.phone = "phone cannot exceed more than 10 characters";
  }
  return errors;
};
export const loginValidate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }
  return errors;
};

export const courseValidate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "name is required!";
  }
  if (!values.level) {
    errors.level = "Level is required";
  } else if (values.level.length < 1) {
    errors.level = "Level must be more than 0 characters";
  } else if (values.level.length > 4) {
    errors.password = "Level cannot exceed more than 4 characters";
  }
  if (!values.description) {
    errors.description = "description is required!";
  }

  return errors;
};

export const lectureValidation = (values) => {
  let errors = {};
  if (!values.date) {
    errors.date = "date is required!";
  }
  if (values.instructor === "0") {
    errors.instructor = "instructor is required!";
  }
  return errors;
};
