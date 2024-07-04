import { useState, useEffect } from "react";
import {Box, styled} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const AllDataTable = ({allData}) => {

    const [countriesData, setCountriesData] = useState()
    
    useEffect(() => {
        const styleData = () => {
            if(allData){
                let countriesArray = []
                for (let i = 0; i < allData.length; i++) {
                    countriesArray.push({id: i + 1, name: allData[i].name.common, population: allData[i].population})
                }
                setCountriesData(countriesArray)
            }
        }
        styleData()
    }, [])
    
    const columns = [
        {
          field: 'name',
          headerName: 'Country',
          width: 150,
          editable: true,
        },
        {
          field: 'population',
          headerName: 'Population',
          width: 150,
          editable: true,
        },
      ];

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

  return (
    countriesData && (
        <Box sx={{ height: 400, width: '100%' }}>
        <StyledTable
            rows={countriesData}
            columns={columns}
            disableRowSelectionOnClick
            hideFooterPagination={true}
            disableColumnResize={true}
            initialState={{
                sorting: {
                    sortModel: [{ field: "population", sort: "desc" }],
                     },
                   }}
        />
        </Box>
    )
  )
}

export default AllDataTable

const StyledTable = styled(DataGrid)(({theme}) => ({
    backgroundColor: 'rgba(255, 255, 255, 0)',
    border: '1px solid rgba(255, 255, 255, 0.75)',
    maxHeight: '60vh',
    '& .MuiDataGrid-cell': {
        color: 'rgba(255, 255, 255, 0.75)',
    },
    '& .css-yrdy0g-MuiDataGrid-columnHeaderRow': {
    },
    '& .MuiDataGrid-columnHeader': {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        fontFamily: "Raleway, sans-serif",
        fontWeight: 500,
        fontSize: 16,
    }
  }));
  
//   const StyledTableHead = styled(TableHead)(({theme}) => ({
//     backgroundColor: 'rgba(255, 255, 255, 0.75)',
//     '& .MuiTableCell-head': {
//         fontFamily: "Raleway, sans-serif",
//           fontWeight: 500,
//           fontSize: 16,
//       }
//   }));
  
//   const StyledTableCell = styled(TableCell)(({theme}) => ({
//     color: 'rgba(255, 255, 255, 0.75)',
//   }));