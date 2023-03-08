import React, { useState } from "react";
import { observer } from "mobx-react";
import { Icon } from "@components/Icon";
import styled from "styled-components";
import { TooltipWithClose } from "@components/Tooltip/TooltipWithClose";

export const TooltipErrors = observer(({ item, index, typePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prevState) => {
      return !prevState;
    });
  };

  const formatContent = (objects) => {
    if (typePage === "distribution-of-output" || typePage === "limit-formation" || typePage === "outside-of-the-GG" || typePage === "generation-values") {
      return (
        <TableContainer>
          <TableHeader>
            <TableHeaderTable>
              <TableHeaderCell style={{ width: "33%" }}>Cтатус расчета</TableHeaderCell>
              <TableHeaderCell style={{ width: "33%" }}>Тип Объекта</TableHeaderCell>
              <TableHeaderCell style={{ width: "33%" }}>Название Объекта</TableHeaderCell>
            </TableHeaderTable>
          </TableHeader>
          {objects.map((item, index) => {
            return (
              <TablePowerSystemContainer key={index}>
                <TableBodyCell style={{ width: "33%" }}>
                  <TableSquare done={false} />
                </TableBodyCell>
                <TableBodyCell style={{ width: "33%" }}>{item.type}</TableBodyCell>
                <TableBodyCell style={{ width: "33%" }}>{item.name}</TableBodyCell>
              </TablePowerSystemContainer>
            );
          })}
        </TableContainer>
      );
    }
    if (typePage === "share-rates" || typePage === "daily-statements" || "daily-schedule-of-external-flows") {
      return (
        <TableContainer>
          <TableHeader>
            <TableHeaderTable>
              <TableHeaderCell style={{ width: "33%" }}>Cтатус расчета</TableHeaderCell>
              <TableHeaderCell style={{ width: "33%" }}>Название Объекта</TableHeaderCell>
            </TableHeaderTable>
          </TableHeader>
          {objects.map((item, index) => {
            return (
              <TablePowerSystemContainer key={index}>
                <TableBodyCell style={{ width: "33%" }}>
                  <TableSquare done={false} />
                </TableBodyCell>
                <TableBodyCell style={{ width: "33%" }}>{item.powerSystemName || item.name}</TableBodyCell>
              </TablePowerSystemContainer>
            );
          })}
        </TableContainer>
      );
    } else {
      return <div>Когда я рефакторил этот компонент был сильно запарен.Если ты это читаешь то сообщи мне(Егору Каширину) в каком расчете это сообщение.СПАСИБО!</div>;
    }
  };

  return (
    <Container key={index}>
      {item.length > 0 && (
        <TooltipWithClose content={formatContent(item)} title="Список объектов с ошибками" onToggle={toggleOpen} isOpen={isOpen}>
          <IconContainer onClick={toggleOpen}>
            <Icon name="error" width={20} />
          </IconContainer>
        </TooltipWithClose>
      )}
    </Container>
  );
});

const Container = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;
`;

const IconContainer = styled.div`
  color: #ff0000;
  opacity: 0.6;
  transition: 0.2s;
  transform: scale(1);
  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const TableContainer = styled.div`
  width: 700px;
  max-height: 300px;
  overflow-y: auto;
`;

const TablePowerSystemContainer = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: 0.2s all;
  justify-content: space-around;
  margin: 5px 10px;
  height: 30px;
  &:hover {
    background-color: rgba(54, 162, 235, 0.35);
  }
`;

const TableSquare = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 10px;
  border-radius: 10px;
  background-color: ${(p) => (p.done ? "#00FF00" : "#FF0000")};
  border: solid 0.5px black;
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  position: sticky;
  top: -10px;
  z-index: 99;
  margin-bottom: 10px;
`;

const TableHeaderTable = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: white;
`;

const TableHeaderCell = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  text-align: center;
`;

const TableBodyCell = styled.div`
  width: 150px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  text-align: center;
`;
