import { Button } from "@mui/material";

const MyButton = ({handler, name}) => {
    return (
        <Button
            variant="contained"
            sx={{backgroundColor:'#053348'}}
            onClick={handler}>
            {name}
        </Button>
    )
}
export default MyButton;