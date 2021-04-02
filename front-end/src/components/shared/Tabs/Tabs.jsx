import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "./../../../theme/theme";

const Tabs = (props) => {
  const { initiallySelectedIndex, tabComponents, tabTitles } = props;
  const [selectedTabIndex, setSelectedTabIndex] = useState(
    initiallySelectedIndex ? initiallySelectedIndex : 0
  );

  const renderTabContent = () => (
    <TabContent areTabsHidden={tabTitles.length === 1}>
      {tabComponents[selectedTabIndex]}
    </TabContent>
  );

  return (
    <TabsContainer>
      {tabTitles.length > 1 && (
        <TabRowWrapper>
          <TabRow>
            {tabTitles.map((tabTitle, index) => (
              <Tab
                key={index}
                isActive={selectedTabIndex === index}
                onClick={() => setSelectedTabIndex(index)}
              >
                {tabTitle}
              </Tab>
            ))}
          </TabRow>
        </TabRowWrapper>
      )}
      {renderTabContent()}
    </TabsContainer>
  );
};

export default Tabs;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const TabRowWrapper = styled.div`
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const TabRow = styled.div`
  display: flex;
`;

const Tab = styled.div`
  background: ${({ isActive }) => (isActive ? theme.primary : "transparent")};
  border-radius: 1.5rem;
  color: ${({ isActive }) => (isActive ? theme.secondary : theme.dark)};
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  margin: 0 0.5rem;
  white-space: nowrap;
`;

const TabContent = styled.div`
  flex: 1;
  margin-top: 2rem;
`;
