import { Stack, TextField, Box, Typography, Button } from '@mui/material'
import { useState } from 'react'

function App() {

  const [userData, setUserData] = useState(
    {
      name: '',
      email: '',
      password: '',
      contact: '',
      city: ''
    }
  )

  const [error, setError] = useState(
    {
      name: false,
      email: false,
      password: false,
      contact: false,
      city: false
    }
  )

  const validateInputs=()=>{

    let isError={
      name: false,
      email: false,
      password: false,
      contact: false,
      city: false
    }


    const nameInput=/^[A-Za-z]+$/;
    const emailInput=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordInput=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    const contactInput=/^[6-9]\d{9}$/;

    if(userData.name.trim()==='' || !nameInput.test(userData.name)){
      isError.name=true
    }

    if(userData.email.trim()==='' || !emailInput.test(userData.email)){
      isError.email=true
    }

    if(userData.password.trim()==='' || !passwordInput.test(userData.password)){
      isError.password=true
    }

    if(userData.contact.trim()==='' || !contactInput.test(userData.contact)){
      isError.contact=true
    }

    setError(isError)

    return !Object.values(isError).includes(true)

   
  }



  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData(data => ({ ...data, [name]: value }))

  }

  const handleSubmitForm = (e) => {
    e.preventDefault()

    const isValidInput=validateInputs()

    if(isValidInput){

      alert("Form is submitted successfully.")

      console.log(userData);

        setUserData({
          name: '',
          email: '',
          password: '',
          contact: '',
          city: ''
        })
    }

  }

  return (
    <>
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Stack spacing={3} direction={'column'} sx={{ width: '35vw' }}>

          <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>User Form Data</Typography>

          <TextField
            id="name"
            name='name'
            type='text'
            label="Enter Your Name"
            value={userData.name}
            onChange={handleInput}
            required
            error={error.name}
            helperText={
              error.name ? 'Only letters and space allowed' : ''
            }

          />
          <TextField
            id="email"
            name='email'
            type='email'
            label="Enter Your Email"
            value={userData.email}
            onChange={handleInput}
            required
            error={error.email}
            helperText={
              error.email ? 'Please enter valid email' : ''
            }

          />
          <TextField
            id="password"
            name='password'
            type='password'
            label="Enter Your Password"
            value={userData.password}
            onChange={handleInput}
            required
            error={error.password}
            helperText={
              error.password ? 'Password must contain uppercase, lowercase, number and special character' : ''
            }

          />
          <TextField
            id="contact"
            name='contact'
            type='number'
            label="Enter Your Contact Number"
            value={userData.contact}
            onChange={handleInput}
            required
            error={error.contact}
            helperText={
              error.contact ? 'Enter valid 10 digits contact number' : ''
            }

          />
          <TextField
            id="city"
            name='city'
            type='text'
            label="Enter Your City"
            value={userData.city}
            onChange={handleInput}
            variant='outlined'
            color='info'
            required
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ padding: '10px', marginTop: '15px' }}
            onClick={handleSubmitForm}
          >Submit</Button>

        </Stack>
      </Box>
    </>
  )
}

export default App
