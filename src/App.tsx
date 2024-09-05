import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/general/navBar'
// import Component from './components/general/Component'
import RoutingArea from './components/general/navigations/routingArea'
import Footer from './components/general/footer'
// import { NotificationContainer } from 'react-notifications';
// import 'react-notifications/lib/notifications.css';


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <RoutingArea/>
        {/* <Footer/> */}
        {/* <NotificationContainer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
