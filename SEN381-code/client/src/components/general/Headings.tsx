interface Names {
  heads: string[];
  onClickFunctions: (() => void)[];
}

function Headings({ heads, onClickFunctions }: Names) {
  // const [message, setMessage] = useState("Initial Message");

  function toggleOptions(index: number) {
    // setMessage(val);
    onClickFunctions[index]();
  }

  return heads.map((head, index) => (
    <a
      key={head}
      href="#"
      className={`mx-1.5 sm:mx-6 hover:border-blue-500 hover:border-b-2 `}
      onClick={() => toggleOptions(index)}
    >
      {head}
    </a>
  ));
}

export default Headings;
