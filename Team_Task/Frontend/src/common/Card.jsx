import { Card, CardContent, Typography } from "@mui/material"

const CardComp = ({name, count}) => {
    return (
        <Card className='dash-card'>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{name}</Typography>
                <Typography variant="h1" sx={{ fontWeight: 'bold' }}>{count}</Typography>
            </CardContent>
        </Card>
    )
}
export default CardComp