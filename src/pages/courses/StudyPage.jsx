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

const StudyPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    // Fetch course details and topics (dummy data for now)
    setCourse({
      id: courseId,
      title: `Course ${courseId}`,
      description: `This is a comprehensive course covering various aspects of ${courseId}. It includes multiple topics with video lectures and detailed transcripts.`
    });
    setTopics([
      {
        id: 1,
        title: 'Introduction to React',
        videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
        details: 'React is a popular JavaScript library for building user interfaces. This introductory topic covers the basics of React, its core concepts, and why it\'s widely used in modern web development.',
        transcript: 'Welcome to the Introduction to React. In this video, we\'ll cover the fundamental concepts of React, including components, JSX, and the virtual DOM. We\'ll also discuss why React has become so popular among developers and how it can help you build efficient, scalable user interfaces.'
      },
      {
        id: 2,
        title: 'React Components',
        videoUrl: 'https://www.youtube.com/embed/Cla1WwguArA',
        details: 'Components are the building blocks of React applications. This topic delves into the different types of components, their lifecycle, and best practices for creating reusable UI elements.',
        transcript: 'In this lesson on React Components, we\'ll explore how to create both functional and class components. We\'ll discuss the component lifecycle, state management, and how to pass data between components using props. By the end of this video, you\'ll have a solid understanding of how to structure your React applications using components.'
      },
      {
        id: 3,
        title: 'Introduction to React',
        videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
        details: 'React is a popular JavaScript library for building user interfaces. This introductory topic covers the basics of React, its core concepts, and why it\'s widely used in modern web development.',
        transcript: 'Welcome to the Introduction to React. In this video, we\'ll cover the fundamental concepts of React, including components, JSX, and the virtual DOM. We\'ll also discuss why React has become so popular among developers and how it can help you build efficient, scalable user interfaces.'
      },
      {
        id: 4,
        title: 'React Components',
        videoUrl: 'https://www.youtube.com/embed/Cla1WwguArA',
        details: 'Components are the building blocks of React applications. This topic delves into the different types of components, their lifecycle, and best practices for creating reusable UI elements.',
        transcript: 'In this lesson on React Components, we\'ll explore how to create both functional and class components. We\'ll discuss the component lifecycle, state management, and how to pass data between components using props. By the end of this video, you\'ll have a solid understanding of how to structure your React applications using components.'
      },
    ]);
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