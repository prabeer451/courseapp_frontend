import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Button,
  Divider
} from '@mui/material';
import MainCard from 'components/MainCard';
import { jsPDF } from "jspdf";
import { getToken } from 'utils/auth';

const StudyPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = getToken();
        const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
  
        const data = await response.json();
        setCourse({
          id: data.id,
          title: data.title,
          description: data.details,
        });
        setTopics(data.topics);
      } catch (error) {
        console.error('Error fetching course data:', error);
        // Handle error (e.g., show error message to user)
      }
    };
  
    fetchCourseData();
  }, [courseId]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleDownloadPDF = () => {
    if (selectedTopic) {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(selectedTopic.title, 10, 10);
      doc.setFontSize(12);
      doc.text(doc.splitTextToSize(selectedTopic.details, 180), 10, 20);
      doc.text(doc.splitTextToSize(selectedTopic.transcript, 180), 10, 50);
      doc.save(`${selectedTopic.title}.pdf`);
    }
  };

  if (!course) return <Typography>Loading...</Typography>;

  return (
    <MainCard title={`Study ${course.title}`}>
      <Typography variant="body1" gutterBottom>{course.description}</Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom align="center"><strong>Topics</strong></Typography>
            <List>
              {topics.map((topic) => (
                <ListItem 
                  button 
                  key={topic.id} 
                  onClick={() => handleTopicSelect(topic)}
                  selected={selectedTopic && selectedTopic.id === topic.id}
                >
                  <ListItemText primary={topic.title} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          {selectedTopic ? (
            <Box>
              <Typography variant="h5" gutterBottom>{selectedTopic.title}</Typography>
              <iframe
                width="100%"
                height="315"
                src={selectedTopic.videoUrl}
                title={selectedTopic.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Topic Details</Typography>
                <Typography variant="body1" paragraph sx={{ fontFamily: 'Arial, sans-serif', fontSize: '1rem', lineHeight: 1.6 }}>{selectedTopic.details}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>Transcript</Typography>
                <Typography variant="body1" paragraph sx={{ fontFamily: 'Arial, sans-serif', fontSize: '1rem', lineHeight: 1.6 }}>{selectedTopic.transcript}</Typography>
                <Button variant="contained" color="primary" onClick={handleDownloadPDF} sx={{ mt: 2 }}>
                  Download as PDF
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography>Select a topic to start studying</Typography>
          )}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default StudyPage;