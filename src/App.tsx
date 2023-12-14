import './App.css'
import AssetsList from './components/AssetsList';

import BoardHeader from './components/BoardHeader';
import BoardList from './components/BoardList';

function App() {

  // Use the 'data' variable in your component as needed

  return (
    <div className='flex flex-col gap-4 items-start justify-start align-top'>
      <BoardHeader />
      <BoardList />
      <AssetsList />
    </div>
  )
}

export default App
