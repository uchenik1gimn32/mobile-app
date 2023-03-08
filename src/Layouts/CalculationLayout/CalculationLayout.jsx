import React from "react";

import { CalculationLayoutContainer, CalculationLayoutContent, CalculationLayoutRightSidebar } from "./CalculationLayout.style";

export const CalculationLayout = (props) => {
  const { content, sidebar } = props;
  return (
    <CalculationLayoutContainer>
      <CalculationLayoutContent>{content}</CalculationLayoutContent>
      <CalculationLayoutRightSidebar>{sidebar}</CalculationLayoutRightSidebar>
    </CalculationLayoutContainer>
  );
};
