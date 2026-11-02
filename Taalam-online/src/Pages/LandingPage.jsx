import { Container, Typography, Grid, Box } from '@mui/material'
import { useCourses } from '../Hooks/useCourses'
import CourseCard from '../Components/CourseCard'

export default function LandingPage() {
  const { courses } = useCourses()

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to EduMarket
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Learn from expert instructors or start teaching today.
        </Typography>
      </Box>

      <Typography variant="h4" sx={{ mb: 3 }}>Available Courses</Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}