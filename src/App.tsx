import './App.css'
import '@radix-ui/themes/styles.css';

import AssetsList from './components/AssetsList';
import BoardHeader from './components/BoardHeader';
import BoardList from './components/BoardList';
import TopBar from './components/TopBar';

function App() {

  // Use the 'data' variable in your component as needed

  return (
    <div className='flex flex-col gap-2 items-start justify-start align-top'>
      <TopBar />
      <BoardHeader />
      <BoardList />
      <AssetsList />
    </div>
  )
}

export default App
