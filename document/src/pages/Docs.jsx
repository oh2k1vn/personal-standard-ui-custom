import BlockCode from "../components/BlockCode";

const Docs = () => {
  var text = `<h1>Helllooo</h1>`;
  return (
    <>
      <code>{text}</code>

      <BlockCode code={text} />
    </>
  );
};
export default Docs;
