import Text from "./Text";

const Subheading = ({ heading }) => {
  return (
    <Text fontSize="subheading" fontWeight="bold">
      {heading}
    </Text>
  );
};

export default Subheading;
