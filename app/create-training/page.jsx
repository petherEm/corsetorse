"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateTraining = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    training: "",
    day: "",
    tag: "",
    complete: false,
   
  });

  const createTraining = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/training/new", {
        method: "POST",
        body: JSON.stringify({
          day: post.day,
          training: post.training,
          userId: session?.user.id,
          tag: post.tag,
          complete: post.complete,
          
        }),
      });
      
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createTraining}
    />
  );
};

export default CreateTraining;
