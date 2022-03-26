import type { AppProps } from 'next/app'
import { Fragment } from 'react';
import styled from 'styled-components';
// Context
import UserProvider, { useUserContext } from '../context/contextProvider';
// Styles
import GlobalStyle from "../styles/globalStyles";
// Components
import Cart from '../components/cart/Cart';

function MyApp({ Component, pageProps }: AppProps) {
  const App = () => {
    const {
      theme, 
      isCartOpen, 
      setIsCartOpen
    } = useUserContext();
    
    return (
      <Fragment>
        <GlobalStyle 
          theme={theme}
        />
        {isCartOpen ? <Background 
          onClick={() => setIsCartOpen(false)}
        /> : null}
        <Cart/>
        <Component {...pageProps} />
      </Fragment>
    )
  }

  return (
    <UserProvider>
      <App/>
    </UserProvider>
  )
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 10;
`;


export default MyApp
