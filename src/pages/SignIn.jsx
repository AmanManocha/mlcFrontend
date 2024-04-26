// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   Link,
//   FormControl,
//   Box,
//   Alert,
// } from '@mui/material';
// import validate from 'validate.js';

// import microLendingCompany from '../assets/micro-lending-company.jpg';
// import '../css/SignIn.css';
// // import API from '../axiosApi';

// const loginSchema = {
//   username: {
//     presence: { allowEmpty: false, message: 'is required' },
//     length: {
//       maximum: 300,
//     },
//   },
//   password: {
//     presence: { allowEmpty: false, message: 'is required' },
//   },
// };

// const SignIn = () => {
//   const navigate = useNavigate();

//   const [error, setError] = useState('');
//   const [showPass] = useState(false);
//   const [formState, setFormState] = useState({
//     isValid: false,
//     values: {},
//     errors: {},
//   });

//   const handleFieldChange = (event) => {
//     event.persist();
//     setFormState((formState) => ({
//       ...formState,
//       values: {
//         ...formState.values,
//         [event.target.name]:
//           event.target.type === 'checkbox' ? event.target.checked : event.target.value,
//       },
//     }));
//   };

//   const handleSignIn = async () => {
//     const errors = validate(formState.values, loginSchema);
//     setFormState((formState) => ({
//       ...formState,
//       isValid: errors ? false : true,
//       errors: errors || {},
//     }));
//     if (errors) return false;

//     try {
//       // Make API call to sign in
//       const response = await API.post('signIn', formState.values);
//       // Check if sign-in was successful
//       if (response.status === 200) {
//         console.log('response', response);
//         // Sign in successful, navigate to the dashboard
//         localStorage.setItem('accessToken', response.data.token);
//         localStorage.setItem('username', response.data.username);
//         navigate('/dashboard');
//       } else {
//         // error response from api
//         console.error('Sign in failed with status:', response.status);
//         setError('Sign in failed. Please try again later.');
//       }
//     } catch (error) {
//       console.error('Error during sign in:', error);
//       const message = error.response.data.message || 'Sign in failed. Please try again later.';
//       setError(message);
//     }
//   };

//   return (
//     <div className="background-image" >
//       <Container>
//         <Box className="container">
//           <Grid container justifyContent="center">
//             <Grid item xs={12} lg={10}>
//               <Card className="card">
//                 <Grid container>
//                   <Grid item xs={12} lg={6}>
//                     <CardContent className="cardContentSignIn">
//                       <Box>


//                         <FormControl className="form" sx={{ pt: 2 }}>
//                           <Typography sx={{ textAlign: 'left', pb: 1 }}>Username</Typography>
//                           {/* <TextField className="username" id="usernameInput"  placeholder="Enter your username" fullWidth required /> */}
//                           <TextField
//                             name="username"
//                             className="username"
//                             id="usernameInput"
//                             placeholder="Enter your username"
//                             fullWidth
//                             required
//                             onChange={handleFieldChange}
//                             value={formState?.values?.username || ''}
//                             variant="outlined"
//                             autoFocus
//                             autoComplete="username"
//                             helperText={formState?.errors?.username?.length ? formState?.errors?.username[0] : null}
//                             error={Boolean(formState?.errors?.username)}
//                           />
//                           <Typography sx={{ textAlign: 'left', pb: 1, marginTop: '10px' }}>Password</Typography>
//                           {/* <TextField className="password" id="passwordInput" type="password" placeholder="Enter your password" fullWidth required /> */}
//                           <TextField
//                             name="password"
//                             className="password"
//                             id="passwordInput"
//                             placeholder="Enter your password"
//                             fullWidth
//                             required
//                             value={formState?.values?.password || ''}
//                             onChange={handleFieldChange}
//                             variant="outlined"
//                             autoComplete="current-password"
//                             type={showPass ? 'text' : 'password'}
//                             helperText={formState?.errors?.password?.length ? formState?.errors?.password[0] : null}
//                             error={Boolean(formState?.errors?.password)}
//                           />
        
//                           {error ? <Alert sx={{ mb: 2 }} severity="error">{error}</Alert> : null}
//                           <Button style={{ backgroundColor: 'white', color: '#000' }} onClick={handleSignIn} fullWidth>
//                             Sign In
//                           </Button>
//                         </FormControl>

//                       </Box>
//                     </CardContent>
//                   </Grid>
//                 </Grid>
//               </Card>
//             </Grid>
//           </Grid>
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default SignIn;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
} from '@mui/material';
import validate from 'validate.js';

import microLendingCompany from '../assets/micro-lending-company.jpg';
import '../css/SignIn.css';
import API from '../../axiosApi';

const loginSchema = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
  },
};

const SignIn = () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    errors: {},
  });

  const handleFieldChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      },
    }));
  };

  const handleSignIn = async () => {
    const errors = validate(formState.values, loginSchema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
    if (errors) return false;

    try {
      // Make API call to sign in
      const response = await API.post('signIn', formState.values);
      // Check if sign-in was successful
      if (response.status === 200) {
        console.log('response', response);
        // Sign in successful, navigate to the dashboard
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('username', response.data.username);
        navigate('/invoices');
      } else {
        // error response from api
        console.error('Sign in failed with status:', response.status);
        setError('Sign in failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      const message = error.response.data.message || 'Sign in failed. Please try again later.';
      setError(message);
    }
  };

  return (
    <div className="background-image">
      <Container maxWidth="sm">
        <Card className="container">
          <CardContent className="cardContentSignIn">
            <Typography variant="h5" align="center" gutterBottom>
              Sign In
            </Typography>
            <form className="form">
              <TextField
                name="username"
                label="Username"
                fullWidth
                required
                value={formState.values.username || ''}
                onChange={handleFieldChange}
                variant="outlined"
                autoComplete="username"
                helperText={formState.errors.username?.length ? formState.errors.username[0] : null}
                error={Boolean(formState.errors.username)}
                margin="normal"
                className="username"
              />
              <TextField
                name="password"
                label="Password"
                fullWidth
                required
                value={formState.values.password || ''}
                onChange={handleFieldChange}
                variant="outlined"
                autoComplete="current-password"
                type="password"
                helperText={formState.errors.password?.length ? formState.errors.password[0] : null}
                error={Boolean(formState.errors.password)}
                margin="normal"
                className="password"
              />
              {error && <Alert severity="error">{error}</Alert>}
              <Button className='signIn' variant="contained" color="primary" onClick={handleSignIn}>
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default SignIn;
