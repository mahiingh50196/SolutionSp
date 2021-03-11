import React from "react";

import { ScrollView } from "react-native";
import { Background } from "../../common";
import HTML from "react-native-render-html";
import { SCREEN_WIDTH } from "../../config/Layout";
import { api } from "../../services";

const Privacy = ({ route: { params }, navigation }) => {
  const [policyInfo, setPolicyInfo] = React.useState(null);

  React.useEffect(() => {
    navigation.setOptions({
      title: params?.type === "terms" ? "Terms & Conditions" : "Privacy Policy",
    });

    getTerms();
  }, [navigation, params]);

  const getTerms = async () => {
    const res = await api({
      method: "get",
      url: "/Provider/PolicyTermsCondtions",
      showLoader: true,
    });
    setPolicyInfo(res.data?.data);
  };

  return (
    <Background>
      <ScrollView>
        <HTML
          source={{
            html:
              params?.type === "terms"
                ? policyInfo?.termsCondition
                : policyInfo?.policy,
          }}
          contentWidth={SCREEN_WIDTH}
        />
      </ScrollView>
    </Background>
  );
};

export default Privacy;
