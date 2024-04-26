import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Filter = () => {
  const [paymentStatus, setPaymentStatus] = React.useState('');

  const handleChange = (event) => {
    setPaymentStatus(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width:250 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Payment Status</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={paymentStatus}
          onChange={handleChange}
          autoWidth
          label="PaymentStatus"
        >
          <MenuItem value={'paid'}>Paid</MenuItem>
          <MenuItem value={'unpaid'}>Unpaid</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
export default Filter;