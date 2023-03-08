import React from "react";

import { Button } from "@components/Button";

import { TaskInfoContainer, TaskInfoLine, TaskInfoTitle, TaskInfoButtons } from "./TaskInfoCard.style";
import { Tooltip } from "@components/Tooltip";
import { ToastContainer } from "@components/Button/Toast";
import { SelectedLabel } from "@containers/InitialData/InitialDataForCalculations/Balance/TableEditMenu";

export const TaskInfoCard = (props) => {
  const { title, lines = [], onViewData, onViewProtocol, isViewDataDisabled, isViewProtocolDisabled } = props;

  return (
    <TaskInfoContainer>
      <TaskInfoTitle>{title}</TaskInfoTitle>
      {lines.map((line, index) => {
        const valueShort = String(line.value)
          .split("")
          .map((item, index) => {
            if (index < 10) {
              return item;
            } else if (index > 10 && index < 14) {
              return ".";
            }
            return null;
          })
          .join("");

        const lengthValue = String(line.value).split("").length;

        const getLabel = () => {
          return <SelectedLabel style={{ cursor: lengthValue > 14 ? "pointer" : "default" }}>{lengthValue > 14 ? valueShort : line.value}</SelectedLabel>;
        };

        const isStringType = typeof line.value === "string";

        return (
          <TaskInfoLine key={index}>
            <span>{line.name}</span>
            <span>
              {isStringType ? (
                <>
                  {line.value && lengthValue < 18 ? (
                    getLabel()
                  ) : (
                    <Tooltip
                      placement="right"
                      interactive={true}
                      content={
                        <ToastContainer
                          message={
                            <div
                              style={{
                                maxWidth: "200px",
                                height: "auto",
                                wordWrap: "break-word",
                                padding: "10px",
                              }}
                            >
                              {line.value}
                            </div>
                          }
                        />
                      }
                    >
                      {getLabel()}
                    </Tooltip>
                  )}
                </>
              ) : (
                <div>{line.value}</div>
              )}
            </span>
          </TaskInfoLine>
        );
      })}
      {(onViewData || onViewProtocol) && (
        <TaskInfoButtons>
          {onViewData && (
            <Button icon="view" disabled={isViewDataDisabled} onClick={onViewData}>
              Просмотр
            </Button>
          )}
          {onViewProtocol && (
            <Button icon="protocol" disabled={isViewProtocolDisabled} onClick={onViewProtocol}>
              Протокол
            </Button>
          )}
        </TaskInfoButtons>
      )}
    </TaskInfoContainer>
  );
};
