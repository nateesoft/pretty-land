import React, { useEffect, useState } from "react";
import { AppearanceProvider, Appearance } from "react-native-appearance";

import WalkthroughScreen from "./screen/WalkthroughScreen";
import WalkthroughAppConfig from "./WalkthroughAppConfig";
import DynamicAppStyles from "./DynamicAppStyles";

const WalkThrough = () => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
  });

  return (
    <AppearanceProvider>
      <WalkthroughScreen
        appConfig={WalkthroughAppConfig}
        appStyles={DynamicAppStyles}
      />
    </AppearanceProvider>
  );
}

export default WalkThrough
