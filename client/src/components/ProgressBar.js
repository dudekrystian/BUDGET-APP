const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: "24px",
    width: "98%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
    marginLeft: `1%`,
    marginRight: `1%`,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
    transition: `.5s linear`,
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
