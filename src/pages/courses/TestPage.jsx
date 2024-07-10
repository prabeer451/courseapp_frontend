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
  StepLabel,
  CircularProgress
} from '@mui/material';
import MainCard from 'components/MainCard';
import { getToken } from 'utils/auth';
const TestPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const token = getToken();
  useEffect(() => {
    const fetchCourseAndQuestions = async () => {
      setIsLoading(true);
      try {

        // Fetch course details
        const courseResponse = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!courseResponse.ok) throw new Error('Failed to fetch course details');
        const courseData = await courseResponse.json();
        setCourse(courseData);

        // Fetch questions
        const questionsResponse = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}/questions/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!questionsResponse.ok) throw new Error('Failed to fetch questions');
        const questionsData = await questionsResponse.json();
        setQuestions(questionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseAndQuestions();
  }, [courseId, token]);

  const handleSubmitAnswer = async (questionId, selectedChoice) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/submissions/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: questionId,
          selected_choice: selectedChoice
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit answer');
      }
  
      const result = await response.json();
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [questionId]: { ...result, selected_choice: selectedChoice }
      }));
      console.log('Answer submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting answer:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  

  const handleAnswerSelect = (questionId, selectedChoice) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: { selected_choice: selectedChoice }
    }));
    handleSubmitAnswer(questionId, selectedChoice);
  };

  const handleNext = () => {
    if (activeStep < questions.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    const totalQuestions = questions.length;
    const correctAnswers = Object.values(answers).filter(answer => answer.is_correct).length;
    const calculatedScore = (correctAnswers / totalQuestions) * 100;
    setScore(calculatedScore.toFixed(2)); // Round to 2 decimal places
    setActiveStep(questions.length); // Move to the completion step
  };

  if (isLoading) {
    return (
      <MainCard title="Loading...">
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      </MainCard>
    );
  }

  return (
    <MainCard title={course ? course.title : 'Test'}>
      {course && (
        <Box>
          <Typography variant="body1" gutterBottom>
            {course.description}
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel>
            {questions.map((_, index) => (
              <Step key={index}>
                <StepLabel>Question {index + 1}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep < questions.length ? (
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                {questions[activeStep].question_text}
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={answers[questions[activeStep].id]?.selected_choice?.toString() || ''}
                  onChange={(e) => handleAnswerSelect(questions[activeStep].id, e.target.value)}
                >
                  {questions[activeStep].options.map((option, index) => (
                    <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              </FormControl>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleBack} disabled={activeStep === 0}>
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={activeStep === questions.length - 1 ? handleFinish : handleNext}>
                  {activeStep === questions.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Paper>
          ) : (
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Test Completed!
              </Typography>
              <Typography variant="body1">
                Your final score: {score}%
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Correct answers: {Object.values(answers).filter(answer => answer.is_correct).length} out of {questions.length}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => navigate(`/dashboard/default`)} sx={{ mt: 2 }}>
                Back to Course
              </Button>
            </Paper>
          )}
        </Box>
      )}
    </MainCard>
  );
};

export default TestPage;
