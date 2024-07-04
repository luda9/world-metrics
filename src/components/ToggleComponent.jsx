import { useState } from 'react'
import { ToggleButton, ToggleButtonGroup, styled } from '@mui/material';

const ToggleComponent = ({initialGlobe, handleChangeGlobe}) => {
    const [alignment, setAlignment] = useState(initialGlobe ? 'left' : 'right');

    const handleAlignment = (e) => {
        if(alignment !== e.target.ariaLabel){
            handleChangeGlobe()
            setAlignment(e.target.ariaLabel);
        }
      };

  return (
    <StyledToggleButton
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text"
    >
      <StyledToggle value="left" aria-label="left">
        By Country
      </StyledToggle>
      <StyledToggle value="right" aria-label="right">
        Population
      </StyledToggle>
    </StyledToggleButton>
  )
}

export default ToggleComponent

const StyledToggleButton = styled(ToggleButtonGroup)(({theme, animation}) => ({
    color: 'white',
    border: '1px solid white',
    borderRadius: '20px'
}));

const StyledToggle = styled(ToggleButton)(({theme, animation}) => ({
    color: 'rgba(255, 255, 255, 0.40)',
    borderRadius: '20px',
    "&.Mui-selected": {
        color: "rgba(255, 255, 255, 0.80)",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        "&:hover": {
        color: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        },
        },
        "&:hover": {
        color: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
}));