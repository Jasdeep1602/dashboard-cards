/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import './App.css';
import Cards from './components/cards';
import { setFilteredData } from './redux/slices/cards';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { useEffect, useState } from 'react';

function App() {
  // global hooks
  const dispatch = useAppDispatch();
  const { FilteredData } = useAppSelector((state) => state.card);

  // Initialize as empty array where we store original array
  const [originalData, setOriginalData] = useState<any[]>([]);

  console.log(FilteredData, 'in store');
  console.log(originalData, 'original');

  // filters on companyname,location,minexperience,minpay and role is done and no data on tech stack available in response

  // company name input and filter

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().toLowerCase(); // Trim whitespace
    setInputValue(value);

    // Check if value exists
    if (value) {
      const companyName = FilteredData?.filter((data: any) =>
        data?.companyName.toLowerCase().includes(value)
      );
      dispatch(setFilteredData(companyName));
    } else {
      // If value is empty, dispatch the original array
      dispatch(setFilteredData(originalData));
    }
  };

  // min exp input and filter

  const [minExp, setMinExp] = useState<string>('');

  const handleExpChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setMinExp(value);

    // Check if value exists
    if (value) {
      const experience = FilteredData?.filter(
        (data: any) => data?.minExp === value
      );
      dispatch(setFilteredData(experience));
    } else {
      // If value is empty, dispatch the original array
      dispatch(setFilteredData(originalData));
    }
  };

  // location input and filter

  const [loc, setLoc] = useState<string>('');

  const handleLocationChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setLoc(value);

    // Check if value exists
    if (value) {
      const location = FilteredData?.filter(
        (data: any) => data?.location === value
      );
      dispatch(setFilteredData(location));
    } else {
      // If value is empty, dispatch the original array
      dispatch(setFilteredData(originalData));
    }
  };

  // role input and filter

  const [role, setRole] = useState<string>('');

  const handleRoleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setRole(value);

    // Check if value exists
    if (value) {
      const yourRole = FilteredData?.filter(
        (data: any) => data?.jobRole === value
      );
      dispatch(setFilteredData(yourRole));
    } else {
      // If value is empty, dispatch the original array
      dispatch(setFilteredData(originalData));
    }
  };

  // location input and filter

  // const [loc, setLoc] = useState<string>('');

  // const handleLocationChange = (event: SelectChangeEvent) => {
  //   const value = event.target.value;
  //   setLoc(value);

  //   // Check if value exists
  //   if (value) {
  //     const location = FilteredData?.filter(
  //       (data: any) => data?.location === value
  //     );
  //     dispatch(setFilteredData(location));
  //   } else {
  //     // If value is empty, dispatch the original array
  //     dispatch(setFilteredData(originalData));
  //   }
  // };
  //initial api call
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      limit: 20,
      offset: 0,
    });

    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.weekday.technology/adhoc/getSampleJdJSON',
          {
            method: 'POST',
            headers: myHeaders,
            body,
          }
        );
        const result = await response.json();
        const innerdata = result?.jdList || [];
        // by default crowding the initial states
        setOriginalData(innerdata);
        dispatch(setFilteredData(innerdata));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className='main'>
      <div className='fields'>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='demo-select-small-label'>Exp</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={minExp}
            label='Exp'
            onChange={handleExpChange}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='demo-select-small-label'>location</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={loc}
            label='location'
            onChange={handleLocationChange}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='delhi ncr'>Delhi ncr</MenuItem>
            <MenuItem value='chennai'>Chennai</MenuItem>
            <MenuItem value='bangalore'>banglore</MenuItem>
            <MenuItem value='mumbai'>Mumbai</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='demo-select-small-label'>Role</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={role}
            label='Role'
            onChange={handleRoleChange}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='backend'>backend</MenuItem>
            <MenuItem value='android'>android</MenuItem>
            <MenuItem value='ios'>ios</MenuItem>
            <MenuItem value='frontend'>frontend</MenuItem>
            <MenuItem value='tech lead'>tech lead</MenuItem>
          </Select>
        </FormControl>

        <input
          className='input'
          type='text'
          id='basicInput'
          placeholder='Company Name'
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      <Grid
        container
        gap={5}
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Cards data={FilteredData} />
      </Grid>
    </div>
  );
}

export default App;
