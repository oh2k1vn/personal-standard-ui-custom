import PropTypes from "prop-types";

const TitleComponent = ({ title }) => {
  return (
    <h1 className="font-bold text-3xl text-primary capitalize mb-4 mt-6">
      {title}
    </h1>
  );
};

TitleComponent.propTypes = {
  title: PropTypes.string,
};
export default TitleComponent;
