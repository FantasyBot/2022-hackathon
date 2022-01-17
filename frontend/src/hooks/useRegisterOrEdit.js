import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { entryUser } from "../store/actions/entryUsers";
import { resetApiCallState } from "../store/slices/apiCall";

const isEmpty = (string) => string.trim() === "";

const useRegisterOrEdit = (condition = "register", user) => {
  const { username, userEmail } = useSelector((state) => state.user);

  const [fullname, setFullname] = useState(
    condition === "register" ? "" : username
  );

  console.log(user.name);
  const [email, setEmail] = useState(condition === "register" ? "" : userEmail);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [warningMessage, setWarningMessage] = useState("");

  const { callBegin, message } = useSelector((state) => state.apiCall);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userEmail) {
      console.log("registerOrEditUser effect");
      setEmail(userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    console.log("Clean up registerOrEditUser custom hook");
    return () => dispatch(resetApiCallState());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    setWarningMessage("");

    if (password !== confirmPassword) {
      setWarningMessage("Passwords do not match!");
      return;
    }

    const enteredFullnameIsValid = !isEmpty(fullname);
    const enteredEmailIsValid = !isEmpty(email);
    const enteredPasswordIsValid = !isEmpty(password);
    const enteredConfirmPasswordIsValid = !isEmpty(confirmPassword);

    const formIsValid =
      enteredFullnameIsValid &&
      enteredEmailIsValid &&
      enteredPasswordIsValid &&
      enteredConfirmPasswordIsValid &&
      password === confirmPassword;

    if (!formIsValid) {
      setWarningMessage(
        "Your username, password or email fields must not be empty!"
      );
      return;
    }

    const method = condition === "register" ? "POST" : "PUT";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };

    dispatch(
      entryUser(
        method,
        "/api/user/register",
        { fullname, password, email },
        headers
      )
    );
  };

  return {
    fullname,
    email,
    password,
    confirmPassword,
    warningMessage,
    callBegin,
    message,

    username,

    setFullname,
    setEmail,
    setPassword,
    setConfirmPassword,
    setWarningMessage,
    submitHandler,
  };
};

export default useRegisterOrEdit;

//   return (
//     <FormContainer>
//       {console.log("RegisterPage rendering....")}

//       <Form onSubmit={submitHandler}>
//         <h4 className="text-center">Register</h4>

//         {(warningMessage || message) && (
//           <Message variant="danger">{warningMessage || message}</Message>
//         )}

//         <Form.Group className="mb-3" controlId="email">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             value={enteredEmail}
//             placeholder="Enter email"
//             aria-describedby="email-help-text"
//             onChange={(e) => setEnteredEmail(e.target.value)}
//           />
//           {/* <Form.Text id="email-help-text" muted>
//             We'll never share your email with anyone else.
//           </Form.Text> */}
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="userName">
//           <Form.Label>Fullname</Form.Label>
//           <Form.Control
//             type="text"
//             value={enteredFullname}
//             placeholder="Enter fullname"
//             onChange={(e) => setEnteredFullname(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={enteredPassword}
//             aria-describedby="password-help-text"
//             placeholder="Password"
//             onChange={(e) => setEnteredPassword(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="confirmPassword">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={confirmPassword}
//             placeholder="Confirm password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </Form.Group>
//         <div className="d-grid gap-2 mb-4">
//           <Button variant="primary" disabled={callBegin} type="submit">
//             {callBegin && (
//               <Spinner
//                 as="span"
//                 variant="light"
//                 animation="grow"
//                 size="sm"
//                 role="status"
//                 aria-hidden="true"
//               />
//             )}
//             {callBegin ? " Loading..." : " Register"}
//           </Button>
//         </div>
//       </Form>
//     </FormContainer>
//   );
// };

// export default RegisterPage;
