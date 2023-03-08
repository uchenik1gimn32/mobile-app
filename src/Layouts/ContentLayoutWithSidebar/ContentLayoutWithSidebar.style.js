import styled, { css } from "styled-components";

const GUTTER = 10;

export const ContentLayoutHeader = styled.div`
  min-height: 72px;
`;

export const ContentLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const ContentLayoutRow = styled.div`
  display: flex;
  flex-grow: 1;
  align-content: flex-start;
  justify-content: flex-start;
  max-height: calc(100% - 72px);
`;

export const ContentLayoutSidebar = styled.aside`
  position: relative;
  width: 30%;
  min-width: 400px;
  display: flex;
  flex-direction: column;

  padding: 0 ${GUTTER}px;

  ${(p) =>
    p.width &&
    css`
      width: ${p.width}px;
    `}
`;

export const ContentLayoutSidebarInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 420px;
  height: 100%;
  overflow: auto;
  padding: ${GUTTER}px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

export const ContentLayoutContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 600px;
  flex-grow: 1;
  background-color: #fff;
  border-radius: 5px;
  padding: ${GUTTER}px;
`;
