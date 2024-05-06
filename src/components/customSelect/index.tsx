import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface CustomSelectProps {
  label: string;
  value: string | undefined;
  onChange: (event: SelectChangeEvent) => void;
  options: number[] | string[];
  availableValues: unknown[];
}

function CustomSelect({
  label,
  value,
  onChange,
  options,
  availableValues,
}: CustomSelectProps) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
      <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`select-label-${label}`}
        value={value}
        label={label}
        onChange={onChange}>
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            disabled={!availableValues.includes(option)}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
