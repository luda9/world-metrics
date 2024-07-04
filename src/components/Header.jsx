import { useRef, useState, useEffect } from "react";
import { styled } from "@mui/material"

const Header = () => {
  return (
    <StyledNavBar>
        <StyledBox>
            <p style={{marginBottom: 0}}>Planet Earth</p>
            <p style={{fontSize: 18, marginTop: 0}}>Countries by Luda</p>
        </StyledBox>
    </StyledNavBar>
  )
}

export default Header

const StyledNavBar = styled("div")(({theme}) => ({
    width: '100vw',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

const StyledBox = styled("div")(({theme}) => ({
    width: '90%',
    textAlign: 'center',
    color: 'white',
    fontWeight: 500,
    fontFamily: "Space Mono, monospace",
    fontSize: 50
}));