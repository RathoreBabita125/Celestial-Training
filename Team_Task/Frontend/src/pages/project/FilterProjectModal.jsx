import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import MyButton from "../../common/Button";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";

const COLUMN_OPTIONS = [
    { label: "Project Name", value: "title" },
    { label: "Status", value: "status" },
    { label: "Priority", value: "priority" },
    { label: "Project Manager", value: "projectManager" },
];

const FilterProjectModal = ({ open, onClose, setOpenFilter, setFilter, setPage }) => {
    const [column, setColumn] = useState("");
    const [inputValue, setInputValue] = useState("");

    const handleApply = () => {
        if (!column) return;
      
        setFilter({
            title: "",
            status: "",
            priority: "",
            projectManager: "",
            [column]: inputValue, 
        });
        setPage(0);
        setOpenFilter(false);
    };

    const handleReset = () => {
        setColumn("");
        setInputValue("");
        setFilter({ title: "", status: "", priority: "", projectManager: "" });
        setPage(0);
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box sx={{ padding: 1 }}>
                <Box sx={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", color: "#053348"
                }}>
                    <DialogTitle sx={{ fontWeight: "bold", fontSize: "25px" }}>Filter</DialogTitle>
                    <ClearIcon sx={{ marginRight: 3, cursor: "pointer" }}
                        onClick={() => setOpenFilter(false)} />
                </Box>
                <DialogContent>

                    <FormControl fullWidth>
                        <InputLabel color="success">Select Column</InputLabel>
                        <Select
                            value={column}
                            onChange={(e) => { setColumn(e.target.value); setInputValue(""); }}
                            label="Select Column"
                            color="success"
                        >
                            <MenuItem value="" disabled>Select Column</MenuItem>
                            {COLUMN_OPTIONS.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                   
                    <TextField
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Enter filter value"
                        fullWidth
                        margin="normal"
                        color="success"
                        disabled={!column}
                    />
                </DialogContent>
                <DialogActions>
                    <MyButton name="Reset Filter" handler={handleReset} />
                    <MyButton name="Apply Filter" handler={handleApply} />
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default FilterProjectModal;
