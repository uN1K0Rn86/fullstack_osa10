import Text from "./Text";

const Subheading = ({ children }) => {
  return (
    <Text fontSize="subheading" fontWeight="bold">
      {children}
    </Text>
  );
};

export default Subheading;
