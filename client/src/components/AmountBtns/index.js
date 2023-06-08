import CONSTANTS from "../../constants";

const AmountBtns = (props) => {
  const { setAmount} = props;
  return (
    <p>
      {CONSTANTS.AMOUNTS.map((item, i) =>
        <button  key={i} onClick={() => {
           setAmount(item);
           }}>
          {item}
        </button>)
      }
    </p>
  );
}

export default AmountBtns;
