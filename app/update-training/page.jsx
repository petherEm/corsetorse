"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditTraining = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trainingId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    training: "",
    day: "",
    tag: "",
    complete: false,
    summary: "AI generated summary",
  });

  useEffect(() => {
    const getTrainingDetails = async () => {
      const response = await fetch(`/api/training/${trainingId}`);
      const data = await response.json();

      setPost({
        training: data.training,
        day: data.day,
        tag: data.tag,
        complete: data.complete,
        summary: data.summary,
      });
    };
    if (trainingId) getTrainingDetails();
  }, [trainingId]);

  const updateTraining = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!trainingId) return alert("No training found");

    try {
      const response = await fetch(`/api/training/${trainingId}`, {
        method: "PATCH",
        body: JSON.stringify({
          training: post.training,
          day: post.day,
          tag: post.tag,
          complete: post.complete,
          summary: post.summary,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateTraining}
    />
  );
};

export default EditTraining;
