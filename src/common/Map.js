import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Toast from "./Toast";
import globalStyles from "./globalStyles";

import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

let defaultLocation = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
};

export default function Map({
  onChangeLocation = () => null,
  renderPin,
  initialLocation,
  from,
  to,
}) {
  const locationRef = useRef(null);
  const [bottomMargin, setBottomMargin] = React.useState(1);

  console.warn(from, to);

  const getLocation = React.useCallback(async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        text: "Permission to access location was denied",
        type: "error",
      });
      // setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    if (locationRef) {
      const newCoords = {
        ...defaultLocation,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      locationRef.current.animateToRegion(newCoords, 1000);
    }
    onChangeLocation({
      ...defaultLocation,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }, [onChangeLocation]);

  useEffect(() => {
    if (!initialLocation) {
      getLocation();
    }
  }, [getLocation, initialLocation]);

  //   const onPressCurrentLocation = async () => {
  //     let location = await Location.getCurrentPositionAsync({});
  //     if (locationRef && location?.coords) {
  //       const newCoords = {
  //         ...defaultLocation,
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //       };
  //       locationRef.current.animateToRegion(newCoords, 1000);
  //     }
  //   };

  return (
    <View style={[globalStyles.flexOne]}>
      <MapView
        initialRegion={initialLocation || defaultLocation}
        ref={locationRef}
        onMapReady={() => setBottomMargin(0)}
        showsUserLocation={bottomMargin === 0}
        showsMyLocationButton={false}
        style={[
          {
            marginBottom: bottomMargin,
          },
          styles.mapView,
        ]}
        onRegionChangeComplete={(event) => {
          onChangeLocation(event);
        }}
      />
      {!!renderPin && renderPin()}
      {!!from && !!to && (
        <MapViewDirections
          origin={from}
          destination={to}
          apikey={"AIzaSyB-45GuN16z0dHAkCGS-vXcJ_JZ0yu3Ihc"}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: 0,
  },
  mapView: {
    flex: 1,
  },
  locationIcon: {
    height: 60,
    width: 60,
  },
  iconButton: {
    position: "absolute",
    zIndex: 2,
    right: 8,
    bottom: 20,
  },
});
