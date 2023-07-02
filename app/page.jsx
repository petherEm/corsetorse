import Feed from "@components/Feed";
import MyFeed from "@components/MyFeed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-left">
        Are you ready for Summer Fit adventure?
        <br className="max-md:hidden" />
        <span className="orange_gradient text-left">
          Enjoy the best 25-days training plan GPT-4 powered.
        </span>
      </h1>
      <p className="text-xl text-left mt-6">
        <span className="font-bold">CorseTorse</span> is designed to boost your
        performance and get you ready for the demanding summer hikes, full day
        cycling and will make you feel more confident in your body.
      </p>

      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Home;
