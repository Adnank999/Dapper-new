import { cn } from "@/lib/utils";
import { Marquee } from "./Marquee";

const reviews = [
  {
    name: "Ali",
    username: "@ali_dev",
    body: "Working with Adnan has been an absolute game-changer. His expertise in fullstack development, especially with Laravel and React, helped us build a solid, scalable platform. His knowledge of Next.js allowed us to optimize our frontend, and the way he integrated everything into an efficient cloud application was seamless. Highly recommend!",
    img: "https://avatar.vercel.sh/ali",
  },
  {
    name: "Sarah",
    username: "@sarah_tech",
    body: "I had the pleasure of collaborating with Adnan on a project that required expertise in both frontend and backend. His work with React and Next.js to deliver a smooth and dynamic user experience was exceptional. The Laravel backend he built was rock-solid and highly maintainable. He truly knows how to build scalable cloud applications.",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "Omar",
    username: "@omar_techie",
    body: "Adnan’s ability to craft efficient tech stacks is unparalleled. He’s a master of Laravel for backend development and React for frontend. With Next.js, he took our app’s performance to the next level, and the way he utilized cloud infrastructure for scalability was impressive. His solutions are clean, optimized, and truly effective.",
    img: "https://avatar.vercel.sh/omar",
  },
  {
    name: "Maya",
    username: "@maya_dev",
    body: "Adnan is a true expert in fullstack development. His deep understanding of Laravel for backend and React for frontend made building our web app a breeze. The cloud application he developed is both highly efficient and reliable. With his technical knowledge and problem-solving skills, we were able to deliver a product that exceeded expectations.",
    img: "https://avatar.vercel.sh/maya",
  },
  {
    name: "Zara",
    username: "@zara_code",
    body: "Adnan's work on our tech stack with Laravel, React, and Next.js was nothing short of amazing. His ability to integrate the frontend and backend while maintaining performance and scalability was impressive. Plus, his cloud architecture expertise made sure everything ran smoothly in production. A true professional.",
    img: "https://avatar.vercel.sh/zara",
  },
  {
    name: "Nashit",
    username: "@nashit_tech",
    body: "Adnan's expertise in fullstack development is top-notch. He built our project with Laravel on the backend and React on the frontend, and integrated it perfectly with Next.js. The cloud-based application he developed is fast, efficient, and scalable. I’m incredibly impressed with how well everything works together.",
    img: "https://avatar.vercel.sh/nashit",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <h1 className="text-sm font-medium dark:text-white tracking-wider">
            {name}
          </h1>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <p className="mt-2 text-sm tracking-wider">{body}</p>
    </figure>
  );
};

export default function Testimonial() {
  return (
    <section className="text-4xl text-center mx-auto max-w-5xl">
      <h1 className=" mb-12">Some Words on Street about me</h1>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}
