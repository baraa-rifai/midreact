import { useState } from 'react'
import {
  Container, Typography, Button, Grid, Dialog,
  DialogTitle, DialogContent, TextField, DialogActions, Box, Paper, Divider, Card, CardContent
} from '@mui/material'
import { useCourses } from '../../Hooks/useCourses'
import { useAuth } from '../../Hooks/useAuth'
import { useMessages } from '../../Hooks/useMessages'
import CourseCard from '../CourseCard'
import toast from 'react-hot-toast'

export default function InstructorDashboard() {
  const { courses, addCourse, updateCourse, deleteCourse } = useCourses()
  const { currentUser } = useAuth()
  const { announcements, addAnnouncement, deleteAnnouncement } = useMessages()

  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: ''
  })

  const [annTitle, setAnnTitle] = useState('')
  const [annContent, setAnnContent] = useState('')

  const myCourses = courses ? courses.filter(
    (c) => c.instructorName === currentUser?.name || c.instructorEmail === currentUser?.email
  ) : []

  const myAnnouncements = announcements ? announcements.filter(
    (a) => a.instructorEmail === currentUser?.email || a.instructorName === currentUser?.name
  ) : []

  const handleOpen = (course = null) => {
    if (course) {
      setEditingId(course.id)
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price,
        category: course.category
      })
    } else {
      setEditingId(null)
      setFormData({ title: '', description: '', price: '', category: '' })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingId(null)
  }

  const handleSubmit = () => {
    if (editingId) {
      updateCourse(editingId, formData)
    } else {
      addCourse({ ...formData, instructorName: currentUser?.name || 'Instructor' })
    }
    handleClose()
  }

  const handlePublishAnnouncement = (e) => {
    e.preventDefault()
    if (!annTitle || !annContent) {
      toast.error('Please fill out all announcement fields!')
      return
    }

    addAnnouncement({
      title: annTitle,
      content: annContent,
      instructorName: currentUser?.name || 'Instructor',
      instructorEmail: currentUser?.email || 'instructor@taalam.com',
    })

    setAnnTitle('')
    setAnnContent('')
  }

  return (
    <Container sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">My Instructor Dashboard</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Course
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        My Active Courses
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {myCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <CourseCard
              course={course}
              onDelete={deleteCourse}
              onEdit={handleOpen}
            />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} id="announcements" />

      {/* قسم نشر وإدارة الإعلانات */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        📢 Course Announcements Management
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Publish New Announcement
            </Typography>
            <Box component="form" onSubmit={handlePublishAnnouncement}>
              <TextField
                label="Announcement Title"
                fullWidth
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Announcement Content"
                multiline
                rows={4}
                fullWidth
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" fullWidth color="primary">
                PUBLISH ANNOUNCEMENT
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            My Active Announcements
          </Typography>
          {myAnnouncements.length === 0 ? (
            <Typography color="text.secondary">No announcements published yet.</Typography>
          ) : (
            myAnnouncements.map((ann) => (
              <Card key={ann.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {ann.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {ann.date}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {ann.content}
                  </Typography>
                  <Button
                    size="small"
                    color="error"
                    variant="text"
                    onClick={() => deleteAnnouncement(ann.id)}
                  >
                    DELETE
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? 'Edit Course' : 'Add Course'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2, minWidth: 300 }}>
          <TextField
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            label="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <TextField
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}