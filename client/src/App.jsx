import './App.css'
import Messenger  from './components/Messenger';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthenticationComponent } from './context/AuthenticationContext';

const clientID = "269305777167-b9ouasete90krhnu3ehuevefjk5nvlv6.apps.googleusercontent.com"

function App() {
   
  return (

    <GoogleOAuthProvider clientId={clientID}>
      <AuthenticationComponent>
        <Messenger/>
      </AuthenticationComponent>
    </GoogleOAuthProvider>
  )
}

export default App
