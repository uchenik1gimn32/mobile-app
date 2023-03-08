import React from "react";

import {
  ContentLayoutContainer,
  ContentLayoutHeader,
  ContentLayoutRow,
  ContentLayoutContent,
  ContentLayoutSidebar,
  ContentLayoutSidebarInner,
} from "./ContentLayoutWithSidebar.style";

export const ContentLayoutWithSidebar = (props) => {
  const { header, sidebar, content, sideBarWidth } = props;

  return (
    <ContentLayoutContainer>
      {header && <ContentLayoutHeader>{header}</ContentLayoutHeader>}
      <ContentLayoutRow>
        {sidebar && (
          <ContentLayoutSidebar width={sideBarWidth}>
            <ContentLayoutSidebarInner>{sidebar}</ContentLayoutSidebarInner>
          </ContentLayoutSidebar>
        )}
        <ContentLayoutContent>{content}</ContentLayoutContent>
      </ContentLayoutRow>
    </ContentLayoutContainer>
  );
};
