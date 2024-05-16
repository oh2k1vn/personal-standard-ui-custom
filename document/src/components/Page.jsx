import { childVariants } from "../utils/animation";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Page = ({ children }) => {
  return (
    <motion.div
      variants={childVariants}
      initial="initial"
      animate="final"
      className="overflow-y-auto h-full no-scrollbar p-4"
    >
      {children}
    </motion.div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
