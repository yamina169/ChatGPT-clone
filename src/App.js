/*
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/index';
import { Login,CreateAccount,ResetPassword,VerifyCode,SetNewPd,Home ,RegisterAccount,Edit,Poll} from './pages/index';
import { QueryClientProvider, QueryClient } from 'react-query';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
<Header/>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='CreateAccount' element={<CreateAccount />} />
            <Route path='RegisterAccount' element={< RegisterAccount/>} />
            <Route path='ResetPassword' element={<ResetPassword />} />
            <Route path='VerifyCode' element={<VerifyCode />} />
            <Route path='SetNewPd' element={<SetNewPd />} />
            <Route path='Home' element={<Home/>} />
            <Route path='Edit' element={<Edit/>} />
          
            <Route path='Poll' element={<Poll/>} />
          
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
*/
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header ,Topics} from './components/index';
import { Login, CreateAccount, ResetPassword, VerifyCode, SetNewPd, Home, RegisterAccount, Edit, Poll } from './pages/index';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ToastProvider } from 'react-toast-notifications';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
       <ToastProvider  placement="top-center">
      <div className="App">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='CreateAccount' element={<CreateAccount />} />
            <Route path='RegisterAccount' element={<RegisterAccount />} />
            <Route path='ResetPassword' element={<ResetPassword />} />
            <Route path='VerifyCode' element={<VerifyCode />} />
            <Route path='SetNewPd' element={<SetNewPd />} />
            <Route path='Home' element={<Home />} />
            <Route path='Edit' element={<Edit />} />
            <Route path='Poll' element={<Poll/>} />
            <Route path='Topics' element={<Topics/>} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
