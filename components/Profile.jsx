import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete, handleCompleted }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span>{name} Training</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((training) => (
          <PromptCard
            key={training._id}
            training={training}
            handleEdit={() => handleEdit && handleEdit(training)}
            handleDelete={() => handleDelete && handleDelete(training)}
            //handleCompleted={() => handleCompleted && handleCompleted(training)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
