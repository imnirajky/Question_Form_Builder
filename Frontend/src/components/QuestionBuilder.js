import { Link } from 'react-router-dom';
import Categorize from './Categorize';
import ClozeTest from './ClozeTestBuilder';
import Comprehension from './Comprehension';

const QuestionBuilder = () => {
  return (
    <div className='flex flex-col p-5 items-center justify-evenly'>
      <Categorize />
      <ClozeTest />
      <Comprehension />
      <Link to="/exam">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Take Test
        </button>
      </Link>
    </div>
  );
}

export default QuestionBuilder;
