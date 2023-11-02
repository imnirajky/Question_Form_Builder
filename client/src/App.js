import { BrowserRouter, Route, Routes } from 'react-router-dom';
import QuestionBuilder from './components/QuestionBuilder';
import Exam from './components/Exam';
 
function App() { 
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuestionBuilder />} />
          <Route path="/exam" element={<Exam />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
