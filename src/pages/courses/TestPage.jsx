import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import MainCard from 'components/MainCard';

const TestPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Fetch course details and questions (dummy data for now)
    setCourse({
      id: courseId,
      title: `Course ${courseId}`,
      description: `Description for Course ${courseId}`
    });
    setQuestions([
      {
        id: 1,
        text: 'What is React?',
        options: ['A JavaScript library', 'A database', 'An operating system', 'A programming language'],
        correctAnswer: 'A JavaScript library'
      },
      {
        id: 2,
        text: 'Which of the following is used in React.js to increase performance?',
        options: ['Virtual DOM', 'Original DOM', 'Both A and B', 'None of the above'],
        correctAnswer: 'Virtual DOM'
      },
      // Add more questions as needed
    ]);
  }, [courseId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore((correctAnswers / questions.length) * 100);
    setActiveStep(1); // Move to results page
  };

  const renderTestQuestions = () => (
    <Box>
      {questions.map(question => (
        <Paper key={question.id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>{question.text}</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            >
              {question.options.map(option => (
                <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Test</Button>
    </Box>
  );

  const renderTestResults = () => (
    <Box>
      <Typography variant="h4" gutterBottom>Test Results</Typography>
      <Typography variant="h5" gutterBottom>Your score: {score.toFixed(2)}%</Typography>
      <Typography variant="body1" gutterBottom>
        You answered {Math.round(score / 100 * questions.length)} out of {questions.length} questions correctly.
      </Typography>
      <Box mt={3}>
        <Typography variant="h6" gutterBottom>Question Review:</Typography>
        {questions.map(question => (
          <Paper key={question.id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>{question.text}</Typography>
            <Typography color={answers[question.id] === question.correctAnswer ? 'success.main' : 'error.main'}>
              Your answer: {answers[question.id] || 'Not answered'}
            </Typography>
            <Typography color="success.main">
              Correct answer: {question.correctAnswer}
            </Typography>
          </Paper>
        ))}
      </Box>
      <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
        Return to Dashboard
      </Button>
    </Box>
  );

  if (!course) return <Typography>Loading...</Typography>;

  return (
    <MainCard title={`Test for ${course.title}`}>
      <Typography variant="body1" gutterBottom>{course.description}</Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        <Step><StepLabel>Take Test</StepLabel></Step>
        <Step><StepLabel>View Results</StepLabel></Step>
      </Stepper>
      {activeStep === 0 ? renderTestQuestions() : renderTestResults()}
    </MainCard>
  );
};

export default TestPage;
