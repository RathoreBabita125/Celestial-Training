import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import MyButton from "../../common/Button";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";

const statusOption = ["Yet to be started", "In progress", "Completed", "Delivered", "Pending"];
const priorityOption = ["Low", "Medium", "High"];
const roleOption=["Admin","Project Manager", "Engineer"];

const Filter = ({ open, onClose, setOpenFilter, setFilter, setPage, columnOptions, filterField }) => {
    const [column, setColumn] = useState("");
    const [inputValue, setInputValue] = useState("");

    const handleApply = () => {
        if (!column) return;
        const resetInputField = {};
        filterField.forEach((field) => resetInputField[field] = "")
        setFilter({
            ...resetInputField,
            [column]: inputValue,
        });
        setPage(0);
        setOpenFilter(false);
    };

    const handleReset = () => {
        setColumn("");
        setInputValue("");
        const resetInputField = {};
        filterField.forEach((field) => resetInputField[field] = "");
        setFilter(resetInputField)
        setPage(0);
    };

    const renderValueInput = () => {
        if (column === "status") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Status</InputLabel>
                    <Select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Select Status"
                        color="success"
                    >
                        <MenuItem value="" disabled>Select Status</MenuItem>
                        {statusOption.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }

        if (column === "priority") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Priority</InputLabel>
                    <Select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Select Priority"
                        color="success"
                    >
                        <MenuItem value="" disabled>Select Priority</MenuItem>
                        {priorityOption.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }
        if (column === "role") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Role</InputLabel>
                    <Select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Select Role"
                        color="success"
                    >
                        <MenuItem value="" disabled>Select Role</MenuItem>
                        {roleOption.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }
        return (
            <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                label="Enter filter value"
                fullWidth
                margin="normal"
                color="success"
                disabled={!column}
            />
        );
    };

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    return;
                }
                onClose();
            }}
            fullWidth
            maxWidth="sm"
        >
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
                            {columnOptions?.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {renderValueInput()}
                </DialogContent>
                <DialogActions>
                    <MyButton name="Reset Filter" handler={handleReset} />
                    <MyButton name="Apply Filter" handler={handleApply} />
                </DialogActions>
            </Box>
        </Dialog>
    )
}
export default Filter;