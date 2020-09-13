import React from 'react';

const Head = (props) => {
  React.useEffect(() => {
    document.title = 'Clin | ' + props.title;
  }, [props]);
  return <div></div>;
};

export default Head;
