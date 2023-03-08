import React from "react";
import styled from "styled-components";

export const NotFoundLayout = () => {
  return (
    <>
      <Page>
        <Form>
          <Title>404</Title>
          <Subtitle>Страница не найдена</Subtitle>
        </Form>
      </Page>
    </>
  );
};

const Page = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f8fa;
`;

const Form = styled.div`
  display: block;
  text-align: center;
  padding-top: 16vh;
`;

const Title = styled.h1`
  font-size: 300px;
  color: #342f2f75;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 80px;
  color: #0f75e0ed;
`;
