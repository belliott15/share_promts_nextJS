import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start">
      <h1>{type} Post</h1>
    </section>
  );
};

export default Form;
