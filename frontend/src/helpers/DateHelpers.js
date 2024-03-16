export const readableDateTimeFromString = (dateTime) => {
  const date = new Date(dateTime);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Kolkata",
  };

  return date.toLocaleDateString("en-US", options).replace(" at", ", ");
};
