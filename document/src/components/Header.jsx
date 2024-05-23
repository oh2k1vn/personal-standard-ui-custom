import PropTypes from "prop-types";

const Header = ({ title }) => {
  return (
    <div className="font-bold text-2xl text-blue-600 capitalize flex items-center border-b border-gray-300 p-4">
      📖 {title}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};
export default Header;
