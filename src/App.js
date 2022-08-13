// import './App.css';
import {Routes, Route} from 'react-router-dom'
import AllTransactions from './components/AllTransactions';
import CustomerDetails from './components/CustomerDetails';
import EmployeeLogin from './components/EmployeeLogin';
import Home from './components/Home';
import MakeTransaction from './components/MakeTransaction';
import NavbarComponent from './components/Navbar';


function App() {
  return (
    <>
   
    <Routes>
      <Route path="/" element={<EmployeeLogin />} />
      <Route path="/home" element={<NavbarComponent />}/>
      <Route path="/home/maketransaction" element={<MakeTransaction/>}/>
      <Route path="/home/alltns" element={<AllTransactions/>}/>
      <Route path="/home/customers" element={<CustomerDetails/>}/>
    </Routes>
    </>
  );
}

export default App;
