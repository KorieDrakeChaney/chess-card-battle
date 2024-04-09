"use client";

import flagsmith from "flagsmith/isomorphic";
import { FlagsmithProvider } from "flagsmith/react";
import { IState } from "flagsmith/types";
import { ReactElement } from "react";

const ChessCardBattleFlagsmithProvider = ({
  children,
  flagsmithState,
}: {
  children: React.ReactNode;
  flagsmithState?: IState<string, string>;
}) => {
  return (
    <FlagsmithProvider flagsmith={flagsmith} serverState={flagsmithState}>
      {children as ReactElement}
    </FlagsmithProvider>
  );
};

export default ChessCardBattleFlagsmithProvider;
