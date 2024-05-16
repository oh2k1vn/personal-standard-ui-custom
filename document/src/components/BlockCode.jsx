import { CopyBlock, dracula } from "react-code-blocks";
import PropTypes from "prop-types";

const BlockCode = ({ code, language = "jsx", showLineNumbers }) => {
  return (
    <div className="max-h-[40rem] overflow-y-auto h-full no-scrollbar">
      <CopyBlock
        language={language}
        text={code}
        showLineNumbers={showLineNumbers}
        theme={dracula}
        wrapLines
      />
    </div>
  );
};

BlockCode.propTypes = {
  language: PropTypes.string,
  code: PropTypes.string.isRequired,
  showLineNumbers: PropTypes.bool,
};

BlockCode.defaultProps = {
  language: "jsx",
  showLineNumbers: true,
};

export default BlockCode;
