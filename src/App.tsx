/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, SelectChangeEvent } from '@mui/material';
import './App.css';
import Cards from './components/cards';
import { setFilteredData } from './redux/slices/cards';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { useEffect, useMemo, useState } from 'react';
import CustomSelect from './components/customSelect';

function App() {
  // global hooks
  const dispatch = useAppDispatch();
  const { FilteredData } = useAppSelector((state) => state.card);

  // Initialize as empty array where we store original array
  const [originalData, setOriginalData] = useState<any[]>([]);

  // inputs local states
  const [inputValue, setInputValue] = useState<string>('');
  const [minExp, setMinExp] = useState<string>('');
  const [loc, setLoc] = useState<string>('');
  const [role, setRole] = useState<string>('');

  // filters reset function
  const resetFilters = () => {
    setInputValue('');
    setMinExp('');
    setLoc('');
    setRole('');
    dispatch(setFilteredData(originalData));
  };

  // filters on companyname,location,minexperience,minpay and role is done and no data on tech stack available in response

  // company name input and filter

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

  //1. min exp input and filter

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

    // Reset filters when "None" is selected
    if (value === '') {
      resetFilters();
    }
  };

  // Compute available minExp values from the filtered data
  const availableMinExpValues = useMemo(() => {
    const expValues = FilteredData.map((data: any) => data.minExp);
    return [...new Set(expValues)]; // Remove duplicates
  }, [FilteredData]);

  // All possible minExp values
  const providedExpValues = [1, 2, 3, 5, 6, 7, 8, 9, 10]; // Adjust according to your needs

  //2. location input and filter

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

    // Reset filters when "None" is selected
    if (value === '') {
      resetFilters();
    }
  };

  // Compute available location values from the filtered data
  const availableLocationValues = useMemo(() => {
    const locationValues = FilteredData.map((data: any) => data.location);
    return [...new Set(locationValues)]; // Remove duplicates
  }, [FilteredData]);

  // All possible location values
  const providedLocations = [
    'chennai',
    'mumbai',
    'delhi ncr',
    'bangalore',
    'remote',
    'onsite',
  ]; // Adjust according to your needs

  //3. role input and filter

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

    // Reset filters when "None" is selected
    if (value === '') {
      resetFilters();
    }
  };

  // Compute available role values from the filtered data
  const availableRoleValues = useMemo(() => {
    const RoleValues = FilteredData.map((data: any) => data.jobRole);
    return [...new Set(RoleValues)]; // Remove duplicates
  }, [FilteredData]);

  // All possible role values
  const providedRoles = ['tech lead', 'frontend', 'ios', 'android', 'backend']; // Adjust according to your needs

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
      <p className='note'>
        note : to reset all the values, you can select the none value in any of
        the dropdowns(there should an existing selected value in dropdown to
        apply reset ).{' '}
      </p>
      <div className='fields'>
        {/*experience filter*/}

        <CustomSelect
          label='Exp'
          value={minExp}
          onChange={handleExpChange}
          options={providedExpValues}
          availableValues={availableMinExpValues}
        />

        {/*location filter*/}

        <CustomSelect
          label='location'
          value={loc}
          onChange={handleLocationChange}
          options={providedLocations}
          availableValues={availableLocationValues}
        />

        {/*role filter*/}

        <CustomSelect
          label='Role'
          value={role}
          onChange={handleRoleChange}
          options={providedRoles}
          availableValues={availableRoleValues}
        />

        {/*company name input*/}

        <input
          className='input'
          type='text'
          id='basicInput'
          placeholder='Company Name'
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      {/*cards*/}

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
