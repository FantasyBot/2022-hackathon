import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

const useUserDetails = () => {
  const [userDetails, setUserdetails] = useState({});
  const { username } = useSelector((state) => state.user);

  useEffect(() => {
    if (username) {
      const getUserDetails = async () => {
        const { data } = await axios({
          method: "GET",
          url: "/api/user/profile",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });

        setUserdetails(data);
      };

      getUserDetails();
    } else {
      console.log(
        "No user! Can not give you user details, because user was NOT SIGNED IN!"
      );
    }
  }, [username]);

  return { userDetails, username };
};

export default useUserDetails;
