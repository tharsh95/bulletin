const Ellipsis = ({ text, maxLength }) => {
    const trimmedText = text || "";
  
    if (trimmedText.length <= maxLength) {
      // If the length of the text is less than or equal to maxLength, don't render the ellipsis
      return <div>{trimmedText}</div>;
    }
  
    return (
      <div>
        <span>
          {trimmedText.slice(0, maxLength)}
          <span className="cursor-pointer text-gray-500 text-base ml-2">...</span>
        </span>
      </div>
    );
  };
  
  export default Ellipsis;
  