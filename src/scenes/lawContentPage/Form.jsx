// lawContentPage form

const Form = ({ lawContent, formattedContent }) => {
if (lawContent === null) {
    // Handle the case when lawContent is null (e.g., display a loading message)
    return <p>Loading law content...</p>;
  }

  return (
    <div className="container m-5 p-5 law-content">
      <h2>{lawContent.title}</h2>
      <p className="small-text"><b>Category:</b> {lawContent.category}</p>
      <p className="mx-5" dangerouslySetInnerHTML={{ __html: formattedContent }}></p>
    </div>
  );
}

export default Form;