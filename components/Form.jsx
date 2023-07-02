import { set } from "mongoose";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Training</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share your best fitness practices
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Training
          </span>
          <textarea
            value={post.training}
            onChange={(e) => setPost({ ...post, training: e.target.value })}
            placeholder="Type precisely your planned activities for the day, i.e. 45 minutes running, 4x20 squats, 4x10 pullups etc."
            className="form_textarea"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Day {` `} <span className="font-normal"></span>
          </span>
          <input
            value={post.day}
            onChange={(e) => setPost({ ...post, day: e.target.value })}
            placeholder="This is the training for Day 1, Day 2 etc."
            className="form_input"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}{" "}
            <span className="font-normal">#cardio, #weight, #calisthenics</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Completed ? {` `}{" "}
          </span>
          <input
            type="radio"
            value={post.complete}
            onChange={(e) => setPost({ ...post, complete: !post.complete })}
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
