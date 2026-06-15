export const userFields = ['fullName', 'email', 'password', 'confirmPassword', 'role', 'phone'];
export const nameField = /^[A-Za-z ]*$/;
export const emailField = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordField = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
export const phoneField = /^[6-9]\d{9}$/;