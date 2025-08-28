import HeadLines from "@/components/HeadLines";
import SimplePoetryCard from "@/components/news/items/SimplePoetryCard";
import Footer from "@/components/Footer";
import { base_api_url } from "@/config/Config";
import ScrollToTopButton from "@/components/scroll-top-to-bottom";

const Home = async () => {
  // --- Fetch all poetry with error handling ---
  let poetry = {};
  try {
    const poetry_data = await fetch(`${base_api_url}/api/all/poetry`, {
      next: { revalidate: 5 },
    });

    const rawPoetryText = await poetry_data.text();
    const parsedPoetry = JSON.parse(rawPoetryText);
    poetry = parsedPoetry.poetry || {};
  } catch (err) {
    console.error("❌ Error fetching poetry:", err);
    poetry = {};
  }

  // --- Fetch top testimonials with error handling ---
  let testimonials = [];
  try {
    const testimonials_res = await fetch(
      `${base_api_url}/api/top-testimonials`,
      {
        next: { revalidate: 10 },
      }
    );

    const rawTestimonialText = await testimonials_res.text();
    const parsedTestimonials = JSON.parse(rawTestimonialText);
    testimonials = parsedTestimonials.testimonials || [];
  } catch (err) {
    console.error("❌ Error parsing testimonials:", err);
  }

  // --- Filter testimonials with average rating ≥ 3 ---
  const filteredTestimonials = testimonials.filter((t) => t.averageRating >= 3);

  return (
    <div className="mt-20">
      <main>
        <HeadLines poetry={poetry} />

        <div className="bg-[#dfecde]">
          <div className="px-4 md:px-8 py-8">
            {/* Poetry Section */}
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[8px]">
                    {Object.keys(poetry).map((category, i) =>
                      poetry[category].map((item, j) =>
                        j < 4 ? (
                          <SimplePoetryCard item={item} key={`${i}-${j}`} />
                        ) : null
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Section (optional: uncomment if needed)
            <div className="mt-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-2 font-serif text-center">
                Testimonials
              </h2>
              <p className="text-sm italic text-gray-700 text-center mb-8">
                Hear what our readers and users have to say about our work.
              </p>
              {filteredTestimonials.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredTestimonials.map((t, i) => (
                    <div
                      key={i}
                      className="bg-green-800 rounded-lg shadow-lg p-6 flex flex-col items-start space-y-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl h-[250px] w-[50vh]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold">
                          {t.comment?.name?.[0]?.toUpperCase() || "A"}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-xl">
                            {t.comment?.name || "Anonymous"}
                          </p>
                          <div className="flex items-center gap-1 text-yellow-500">
                            {Array.from({ length: Math.round(t.averageRating) }, (_, i) => (
                              <span key={i}>⭐</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="italic text-white text-lg">
                          "{t.comment?.text || "No comment available."}"
                        </p>
                        {t.title && (
                          <p className="mt-6 text-base text-white">— on "{t.title}"</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center">
                  No testimonials available.
                </p>
              )}
            </div>
            */}
          </div>
        </div>

        <Footer />
      </main>

      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
