import React from "react";

import { ScrollView } from "react-native";
import { Background } from "../../common";
import HTML from "react-native-render-html";
import { SCREEN_WIDTH } from "../../config/Layout";

const TermsInfo = ({
  route: {
    params: { info, title },
  },
  navigation,
}) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation, title]);

  return (
    <Background>
      <ScrollView style={{ flex: 1, paddingVertical: 50 }}>
        <HTML source={{ html: info }} contentWidth={SCREEN_WIDTH} />
      </ScrollView>
    </Background>
  );
};

export default TermsInfo;
