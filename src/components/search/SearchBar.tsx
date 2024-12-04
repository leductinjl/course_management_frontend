import React from 'react';
import {
  TextField,
  Button,
  InputAdornment,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChange,
  onSearch,
}) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            transition: 'all 0.3s',
            '&:hover': {
              '& fieldset': {
                borderColor: 'primary.main',
              }
            },
            '&.Mui-focused': {
              '& fieldset': {
                borderWidth: '2px',
              }
            }
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                onClick={onSearch}
                startIcon={<SearchIcon />}
                sx={{
                  height: '40px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }
                }}
              >
                Tìm kiếm
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;