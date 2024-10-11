import { Link } from "expo-router";
import { SafeAreaView } from "react-native";
import styled from "styled-components";

const MainContainer = styled(SafeAreaView)`
  background-color: #2b2b2b;
  flex: 1;
  justify-content: center;
  gap: 12px;
  align-items: center;
`;

const StyledLink = styled(Link)`
  background-color: #ffc0cb;
  padding: 8px 10px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 6px;
  text-transform: uppercase;
`;

export default function Index() {
  return (
    <MainContainer>
      <StyledLink href="/notifications">Show notifications</StyledLink>
      <StyledLink href="/settings">Settings</StyledLink>
    </MainContainer>
  );
}
