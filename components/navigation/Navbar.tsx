import { FC, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
// Context 
import { useUserContext } from '../../context/contextProvider';
// Styles
import { Container } from '../../styles/styles';
// Icons
import ShoppingBagIcon from '@mui/icons-material/LocalMallOutlined'; // Shopping bag
import UserIcon from '@mui/icons-material/AccountCircleOutlined'; // User
import LightModeIcon from '@mui/icons-material/LightModeOutlined'; // Light Mode
import Menu from "@mui/icons-material/Menu"; // Menu
import Searchbar from './Searchbar';

const Navbar:FC<{}> = () => {
  const {setIsCartOpen} = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <NavbarWrapper>
      <Navigation>
        <NavigationLeft>
          {/* Logo */}
          <Link href="/">
            <a>
              <Logo>TheTechShop</Logo>
            </a>
          </Link>
          {/* Menu toggle */}
          <MenuWrapper
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(old => !old)}
          >
            <Menu
              sx={{
                fontSize: 30,
                color: "#000"
              }}
            />
          </MenuWrapper>
        </NavigationLeft>
        <NavigationRight 
          isOpen={isMenuOpen}
        >
          {/* Search bar */}
          <Searchbar/>
          <IconsWrapper>
            {/* Theme  */}
            <IconWrapper>
              <LightModeIcon 
                sx={{
                  color: "#000", 
                  fontSize: "30px"
                }}
              />
            </IconWrapper>
            {/* Profile */}
            <Link href="/login">
              <IconWrapper>
                <UserIcon 
                  sx={{
                    color: "#000", 
                    fontSize: "30px"
                  }}
                />
              </IconWrapper>
            </Link>
            {/* Cart */}
            <IconWrapper 
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBagIcon 
                sx={{
                  color: "#000", 
                  fontSize: "30px"
                }}
              />
            </IconWrapper>
          </IconsWrapper>
        </NavigationRight>

      </Navigation>
    </NavbarWrapper>
  )
}

const Navigation = styled(Container)`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
    padding: 0;
  }
`;

const NavbarWrapper = styled.div`
  border-bottom: 1px solid #DDDDDD;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
`;

const Logo = styled.h2`
  font-size: 1.7rem;
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  border: 1px solid #DDDDDD;
  padding: 9px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  cursor: pointer;
`;

const NavigationLeft = styled.div`
  display: flex; 
  align-items: center;
  justify-content: space-between;
  @media (max-width: 600px) {
    width: 100%;
    border-bottom: 1px solid #DDDDDD;
    padding: 15px 20px;
  }
`;

const NavigationRight = styled.div<{isOpen: boolean}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-left: 50px;
  @media (max-width: 600px) {
    position: fixed;
    background-color:#fff;
    border-bottom: 1px solid #DDDDDD;
    top: ${props => props.isOpen ? "65px" : "-100%"};
    opacity: ${props => props.isOpen ? 1 : 0};
    flex-direction: column-reverse;
    align-items: center;
    margin-left: 0;
    width: 100%;
    padding: 20px;
    padding-top: 10px;
    transition: top 0.3s ease-in-out, opacity 0.3s ease-in;
    ${IconWrapper}{
      margin-left: 0;
      &:nth-child(2) {
        margin: 0 10px;
      }
    }
    ${IconsWrapper}{
      margin-bottom: 10px;
      width: 100%;
      justify-content: flex-end;
    }
  }
`;

const MenuWrapper = styled.div<{isOpen: boolean}>`
  display: none;
  @media (max-width: 600px) {
    display: block;
  }
`

export default Navbar