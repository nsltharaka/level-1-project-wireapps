export const formatDate = (date: Date) => {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  } as Intl.DateTimeFormatOptions;
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate.replace(/ (\d+)/, ", $1");
};
