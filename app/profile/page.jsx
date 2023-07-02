"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const trainingId = searchParams.get("id");

  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/trainings`);
      const data = await response.json();

      setTrainings(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = async (training) => {
    router.push(`/update-training?id=${training._id}&`);
  };

  const handleDelete = async (training) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this training?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/training/${training._id.toString()}`, {
          method: "DELETE",
        });
        const filteredTrainings = trainings.filter(
          (t) => t._id !== training._id
        );

        setTrainings(filteredTrainings);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCompleted = async (training) => {
    
    // set training to complete in the database
    try {
      await fetch(`/api/training/${training._id.toString()}`, {
        method: "PATCH",
        body: JSON.stringify({ 
          complete: !training.complete,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // update the state
      const updatedTrainings = trainings.map((t) => {
        if (t._id === training._id) {
          return { ...t, complete: true };
        }
        return t;
      });

      setTrainings(updatedTrainings);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your trainings page!"
      data={trainings}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleCompleted={handleCompleted}
    />
  );
};

export default MyProfile;
