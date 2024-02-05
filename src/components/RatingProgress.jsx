import CircularProgress from "react-native-circular-progress-indicator";

const RatingProgress = ({
  rating,
  ratingColor = "#333",
  circleColor = "#FFFFFF",
  ...rest
}) => {
  const color =
    isNaN(Number(rating)) || Number(rating) === 0
      ? "gray"
      : rating < 4
      ? "#DC3545"
      : rating < 7
      ? "#FFCC00"
      : "#4BB543";

  return (
    <CircularProgress
      value={(rating || 0).toFixed(1)}
      showProgressValue={false}
      maxValue={10}
      activeStrokeWidth={8}
      inActiveStrokeWidth={0}
      activeStrokeColor={color}
      circleBackgroundColor={circleColor}
      title={(rating || 0).toFixed(1)}
      titleColor={color}
      titleStyle={{ fontSize: 12, fontWeight: "bold" }}
      {...rest}
    />
  );
};

export default RatingProgress;
