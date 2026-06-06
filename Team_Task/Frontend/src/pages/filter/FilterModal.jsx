import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import MyButton from "../../common/Button";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";

const FilterSection = ({ open, onClose, setOpenFilter, filterValue, setFilterValue, setPage, setApplyFilter }) => {

    const [inputValue, setInputValue]=useState(false)
    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
        setPage(0);
    }
    const handleApplyFilterBTN=()=>{
        setApplyFilter(true);
        setOpenFilter(false);
    }
    const handleResetBTN=()=>{
        setInputValue(true);
    }
    
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box sx={{ padding: 1 }}>
                <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', color: '#053348', fontWeight: 'bold' }}>
                    <DialogTitle sx={{ fontWeight: 'bold', fontSize: '25px' }}>Filter</DialogTitle>
                    <ClearIcon
                        sx={{ marginRight: 3, cursor: "pointer" }}
                        onClick={() => setOpenFilter(false)}
                    />
                </Box>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel color="success">Select Column</InputLabel>
                        <Select
                            name="columnName"
                            value={!inputValue ? filterValue.columnName : ""}
                            onChange={handleFilterChange}
                            displayEmpty
                            color="success"
                            label="Select Column"
                        >
                            <MenuItem value="" disabled >Select Column</MenuItem>
                            <MenuItem value="Name">Name</MenuItem>
                            <MenuItem value="Email">Email</MenuItem>
                            <MenuItem value="Role">Role</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="columnValue"
                        value={!inputValue ? filterValue.columnValue : ""}
                        onChange={handleFilterChange}
                        label="Enter filter value"
                        fullWidth
                        margin="normal"
                        color="success"
                    />
                </DialogContent>
                <DialogActions>
                    <MyButton name="Reset Filter" handler={handleResetBTN}/>
                    <MyButton name="Apply Filter" handler={handleApplyFilterBTN}/>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default FilterSection;