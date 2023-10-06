import React from 'react';

const Form = ({ lawContent, formattedContent }) => {
if (lawContent === null) {
    // Handle the case when lawContent is null (e.g., display a loading message)
    return <p>Loading law content...</p>;
  }

  const dangerouslySetInnerHTMLProp = { __html: formattedContent };

  return (
    <div className="container m-5 p-5 law-content">
      <h2>{lawContent.title}</h2>
      <p className="small-text"><b>Category:</b> {lawContent.category}</p>
      <p className="mx-5" dangerouslySetInnerHTML={dangerouslySetInnerHTMLProp}></p>
    </div>
  );
};

export default Form;