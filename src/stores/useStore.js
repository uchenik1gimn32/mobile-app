import React from "react";

import { MobXProviderContext } from "mobx-react";
import { configure } from "mobx"

configure({
  enforceActions: "never",
});

export function useStores() {
  return React.useContext(MobXProviderContext).store;
}
