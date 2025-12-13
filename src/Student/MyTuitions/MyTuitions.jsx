import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: tuitions = [] } = useQuery({
    queryKey: ["myTuitions", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions?email=${user.email}`);
      return res.data;
    },
  });

  return <div>Total Tuitions : {tuitions.length}</div>;
};

export default MyTuitions;
