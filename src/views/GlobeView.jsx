import { useState, useEffect } from "react";
import { GlobeComponent, Header, CountryPicker, TableComponent, ToggleComponent, AllDataTable } from 'components'
import { styled } from "@mui/material"
import axios from 'axios'

const GlobeView = () => {

    const [countrySelected, setCountrySelected ] = useState()
    const [countryData, setCountryData ] = useState()
    const [initialGlobe, setInitialGlobe ] = useState(true)
    const [allData, setAllData ] = useState()

    const handleSelection = (selection) => {
        setCountrySelected(selection)
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const styleCountryData = (raw) => {
        const currenciesHelper = Object.keys(raw.currencies)[0];
        const languageHelper = Object.keys(raw.languages)[0];
        const array = []
        // Name
        array.push({label: 'Country Name', value: raw.name.common})
        // Capital
        array.push({label: 'Capital', value: raw.capital[0]})
        // Language
        array.push({label: 'Language', value: raw.languages[languageHelper]})
        // Population
        array.push({label: 'Population', value: numberWithCommas(raw.population)})
        // Currencies
        array.push({label: 'Currency', value: raw.currencies[currenciesHelper].name})
        // Continents
        array.push({label: 'Continent', value: raw.continents[0]})

        return array
    }

    useEffect(() => {
        try {
            if(countrySelected){
                const getCountries = async () => {
                    const apiResponse = await axios(`https://restcountries.com/v3.1/name/${countrySelected.label}`)
                    setCountryData(styleCountryData( await apiResponse.data[0]))
                }
                getCountries()
            }
    
        } catch (error) {
            console.log(error)
        }
    }, [countrySelected])

    const getGlobalData = async () => {
        try {
            const getData = async () => {
                const apiResponse = await axios(`https://restcountries.com/v3.1/all?fields=name,latlng,population`)
                setAllData(apiResponse.data)
            }
            getData()
        } catch (error) {
            
        }
    }
    

    const handleChangeGlobe = () => {
        setInitialGlobe(!initialGlobe)
        if(!initialGlobe == false){
            if(allData && allData.length > 0){
                return
            } else {
                getGlobalData()
            }
        }
    }

  return (
    <StyledMainContainer>
        <GlobeComponent country={countrySelected} initialGlobe={initialGlobe} allData={allData}/>
        <StyledHeaderContainer>
            <Header />
        </StyledHeaderContainer>
        {initialGlobe && (
            <StyledPickerContainer>
                <CountryPicker selection={handleSelection}/>
            </StyledPickerContainer>
        )}
        {countryData && initialGlobe && (
            <StyledTableContainer>
                <TableComponent countryData={countryData} />
            </StyledTableContainer>
        )}
        {allData && !initialGlobe && (
            <StyledAllDataTable>
                <AllDataTable allData={allData} />
            </StyledAllDataTable>
        )}
        <StyledToggleContainer>
            <ToggleComponent initialGlobe={initialGlobe} handleChangeGlobe={handleChangeGlobe} />
        </StyledToggleContainer>
        <StyledLinkedin onClick={()=> window.open("https://www.linkedin.com/in/luda9", "_blank")}>
            <img src={'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-app-white-icon.png'}/>
        </StyledLinkedin>
        <StyledGitHub onClick={()=> window.open("https://github.com/luda9", "_blank")}>
            <img src={'https://cdn-icons-png.flaticon.com/512/25/25231.png'}/>
        </StyledGitHub>
    </StyledMainContainer>
  )
}

export default GlobeView

const StyledMainContainer = styled("div")(({theme}) => ({
    width: '100vw',
}));

const StyledHeaderContainer = styled("div")(({theme}) => ({
    position: 'fixed',
    left: '0%',
    top: '0%'
}));

const StyledPickerContainer = styled("div")(({theme}) => ({
    position: 'fixed',
    left: '6%',
    top: '40%'
}));

const StyledTableContainer = styled("div")(({theme}) => ({
    position: 'fixed',
    right: '6%',
    top: '30%'
}));

const StyledToggleContainer = styled("div")(({theme}) => ({
    position: 'fixed',
    right: '50%',
    transform: 'translateX(50%)',
    bottom: '5%'
}));

const StyledAllDataTable = styled("div")(({theme}) => ({
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '6%',
}));

const StyledLinkedin = styled("div")(({theme}) => ({
    position: 'fixed',
    bottom: '-20%',
    transform: 'scale(0.06)',
    right: '-5%',
    cursor: 'pointer'
}));

const StyledGitHub = styled("div")(({theme}) => ({
    position: 'fixed',
    bottom: '-20%',
    transform: 'scale(0.06)',
    left: '-5%',
    '-webkit-filter':' invert(100%)',
    filter: 'invert(100%)',
    cursor: 'pointer'
}));