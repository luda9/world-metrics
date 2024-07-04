import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled} from '@mui/material';

const TableComponent = ({countryData}) => {
  return (
    <StyledTable component={Paper}>
      <Table aria-label="simple table">
        <StyledTableHead>
          <TableRow>
            <TableCell>Country Data</TableCell>
            <TableCell align="right">Values</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {countryData.map((row) => (
            <TableRow
              key={row.label}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
              {row.label}
              </StyledTableCell>
              <StyledTableCell align="right">{row.value}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTable>
  );
}

export default TableComponent

const StyledTable = styled(TableContainer)(({theme}) => ({
  backgroundColor: 'rgba(255, 255, 255, 0)',
  border: '1px solid rgba(255, 255, 255, 0.75)'
}));

const StyledTableHead = styled(TableHead)(({theme}) => ({
  backgroundColor: 'white',
  '& .MuiTableCell-head': {
      fontFamily: "Raleway, sans-serif",
        fontWeight: 500,
        fontSize: 16,
    }
}));

const StyledTableCell = styled(TableCell)(({theme}) => ({
  color: 'rgba(255, 255, 255, 0.75)',
}));