import { Box, Button, CardActions, CardContent, Stack } from "@mui/material"
import Card from "@mui/material/Card"
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'

function App() {


  const natureDetails = [
    {
      image: 'https://images.unsplash.com/photo-1769898509274-be67a45cf885?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'The Deer',
      desc: 'Lorem ipsum dolor sit amet consectetur'
    },
    {
      image: 'https://images.unsplash.com/photo-1740916856932-7b02aeca973b?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'The bird',
      desc: 'Lorem ipsum dolor sit amet consectetur,'

    },
    {
      image: 'https://images.unsplash.com/photo-1712135596996-3dda241aa9bc?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'The Pink Flower',
      desc: 'Lorem ipsum dolor sit amet consectetur'

    },
    {
      image: 'https://images.unsplash.com/photo-1776445602573-0cc8680b4d0a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'The Sun Flower',
      desc: 'Lorem ipsum dolor sit amet consectetur'

    },
    {
      image: 'https://images.unsplash.com/photo-1652784275134-1253e1574e6f?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'The Flower',
      desc: 'Lorem ipsum dolor sit amet consectetur'

    }

  ]

  return (
    <>
      <Stack sx={{ width: '100%', height: '100%' }} direction={'row'} spacing={3}>
        {
          natureDetails.map((currData) => {
            return <Box sx={{ width: '300px', height: '500px', padding:'20px' }} >
              <Card>
                <CardMedia 
                  component='img' 
                  image={currData.image}
                  height={'250px'}
                  />
                <CardContent>
                  <Typography variant="h5" color="initial">{currData.title}</Typography>
                  <Typography variant="body2" color="initial">{currData.desc}</Typography>
                </CardContent>
                <CardActions sx={{display:'flex', justifyContent:'space-around', padding:'4px', height:'100px' }}>
                  <Button color="primary" variant="contained">Add To Cart</Button>
                  <Button color="primary" variant="contained">Buy Now</Button>
                </CardActions>
              </Card>
            </Box>
          })
        }

      </Stack>
    </>
  )
}

export default App
