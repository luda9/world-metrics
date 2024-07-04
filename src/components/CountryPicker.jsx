import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef, useState, useEffect } from "react";
import { styled, Autocomplete, TextField, Paper } from "@mui/material"
import axios from 'axios'
import { BorderColor } from '@mui/icons-material';

const CountryPicker = ({selection}) => {
    const [countries, setCountries] = useState([])
    const [arrow, setArrow] = useState(false)
    const [showSelect, setShowSelect] = useState(false)
    const [animation, setAnimation] = useState(false)

    const styleCountries = (countries) => {
      const countriesLabeled = []

      for (let i = 0; i < countries.length; i++) {
        const newFormat = {
          label: countries[i].name.common,
          lat: countries[i].latlng[0],
          lng: countries[i].latlng[1]
        }
        countriesLabeled.push(newFormat)
      }
      setCountries(countriesLabeled.sort((a, b) => (a.label > b.label) ? 1 : -1))
    }

    useEffect(() => {
        try {
          const getCountries = async () => {
              const apiResponse = await axios('https://restcountries.com/v3.1/all?fields=name,latlng')
              styleCountries(apiResponse.data)
          }
  
           getCountries()
        } catch (error) {
          console.log(error)
        }
      }, [])
    
      const handleArrowAnimation = () => {
        setAnimation(!animation)
        setTimeout(() => {
          setArrow(!arrow)
        }, 300);
      }

      const handleShowCountries = () => {
        setTimeout(() => {
          setShowSelect(!showSelect)
        }, 300);
      }
      
  return (
     <StyledMainContainer>
        <StyledTitle  onClick={() => {
          handleArrowAnimation();
          handleShowCountries();
      }}>
            Countries
            {arrow ? (
              <StyledIconBackwards 
              sx={{ color: 'rgba(255, 255, 255, 0.75)', fontWeight: '100' }} 
              fontSize="small" 
              animation={animation} 
              />
            ) : (
              <StyledIconInitiate 
                sx={{ color: 'rgba(255, 255, 255, 0.75)', fontWeight: '100' }} 
                fontSize="small" 
                animation={animation} 
                />
            )}
        </StyledTitle>
        <StyledAutocomplete
            disablePortal
            id="combo-box-demo"
            options={countries}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
            onChange={(e, newValue) => selection(newValue)}
            defaultValue={selection.label}
            show={showSelect}
            PaperComponent={(props) => (
              <Paper
                sx={{
                  background: "rgba(255, 255, 255, 0.40)",
                  color: "white",
                  fontSize: "25px",
                  marginTop: '15px',
                  
                }}
                {...props}
              />
            )}
        />
        
    </StyledMainContainer>
  )
}

export default CountryPicker

const StyledMainContainer = styled("div")(({theme}) => ({
    
}));

const StyledTitle = styled("div")(({theme}) => ({
    width: 300,
    color: 'white',
    fontFamily: "Raleway, sans-serif",
    fontWeight: 400,
    fontSize: 22,
    borderBottom: '1px solid rgba(255, 255, 255, 0.40)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    cursor: 'pointer'
}));

const StyledIconInitiate = styled(ArrowForwardIosIcon)(({theme, animation}) => ({
    animation: animation ? "spin 0.3s forwards" : '',
    "@keyframes spin": {
      "0%": {
        transform: "rotate(0deg)",
      },
      "99%": {
        transform: "rotate(90deg)",
      },
    },
    
}));

const StyledIconBackwards = styled(ArrowForwardIosIcon)(({theme, animation}) => ({
  transform: "rotate(90deg)",
  animation: !animation ? "spin 0.3s forwards" : '',
  "@keyframes spin": {
    "0%": {
      transform: "rotate(90deg)",
    },
    "99%": {
      transform: "rotate(0deg)",
    },
  },
  
}));

const StyledAutocomplete = styled(Autocomplete)(({theme, show}) => ({
  fontFamily: "Raleway, sans-serif",
  opacity: show ? 1 : 0,
  border: '1.5px solid rgba(255, 255, 255, 0.40)',
  borderRadius: 15,
  marginTop: 20,
  '& .MuiFormControl-root' : {
    borderRadius: 15,
  },
  '& .MuiInputBase-root' : {
    borderRadius: 15,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.40)',
    borderRadius: 13,
  },
  '& .MuiInputBase-input' : {
    color: 'white',
  },
}));