import Toast from "react-native-root-toast";

const getPosition = (type) => {
  switch (type) {
    case "top":
      return Toast.positions.TOP;
    case "bottom":
      return Toast.positions.BOTTOM;
    case "center":
      return Toast.positions.CENTER;
    default:
      return Toast.positions.TOP;
  }
};

const getBackgroundColor = (type) => {
  switch (type) {
    case "success":
      return "green";
    case "warning":
      return "yellow";
    case "info":
      return "#5a72d8";
    case "danger":
    case "error":
      return "red";
    default:
      return "green";
  }
};

class MagicalToast {
  static show(info) {
    Toast.show(info.text, {
      position: getPosition(info.position),
      backgroundColor: getBackgroundColor(info.type),
      opacity: 1,
    });
  }
}
export default MagicalToast;
