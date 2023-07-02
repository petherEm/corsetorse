"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({
  training,
  handleTagClick,
  handleEdit,
  handleDelete,
  handleCompleted,
}) => {
  const { data: session } = useSession();

  const [copied, setCopied] = useState(false);

  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(training.training);
    navigator.clipboard.writeText(training.training);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div
      className={
        training.complete ? `prompt_card bg-green-100/70` : `prompt_card`
      }
    >
      <div className="flex justify-between items-start gap-5 ">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src="/assets/icons/gym/dumbell.svg"
            alt="user_image"
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
          {/* <div>
            <h3 className="font-satoshi font-semibold text-gray-900">
              {training?.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {training?.creator?.email}
            </p>
          </div> */}
          <div>
            <h1 className="font-bold text-xl">{training.day}</h1>
          </div>
          <div>
            <p>
              {training.complete ? (
                <span className="font-bold text-green-600">Completed</span>
              ) : (
                <span className="font-bold text-red-500">Not completed</span>
              )}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === training.training
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-lg text-gray-700">
        {training.training}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(training.tag)}
      >
        #{training.tag}
      </p>

      <div dangerouslySetInnerHTML={{ __html: training.summary || "" }}></div>

      {session?.user.id === training.creator?._id &&
        pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            {/* <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleCompleted}
            >
              Completed
            </p> */}
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
