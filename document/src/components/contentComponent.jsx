import PropTypes from "prop-types";

const ContentComponent = ({ children }) => {
  return (
    <div className="border border-gray-300 rounded-xl w-full min-h-44 h-fit mt-4 flex justify-center items-center p-4">
      {children}
    </div>
  );
};

ContentComponent.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ContentComponent;
