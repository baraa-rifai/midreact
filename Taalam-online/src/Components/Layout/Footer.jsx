import { Box, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white', mt: 'auto' }}>
      <Typography variant="body2"> Taalam-online - Developed by Baraa Al-Rifai</Typography>
    </Box>
  )
}