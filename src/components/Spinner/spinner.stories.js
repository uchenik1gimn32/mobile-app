import React from "react";

import { action } from "@storybook/addon-actions";
import { Spinner } from "./index";
import { Button } from "@storybook/react/demo";

export default {
  title: "Spinners",
};

export const SpinnerComponent = () => (
  <>
    <div style={{ display: "flex" }}>
      <Spinner color="red" />
      <Spinner color="green" />
      <Spinner />
    </div>
  </>
);
