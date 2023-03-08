import React, { useState } from "react";
import styled, { css } from "styled-components";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react/headless";

// https://github.com/atomiks/tippyjs-react
// https://atomiks.github.io/tippyjs/v6/all-props/

const ARROW_HEIGHT = 8; // пробрасывается в компонент arrow

export const Tooltip = ({
  visible,
  disabled,
  children,
  placement = "top",
  interactive = false,
  content,
  onClickOutside,
  offset = 0,
  appendTo = document.body,
  delay = [0, 0], //[800,0]
  ...rest
}) => {
  const [arrow, setArrow] = useState(null);

  return (
    <Tippy
      interactive={interactive} // Можно ли взаимодействовать с всплывающим контентом
      placement={placement} // Позиция подсказки
      visible={visible} // если controlled component
      appendTo={appendTo}
      offset={[0, ARROW_HEIGHT + offset]} // упрощенный offset (только дальность от элемента)
      onClickOutside={onClickOutside} //  если кликнули за пределы подсказки, полезно для controlled component
      delay={delay}
      {...rest}
      render={(attrs) => {
        // Режим кастомного тултипа
        return (
          <Box {...attrs}>
            {content} <Arrow size={ARROW_HEIGHT} placement={attrs["data-placement"]} ref={setArrow} />
          </Box>
        );
      }}
      popperOptions={{
        modifiers: [
          {
            name: "arrow",
            options: {
              element: arrow,
            },
          },
        ],
      }}
    >
      {children}
    </Tippy>
  );
};

const Box = styled.div`
  min-width: 60px;
  min-height: 30px;
  position: relative;
  display: flex;
  background: white;

  border-radius: 5px;
  z-index: 1;
  filter: drop-shadow(0px 0px 4px #0000008c);
`;
const Arrow = styled.div`
  width: 16px;
  height: 16px;
  color: #333;
  width: 0;
  height: 0;
  border-style: solid;

  ${({ placement, size }) =>
    placement === "top" &&
    css`
      bottom: -${size}px;
      border-width: ${size}px ${size}px 0 ${size}px;
      border-color: ${(theme) => theme.theme.color.activeButton} transparent transparent transparent;
    `};
  ${({ placement, size }) =>
    placement === "bottom" &&
    css`
      top: -${size}px;
      border-width: 0 ${size}px ${size}px ${size}px;
      border-color: transparent transparent ${(theme) => theme.theme.color.activeButton} transparent;
    `};

  ${({ placement, size }) =>
    placement === "left" &&
    css`
      right: -${size}px;
      border-width: ${size}px 0 ${size}px ${size}px;
      border-color: transparent transparent transparent ${(theme) => theme.theme.color.activeButton};
    `};
  ${({ placement, size }) =>
    placement === "right" &&
    css`
      left: -${size}px;
      border-width: ${size}px ${size}px ${size}px 0;
      border-color: transparent ${(theme) => theme.theme.color.activeButton} transparent transparent;
    `};
`;
